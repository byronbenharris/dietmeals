# DietMeals

## Installation

`cd` to the root directory in the command line.

Create a virtual env with the following commands (time of download only):

1. `python -m venv env`
1. `pip install -r requirements.txt`

To activate the environment (must do everytime before running scripts): `source env/bin/activate`

You are now ready to run the the scripts (see 'Scripts' sections for details).

When you are done, deactivate the environment: `deactivate`

## Scripts 

- Scraper.py : 
    - `python scraper.py <i> <start> <stop>` 
    - `i` is the number of the sitemap (1 to 8) (defaults to 1)
    - `start` is the number of recipes to skip (defaults to 0)
    - `stop` is the number of recipes at which to end the run (defaults to MAX_INT)