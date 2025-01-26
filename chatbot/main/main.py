import os
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
import google.generativeai as genai

# Import your models, schemas, and crud functions
from models import Base, User, Transaction
from schemas import UserCreate, NotificationCreate, UserResponse, NotificationResponse
from crud import create_user, get_user, get_users, create_notification

# Database setup
from database import engine, SessionLocal, get_db

# Ensure the database tables are created
Base.metadata.create_all(bind=engine)

# Configure Gemini API (Free Version)
genai.configure(api_key="AIzaSyDVpKlOTbuB56fifrqkPhYErZgRG4t94F8")

# Initialize the Gemini model for free API
model = genai.GenerativeModel('gemini-pro')

# FAQ list (remains the same)
faq_list = [
    {
        "question": "How do I register on Connect4Change?",
        "answer": "Create an account by providing personal details. Use your email to log in and set a password. If forgotten, reset via registered email by receiving a verification code."
    },
    {
        "question": "What can I do as a Surplus Seeker?",
        "answer": "Browse surplus products, view details, chat with sellers, join events, place bids, post product requests, and make secure payments through the app."
    },
    {
        "question": "What features do Surplus Providers have?",
        "answer": "Create product listings, add detailed product information, manage and edit posts, organize selling events, and chat with potential buyers."
    },
    {
        "question": "How does the bidding process work?",
        "answer": "Participate in live events, place real-time bids, with the highest bid winning the product. Receive instant updates on bid status during the event."
    },
    {
        "question": "Is my payment information secure?",
        "answer": "The app includes an encrypted payment system with transparent transaction processes. All financial information is protected with secure encryption methods."
    },
    {
        "question": "Can I communicate with other users?",
        "answer": "Yes, through live chat during events, direct messaging between users, and in-app communication tools for discussing products and exchanges."
    },
    {
        "question": "How do I find products I'm interested in?",
        "answer": "Use the text-based search system with relevance ranking. Future updates may include AI-driven product suggestions to improve search experience."
    },
    {
        "question": "What types of events can I join?",
        "answer": "Product-selling events with live bidding, organized by surplus providers and event coordinators. Events have specific time frames and product listings."
    },
    {
        "question": "How will I know about important updates?",
        "answer": "Receive notifications for bidding outcomes, payment confirmations, event updates, and other critical information through the app's notification system."
    },
    {
        "question": "Is the app accessible on different devices?",
        "answer": "Fully compatible with mobile devices and desktop platforms, ensuring users can access Connect4Change from various devices."
    },
    {
        "question": "How do I post a request for a specific product?",
        "answer": "Create a detailed request post specifying the product you're seeking. Surplus providers can then respond to your specific request."
    },
    {
        "question": "What transaction methods are available?",
        "answer": "Secure in-app payment system supporting multiple payment methods with transparent tracking of all financial transactions."
    },
    {
        "question": "Can I edit my product listings?",
        "answer": "Yes, you can view, edit, and delete your product listings directly through the app's user interface."
    },
    {
        "question": "What happens after I win a bid?",
        "answer": "Receive bid confirmation, get payment instructions, process the transaction, and receive details about product delivery or exchange."
    },
    {
        "question": "How are user communications protected?",
        "answer": "Implemented with a secure chat system, data privacy encryption, and communication tracking to ensure user safety and privacy."
    },
    {
        "question": "Can I see my transaction history?",
        "answer": "Access a comprehensive analytics dashboard showing bidding history, transaction records, and detailed user activity summaries."
    },
    {
        "question": "What categories of products are available?",
        "answer": "Multiple product categories with diverse surplus items. Users can search and filter products based on their specific interests."
    },
    {
        "question": "How do event biddings work?",
        "answer": "Real-time bidding with competitive process, time-limited events, and instant updates on current bid amounts."
    },
    {
        "question": "What notifications will I receive?",
        "answer": "Get personalized notifications about bid statuses, payment confirmations, event reminders, and other relevant platform activities."
    },
    {
        "question": "How can I improve my chances of winning bids?",
        "answer": "Monitor live event chats, track current bid amounts, submit timely bids, and actively participate in the bidding process."
    },
    {
        "question": "What security measures protect my account?",
        "answer": "Unique username, email verification, encrypted password storage, and secure login process to protect user accounts."
    },
    {
        "question": "Can I set up profile preferences?",
        "answer": "Upload profile picture, manage notification settings, update personal information, and control privacy options within your account settings."
    },
    {
        "question": "How are product exchanges managed?",
        "answer": "Through direct user communication, clear exchange guidelines, transparent transaction tracking, and built-in dispute resolution support."
    },
    {
        "question": "What are the benefits of joining events?",
        "answer": "Access exclusive surplus items, competitive pricing, community interaction, and real-time bidding experiences."
    },
    {
        "question": "How does the app promote sustainability?",
        "answer": "By reducing waste, facilitating resource sharing, connecting surplus providers with seekers, and encouraging community resource exchange."
    },
    {
        "question": "Can I track my past activities?",
        "answer": "View transaction history, review event participation, monitor bidding performance, and access a personal analytics dashboard."
    },
    {
        "question": "What support is available?",
        "answer": "In-app chat support, comprehensive user guidelines, troubleshooting resources, and community help forums."
    },
    {
        "question": "Are there any fees for using the platform?",
        "answer": "Free account registration, potential transaction fees, transparent pricing structure with no hidden charges."
    },
    {
        "question": "How quickly are messages processed?",
        "answer": "Real-time chat functionality with instant message delivery, read receipt tracking, and minimal communication delays."
    },
    {
        "question": "Can I cancel or modify my bids?",
        "answer": "Bid modification and cancellation options available, with event-specific rules and a clear bid management process."
    },
    {
        "question": "What personal information is required to register?",
        "answer": "Username, email address, password, and optional profile picture. Minimal personal details are collected for account creation."
    },
    {
        "question": "How are product categories organized?",
        "answer": "Diverse categories with descriptive titles and detailed descriptions to help users easily find and classify surplus items."
    },
    {
        "question": "Can I communicate during live events?",
        "answer": "Participate in live chat during events to interact with organizers and discuss bidding processes in real-time."
    },
    {
        "question": "How are transactions secured?",
        "answer": "Encrypted payment system, secure transaction processing, and verification methods to protect financial information."
    },
    {
        "question": "What happens if a bid is unsuccessful?",
        "answer": "Receive immediate notification, can continue bidding on other items, and track bid history in the user dashboard."
    },
    {
        "question": "How often are events conducted?",
        "answer": "Multiple events organized regularly by surplus providers, with varying durations and product ranges."
    },
    {
        "question": "Can I list multiple products?",
        "answer": "Surplus providers can create multiple product listings, manage them individually, and organize event-specific product collections."
    },
    {
        "question": "Are there user ratings or reviews?",
        "answer": "Not explicitly mentioned in the current documentation, but potential for future implementation of user feedback systems."
    },
    {
        "question": "How are product prices determined?",
        "answer": "Set by surplus providers, with competitive pricing through live bidding events and transparent listing processes."
    },
    {
        "question": "Can I filter event searches?",
        "answer": "Search and filter events based on categories, dates, product types, and other relevant criteria."
    },
    {
        "question": "What makes Connect4Change unique?",
        "answer": "Community-driven marketplace, focus on sustainability, dynamic event-based trading, and comprehensive communication features."
    },
    {
        "question": "How are disputes handled?",
        "answer": "Through in-app communication, support resources, and a structured dispute resolution process."
    },
    {
        "question": "Can businesses use the platform?",
        "answer": "Designed for individual users, but can potentially accommodate small businesses and community organizations."
    },
    {
        "question": "Are there geographical limitations?",
        "answer": "Not specified in the current documentation, suggesting potential for broad user participation."
    },
    {
        "question": "How frequently is the app updated?",
        "answer": "Regular updates planned to improve features, add AI-driven suggestions, and enhance user experience."
    },
    {
        "question": "What data privacy measures exist?",
        "answer": "Secure encryption for transactions and communications, minimal data collection, and user-controlled privacy settings."
    },
    {
        "question": "Can I export my transaction history?",
        "answer": "Detailed analytics dashboard suggests potential for data export and comprehensive activity tracking."
    },
    {
        "question": "Are there membership tiers?",
        "answer": "No explicit membership tiers mentioned in the current documentation."
    },
    {
        "question": "How are product conditions verified?",
        "answer": "Relies on user descriptions, potential future implementation of verification processes."
    },
    {
        "question": "Can I integrate with other platforms?",
        "answer": "No current mention of external platform integrations in the provided documentation."
    }
]

app = FastAPI(title="Gemini Chatbot for Surplus Platform")

class ChatRequest(BaseModel):
    user_id: int
    question: str

class ChatResponse(BaseModel):
    answer: str

@app.post("/chat", response_model=ChatResponse)
def chat_with_bot(request: ChatRequest, db: Session = Depends(get_db)):
    user_id = request.user_id
    user_query = request.question.strip()

    # Fetch the user's last transaction for context
    transaction = db.query(Transaction)\
                    .filter(Transaction.user_id == user_id)\
                    .order_by(Transaction.created_at.desc())\
                    .first()

    # Add user context if available
    user_context = ""
    if transaction:
        user_context = (
            f"User's last order ID: {transaction.transaction_id}, "
            f"amount: {transaction.amount}, status: {transaction.status}.\n"
        )

    # Combine user context with the user's query
    final_query = f"{user_context}Question: {user_query}"

    # Try to find a similar FAQ (optional, for additional context)
    similar_faq = None
    for faq in faq_list:
        if faq["question"].lower() in user_query.lower():
            similar_faq = faq
            break

    # Call the Gemini API regardless of whether a similar FAQ was found
    try:
        generation_config = {
            "temperature": 0.5,
            "max_output_tokens": 200,
            "top_p": 1,
            "top_k": 32
        }
        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"}
        ]

        # Generate a response using the Gemini API
        response = model.generate_content(
            final_query, 
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        answer = response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return ChatResponse(answer="I'm sorry, but I encountered an error while processing your request.")

    # Return the response from the Gemini API
    return ChatResponse(answer=answer)

