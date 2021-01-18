from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import FreezerGrocery, User, FreezerGroceryType, db
from sqlalchemy.exc import SQLAlchemyError


freezer_grocery_routes = Blueprint('freezer-groceries', __name__)

# GET all groceries for a specific user 
@freezer_grocery_routes.route('/user/<int:userId>')
# @login_required
def get_all_groceries(userId):
    try:
        groceries = FreezerGrocery.query.filter(FreezerGrocery.user_id == userId).order_by(FreezerGrocery.createdAt.desc()).all()

        grocery_dicts = [grocery.to_type_dict() for grocery in groceries]
        grocery_json = jsonify({'groceries': grocery_dicts})
        return grocery_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500