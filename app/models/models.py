from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


grocery_users = db.Table(
  "grocery_users",
  db.Model.metadata,
  db.Column("grocery_id", db.Integer, db.ForeignKey("groceries.id"), primary_key=True),
  db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
)


class GroceryType(db.Model):
    __tablename__ = "grocery_types"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255), nullable=False, unique=True)
    image = db.Column(db.String(255))
    days_to_expiry = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
          "id": self.id,
          "type": self.type,
          "image": self.image,
          "days_to_expiry": self.days_to_expiry,
        }

class Grocery(db.Model):
    __tablename__ = "groceries"

    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(50), nullable=False)
    grocery_types_id = db.Column(db.Integer, db.ForeignKey("grocery_types.id"), nullable=True)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    type = db.relationship("GroceryType")
    users = db.relationship("User", secondary=grocery_users, back_populates="groceries")

    def to_dict(self):
        return {
          "id": self.id,
          "item_name": self.item_name,
          "grocery_types_id": self.grocery_types_id,
          "createdAt": self.createdAt,
        }

class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(35), nullable = False)
    last_name = db.Column(db.String(35), nullable = False)
    email = db.Column(db.String(255), nullable = False, unique = True)
    hashed_password = db.Column(db.String(255), nullable = False)
    city = db.Column(db.String(255), nullable = False)
    country = db.Column(db.String(255), nullable = False)
    avatar = db.Column(db.String(255))

    groceries = db.relationship("Grocery", secondary=grocery_users, back_populates="users")

    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "first_name": self.first_name,
          "last_name": self.last_name,
          "city": self.city,
          "country": self.country,
          "avatar": self.avatar,
          "email": self.email
        }