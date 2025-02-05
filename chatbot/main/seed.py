from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User, Category, Post, Transaction
from datetime import datetime
import random

DATABASE_URL = "postgresql://alex:hales@localhost/mydatabase"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_database():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()

    try:
        # Check if database is already seeded
        if session.query(User).count() > 0:
            print("Database already seeded. Skipping.")
            return

        # Seed Categories
        categories_data = [
            {"title": "Food", "description": "Perishable or non-perishable food items."},
            {"title": "Electronics", "description": "Gadgets and electronic devices."},
            {"title": "Clothing", "description": "Wearable items."},
            {"title": "Books", "description": "Various kinds of literature and textbooks."},
            {"title": "Misc", "description": "Miscellaneous items."},
        ]
        
        categories = [Category(**cat) for cat in categories_data]
        session.add_all(categories)
        session.commit()

        # Seed Users
        users = [
            User(
                username=f"user{i}",
                email=f"user{i}@example.com",
                hashed_password="hashed_password_example",
                profile_picture=None,
                last_login=None,
                created_at=datetime.utcnow()
            ) for i in range(1, 21)
        ]
        
        session.add_all(users)
        session.commit()

        # Seed Posts
        post_titles = [
            "Organic Apples", "Old Laptop", "Designer Jeans", "Cooking Oil", "Textbook Bundle",
            "Wireless Earbuds", "Guitar Amp", "Winter Jacket", "Novel Collection", "Smartphone",
        ]

        posts = [
            Post(
                title=post_titles[i % len(post_titles)] if i < len(post_titles) else f"Product {i}",
                description=f"Description for product {i}",
                price=round(random.uniform(1.0, 300.0), 2),
                is_request=False,
                status="Available",
                user_id=random.choice(users).user_id,
                category_id=random.choice(categories).category_id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            ) for i in range(100)
        ]

        session.add_all(posts)
        session.commit()

        # Seed Transactions
        payment_methods = ["Credit Card", "PayPal", "Cash", "Bank Transfer"]
        transactions = []

        for user in users:
            num_purchases = random.randint(1, 5)
            purchased_posts = random.sample(posts, num_purchases)
            
            for post in purchased_posts:
                transaction = Transaction(
                    amount=post.price,
                    method=random.choice(payment_methods),
                    status="Completed",
                    created_at=datetime.utcnow(),
                    post_id=post.post_id,
                    user_id=user.user_id
                )
                transactions.append(transaction)

        session.add_all(transactions)
        session.commit()

        print("Database seeding completed successfully!")

    except Exception as e:
        print(f"Error during database seeding: {e}")
        session.rollback()
    finally:
        session.close()

