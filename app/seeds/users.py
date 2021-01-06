from werkzeug.security import generate_password_hash
from app.models import db, User, GroceryType, Grocery

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = [
           User(first_name='Demo', 
                last_name='User', 
                email='demo@aa.io',
                password='password', 
                city='Chicago',
                country='USA', 
                avatar='https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHJ1bm5pbmd8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60'),
           User(
                first_name='David',
                last_name='Jensen',
                email='david@david.com',
                password="password5",
                city="Detroit",
                country="USA",
                avatar='https://images.unsplash.com/photo-1560073743-0a45c01b68c4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjd8fHJ1bm5pbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'),
           User(
                first_name='Tom',
                last_name='Mayfield',
                email='tom@tom.com',
                password="password2",
                city="Los Angeles",
                country="USA",
                avatar='https://images.unsplash.com/photo-1475274110913-480c45d0e873?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDB8fHJ1bm5pbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'),
           User(
                first_name='Sally',
                last_name='Choi',
                email='sally@sally.com',
                password="password3",
                city="Seoul",
                country="South Korea",
                avatar='https://images.unsplash.com/photo-1509010636466-2292663e132f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTV8fHJ1bm5pbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'),
           User(
                first_name='Eric',
                last_name='Mandy',
                email='eric@eric.com',
                password="password4",
                city="Berlin",
                country="Germany",
                avatar='https://images.unsplash.com/photo-1512299286776-c18be8ed6a1a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA1fHxydW5uaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'),
    ]

    db.session.add_all(demo)

    db.session.commit()

# def seed_activities():

#     activity = [
#         Activity(title='Running in the park', 
#             description='It was really nice outside.',
#             distance=5.1, time=56.3,
#             user_id=1,
#             gpx_file='https://www.google.com/maps/d/embed?mid=1h7p1CpCc43ClTdEIH61VpAr3Mbfh-9Ly'),
#         Activity(title='Running along the river.', 
#             description='I ran along the river, my feet hurt, but it was good.',
#             distance=10.1, time=70.3,
#             user_id=2,
#             gpx_file='https://www.google.com/maps/d/embed?mid=1sFWFcmleZGX5E9kuWAEAg0UPpSd2O7ON'),
#         Activity(title='Running downtown', 
#             description='Tough run, the concrete was hard.',
#             distance=2.1, time=20,
#             user_id=3,
#             gpx_file='https://www.google.com/maps/d/embed?mid=1gP16ZGuGQMG3UGCivwtXsdrWGXi2m-pE'),
#         Activity(title='Walked.', 
#             description='I was really tired, so I walked.',
#             distance=3, time=50.3,
#             user_id=3,
#             gpx_file='https://www.google.com/maps/d/embed?mid=1M9l3uERqL7DnB8ID89bVfPnQZAgC6vRN'),
#         Activity(title='Beach run', 
#             description='It was HOT',
#             distance=4.5, time=55,
#             user_id=4,
#             gpx_file='https://www.google.com/maps/d/embed?mid=1M9l3uERqL7DnB8ID89bVfPnQZAgC6vRN'),
#         Activity(title='Running on the sidewalk.', 
#             description='I ran fast today.',
#             distance=2, time=20,
#             user_id=4),
#         Activity(title='Berlin Marathon', 
#             description='Not bad for my first marathon',
#             distance=26.4, time=243,
#             user_id=5,
#             gpx_file='https://www.google.com/maps/d/embed?mid=1e5LgIAckPl9KcTMT2Z-8BL64NEryO6k-'),
#     ]

#     db.session.add_all(activity)

#     db.session.commit()

def seed_grocery_types():

    grocery_type = [
        GroceryType(type='Apples', days_to_expiry=28),
        GroceryType(type='Avocados', days_to_expiry=21),
        GroceryType(type='Bananas', days_to_expiry=21),
        GroceryType(type='Blueberries', days_to_expiry=7), 
        GroceryType(type='Citrus fruits - orange, grapefruit, clementines, etc.', days_to_expiry=10),
        GroceryType(type='Dried fruit', days_to_expiry=180), 
        GroceryType(type='Grapes', days_to_expiry=7),
        GroceryType(type='Melons', days_to_expiry=14),
        GroceryType(type='Peaches, nectarines, plums or pears', days_to_expiry=3), 
        GroceryType(type='Pineapple', days_to_expiry=5),
        GroceryType(type='Strawberries', days_to_expiry=2),
        GroceryType(type='Asparagus', days_to_expiry=3), 
        GroceryType(type='Bagged greens', days_to_expiry=3), 
        GroceryType(type='Broccoli', days_to_expiry=3), 
        GroceryType(type='Brussels sprouts', days_to_expiry=3), 
        GroceryType(type='Cabbage', days_to_expiry=7), 
        GroceryType(type='Carrots', days_to_expiry=14), 
        GroceryType(type='Cauliflower', days_to_expiry=3), 
        GroceryType(type='Celery', days_to_expiry=7), 
        GroceryType(type='Corn on the cob', days_to_expiry=1), 
        GroceryType(type='Cucumbers', days_to_expiry=4), 
        GroceryType(type='Dried beans, lentils or split peas (cooked)', days_to_expiry=3),
        GroceryType(type='Onions', days_to_expiry=60),
        GroceryType(type='Potatoes', days_to_expiry=300),
        GroceryType(type='Spinach or leaf lettuce', days_to_expiry=3),
        GroceryType(type='Summer squash or zucchini', days_to_expiry=4), 
        GroceryType(type='Tomatoes', days_to_expiry=1), 
        GroceryType(type='Winter squash', days_to_expiry=7),   
    ]

    db.session.add_all(grocery_type)

    db.session.commit()

# def seed_comments():

#     comment = [
#         Comment(text='Wow! You did a really great job.', user_id=1, activity_id=2),
#         Comment(text='Wow! You did a really great job.', user_id=1, activity_id=3),
#         Comment(text='Wow! You did a really great job.', user_id=1, activity_id=4),
#         Comment(text='Wow! You did a really great job.', user_id=1, activity_id=5),
#         Comment(text='Wow! You did a really great job.', user_id=1, activity_id=6),
#         Comment(text='Wow! You did a really great job.', user_id=1, activity_id=7),
#         Comment(text='Wow! Really impressive time.', user_id=2, activity_id=7),
#         Comment(text='I knew you could do it!', user_id=3, activity_id=7),
#         Comment(text='Great Job!', user_id=4, activity_id=7),
#         Comment(text='Way to go!', user_id=5, activity_id=3),
#         Comment(text='Yayy! You did it', user_id=4, activity_id=1),
#     ]

#     db.session.add_all(comment)

#     db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()

def undo_grocery_types():
    db.session.execute('TRUNCATE grocery_types;')
    db.session.commit()

# def undo_kudos():
#     db.session.execute('TRUNCATE kudos;')
#     db.session.commit()

# def undo_comments():
#     db.session.execute('TRUNCATE comments;')
#     db.session.commit()
