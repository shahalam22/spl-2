""" main.py

import os
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List

# Import your models, schemas, and crud functions
from models import Base, User, Transaction
from schemas import UserCreate, NotificationCreate, UserResponse, NotificationResponse
from crud import create_user, get_user, get_users, create_notification

# Database setup
from database import engine, SessionLocal, get_db

# LangChain & Transformers imports
from langchain.llms import HuggingFacePipeline
from langchain.docstore.document import Document
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# ------------------------------------------------------------------------------
# 1. Initialize Database (PostgreSQL)
# ------------------------------------------------------------------------------
# Ensure the database tables are created
Base.metadata.create_all(bind=engine)

# ------------------------------------------------------------------------------
# 2. Prepare Qwen Model as a LangChain LLM
# ------------------------------------------------------------------------------
# Replace with the actual model name or local path for Qwen
model_name = "Qwen/Qwen2-1.5B"    # e.g., "Qwen/Qwen-7B" or "./Qwen-7B"
print(f"Loading tokenizer for {model_name}...")
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
print("Loading model (this may be large and take some time)...")
model = AutoModelForCausalLM.from_pretrained(model_name, device_map="auto", trust_remote_code=True)
transformer_pipeline = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_length=1024,
    temperature=0.7,
    do_sample=True
)

llm = HuggingFacePipeline(pipeline=transformer_pipeline)

# ------------------------------------------------------------------------------
# 3. Build a Vector Store of the 50 FAQ Docs
# ------------------------------------------------------------------------------
# For demonstration, here's a smaller subset; fill in all 50 from your prompt
faq_list = [
    {
        "question": "How do I register on Connect4Change?",
        "answer": "Create an account by providing personal details..."
    },
    {
        "question": "What can I do as a Surplus Seeker?",
        "answer": "Browse surplus products, view details, chat with sellers..."
    },
    {
        "question": "Can I integrate with other platforms?",
        "answer": "No current mention of external platform integrations..."
    },
]

# Convert each FAQ into a LangChain "Document"
faq_documents = []
for faq in faq_list:
    page_content = f"Q: {faq['question']}\nA: {faq['answer']}"
    faq_documents.append(Document(page_content=page_content))

# Use a Hugging Face embeddings model
embedding_model_name = "sentence-transformers/all-MiniLM-L6-v2"
embeddings = HuggingFaceEmbeddings(model_name=embedding_model_name)

# Create a FAISS vector store from these FAQ documents
vectorstore = FAISS.from_documents(faq_documents, embeddings)

# Create a retrieval-based QA chain
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})
faq_qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever
)

# ------------------------------------------------------------------------------
# 4. FastAPI App & Chat Endpoint
# ------------------------------------------------------------------------------
app = FastAPI(title="Qwen Chatbot for Surplus Platform")

class ChatRequest(BaseModel):
    user_id: int
    question: str

class ChatResponse(BaseModel):
    answer: str

@app.post("/chat", response_model=ChatResponse)
def chat_with_bot(request: ChatRequest, db: Session = Depends(get_db)):
    """
   """ Endpoint that answers user questions about:
      - Their previous orders (fetched from DB)
      - FAQ about the surplus platform
    If the question is irrelevant, we refuse to answer.
    """
"""
    user_id = request.user_id
    user_query = request.question.strip()

    # Optional: Retrieve the user's last order info from the DB
    transaction = db.query(Transaction)\
                    .filter(Transaction.user_id == user_id)\
                    .order_by(Transaction.created_at.desc())\
                    .first()

    # You can incorporate user-specific context if needed
    user_context = ""
    if transaction:
        user_context = (
            f"User's last order ID: {transaction.transaction_id}, "
            f"amount: {transaction.amount}, status: {transaction.status}.\n"
        )

    # Combine user context with the question for more relevant answers
    final_query = f"{user_context}Question: {user_query}"

    # 1) Check the user query's similarity to FAQ
    similar_docs = vectorstore.similarity_search(user_query, k=1)
    if not similar_docs:
        # No similar doc => likely irrelevant
        return ChatResponse(answer="I'm sorry, but I can't help with that.")

    # 2) Run the retrieval QA chain
    answer = faq_qa_chain.run(final_query)

    # 3) If the chain returns something extremely short or an apology, refuse
    if "I'm sorry" in answer or len(answer.strip()) < 5:
        return ChatResponse(answer="I'm sorry, but I can't help with that.")

    return ChatResponse(answer=answer)

# ------------------------------------------------------------------------------
# 5. User and Notification Endpoints
# ------------------------------------------------------------------------------
@app.post("/users/", response_model=UserResponse)
def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@app.get("/users/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/", response_model=List[UserResponse])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_users(db, skip, limit)

@app.post("/notifications/", response_model=NotificationResponse)
def create_notification_endpoint(notification: NotificationCreate, db: Session = Depends(get_db)):
    return create_notification(db, notification)"""
"""
# ------------------------------------------------------------------------------
# 6. Run the app
# ------------------------------------------------------------------------------
# Then start with: uvicorn main:app --reload
"""