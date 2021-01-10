from flask.cli import AppGroup
from .users import seed_users, undo_users, seed_grocery_types, undo_grocery_types, seed_groceries, undo_groceries

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_grocery_types()
    seed_groceries()
# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_grocery_types()
    undo_groceries()
