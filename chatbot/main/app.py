# app.py

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, Query
from fastapi.responses import HTMLResponse
from typing import Dict
from datetime import datetime

from .database import SessionLocal, init_db
from .models import User, Post, Event, Bid, Message
from .schemas import MessageCreate, MessageRead

app = FastAPI()


# Call init_db() at startup to ensure tables are created
@app.on_event("startup")
def on_startup():
    init_db()


# 1-to-1 active connections:
#    We map (user_id, post_id) -> WebSocket to allow each user multiple post chats
active_connections_1to1: Dict[(int, int), WebSocket] = {}

# Many-to-many event chat connections:
#    event_id -> { user_id -> WebSocket }
active_connections_events: Dict[int, Dict[int, WebSocket]] = {}


def get_db():
    """FastAPI dependency to get a new DB session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def save_1to1_message(db, sender_id: int, receiver_id: int, content: str) -> Message:
    """
    Save the 1-to-1 message in the database.
    """
    msg = Message(
        sender_id=sender_id,
        receiver_id=receiver_id,
        content=content,
        created_at=datetime.utcnow(),
        is_read=False
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


@app.websocket("/ws/chat/{post_id}")
async def one_to_one_chat(
    websocket: WebSocket,
    post_id: int,
    user_id: int = Query(...),
    db=Depends(get_db)
):
    """
    WebSocket endpoint for one-to-one chat tied to a Post:
      - `post_id` is from the path
      - `user_id` is from a query parameter (or you can use authentication)
    """
    await websocket.accept()

    # 1. Get the Post and check if it exists
    post = db.query(Post).filter(Post.post_id == post_id).first()
    if not post:
        await websocket.send_text("Post does not exist.")
        await websocket.close()
        return

    # 2. Determine participants (seller vs buyer).
    seller_id = post.user_id
    # For demo: We assume the "buyer_id" is also passed as a query param
    # or that user_id is the buyer if he's not the seller.
    buyer_id = int(websocket.query_params.get("buyer_id", 0))

    # Basic check: user must be either the seller or the buyer
    if user_id not in [seller_id, buyer_id]:
        await websocket.send_text("You are not authorized to join this chat.")
        await websocket.close()
        return

    # Register this user connection keyed by (user_id, post_id)
    active_connections_1to1[(user_id, post_id)] = websocket

    # Identify the other participant
    other_user_id = buyer_id if user_id == seller_id else seller_id

    try:
        while True:
            # 3. Wait for an incoming message
            data = await websocket.receive_text()

            # 4. Save the message to the DB
            new_msg = save_1to1_message(db, sender_id=user_id, receiver_id=other_user_id, content=data)

            # 5. Forward the message to the other user if they're connected
            other_conn = active_connections_1to1.get((other_user_id, post_id))
            if other_conn:
                await other_conn.send_text(
                    f"User {user_id} says: {data}"
                )

    except WebSocketDisconnect:
        # 6. Handle disconnection
        del active_connections_1to1[(user_id, post_id)]
        other_conn = active_connections_1to1.get((other_user_id, post_id))
        if other_conn:
            await other_conn.send_text(f"User {user_id} disconnected from chat.")


@app.websocket("/ws/event_chat/{event_id}")
async def event_chat(
    websocket: WebSocket,
    event_id: int,
    user_id: int = Query(...),
    db=Depends(get_db)
):
    """
    WebSocket endpoint for event-based group chat:
      - Only participants should be able to join
      - Chat is only active during the event time
      - In this example, messages are broadcast in real-time but NOT stored in DB 
        (since we lack an `event_id` field in the existing Message model).
    """
    await websocket.accept()

    # 1. Validate the event
    event = db.query(Event).filter(Event.event_id == event_id).first()
    if not event:
        await websocket.send_text("Event does not exist.")
        await websocket.close()
        return

    now = datetime.utcnow()
    # 2. Check if within event active time
    if not (event.start_time <= now <= event.end_time):
        await websocket.send_text("Event chat is not active (outside event time).")
        await websocket.close()
        return

    # 3. Determine participants
    #    For simplicity, let's say:
    #     - The event creator (event.user_id) is a participant
    #     - Anyone with a Bid referencing this event is also a participant
    participant_ids = {event.user_id}
    for bid in event.bids:
        participant_ids.add(bid.user_id)

    if user_id not in participant_ids:
        await websocket.send_text("You are not a participant in this event.")
        await websocket.close()
        return

    # 4. Register the user in active_connections_events
    if event_id not in active_connections_events:
        active_connections_events[event_id] = {}
    active_connections_events[event_id][user_id] = websocket

    try:
        while True:
            data = await websocket.receive_text()
            # Here, we do NOT store to DB because there's no event_id column in "Message"
            # If you want to store event chat, you'd need a separate "EventMessage" table or column.

            # Broadcast to all participants in the event
            for uid, conn in active_connections_events[event_id].items():
                if uid != user_id:  # or remove check if you want to echo to sender
                    await conn.send_text(f"[Event {event_id}] User {user_id}: {data}")

    except WebSocketDisconnect:
        # 5. Handle user disconnect
        del active_connections_events[event_id][user_id]
        # Inform others
        for uid, conn in active_connections_events[event_id].items():
            await conn.send_text(f"User {user_id} left the event chat.")
