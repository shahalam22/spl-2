from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    hashed_password: str
    profile_picture: Optional[str] = None

class UserResponse(UserBase):
    user_id: int
    profile_picture: Optional[str] = None
    last_login: Optional[datetime] = None
    created_at: datetime

    class Config:
        orm_mode = True

class NotificationBase(BaseModel):
    title: str
    content: str

class NotificationCreate(NotificationBase):
    user_id: int

class NotificationResponse(NotificationBase):
    notification_id: int
    is_read: bool
    created_at: datetime

    class Config:
        orm_mode = True
