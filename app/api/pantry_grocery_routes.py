from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import PantryGrocery, User, PantryGroceryType, db
from sqlalchemy.exc import SQLAlchemyError


pantry_grocery_routes = Blueprint('pantry-groceries', __name__)

# GET all groceries for a specific user 
@pantry_grocery_routes.route('/user/<int:userId>')
# @login_required
def get_all_groceries(userId):
    try:
        groceries = PantryGrocery.query.filter(PantryGrocery.user_id == userId).order_by(PantryGrocery.createdAt.desc()).all()

        grocery_dicts = [grocery.to_type_dict() for grocery in groceries]
        grocery_json = jsonify({'groceries': grocery_dicts})
        return grocery_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500