from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Grocery, User, GroceryType, db
from sqlalchemy.exc import SQLAlchemyError


grocery_routes = Blueprint('groceries', __name__)

# GET all groceries for a specific user 
@grocery_routes.route('/user/<int:userId>')
@login_required
def get_all_groceries(userId):
    try:
        groceries = Grocery.query.filter(Grocery.user_id == userId).order_by(Grocery.createdAt.desc()).all()
        grocery_dicts = [grocery.to_type_dict() for grocery in groceries]
        # filter by following and date descending max 15 (.all().order_by(Activity.created_date.desc()))
        grocery_json = jsonify({'groceries': grocery_dicts})
        return grocery_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500

# GET all groceries for a specific user
@grocery_routes.route('/users/<int:user_id>', methods=['GET'])
@login_required
def get_user_groceries(user_id):
    try:
        groceries = Grocery.query.filter(Grocery.user_id == user_id).all()
        grocery_dicts = [grocery.to_dict() for grocery in groceries]
        grocery_json = jsonify({'groceries': grocery_dicts})
        return grocery_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['hit An error occurred while retrieving the data']}, 500


# GET a specific grocery item
@grocery_routes.route('/<int:grocery_id>', methods=['GET'])
# @login_required
def get_grocery_item(grocery_id):
    try:
        grocery = Grocery.query.filter(Grocery.id == grocery_id).first()
        activity_json = jsonify({'activities': grocery.to_dict()})
        # pull kudos and comments
        return activity_json
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        print(error)
        return {'errors': ['An error occurred while retrieving the data']}, 500


# POST a new grocery for a specific user
@grocery_routes.route('/new/<int:user_id>', methods=['POST'])
@login_required
def post_grocery(user_id):
    data = request.json
    grocery = Grocery(
        user_id=user_id,
        item_name=data['item_name'],
        grocery_types_id=data['grocery_types_id'],)
    db.session.add(grocery)
    db.session.commit()
    return 'Grocery item submitted successfully', 201
    


# DELETE an activity
@grocery_routes.route('/delete/<int:grocery_id>', methods=['DELETE'])
@login_required
def grocery(grocery_id):
    grocery = Grocery.query.filter(Grocery.id == grocery_id).first()
    db.session.delete(grocery)
    db.session.commit()
    return {'message': 'Grocery was successfully deleted'}, 200