# DietMeals

COMP 631 Final Project

Ben Harris (bbh3) & Angela Cao (abc7)

DietMeals is a graphical search engine built on data collected from [allrecipes.com]. The relevant recipes are queried based on user restictions (diet, inclusion or exclusion of certain ingredients, ingredient substitutions, etc.). The queries and results will be accessible through a simple webapp.


## Installation

`cd` to the root directory in the command line.

Create a virtual env with the following commands (time of download only):

1. `python -m venv env`
1. `pip install -r requirements.txt`

To activate the environment (must do everytime before running scripts): `source env/bin/activate`

You are now ready to run the the scripts (see 'Scripts' sections for details).

When you are done, deactivate the environment: `deactivate`

## Scripts 

- Scraper.py : `python scraper.py <i> <start> <stop>` 
    - `i` is the number of the sitemap (1 to 8) (defaults to 1)
    - `start` is the number of recipes to skip (defaults to 0)
    - `stop` is the number of recipes at which to end the run (defaults to MAX_INT)


## Solr

http://laurenthinoul.com/how-to-enable-cors-in-solr/

`bin/solr start -c -p 8983 -s example/cloud/node1/solr`
`bin/solr start -c -p 7574 -s example/cloud/node2/solr -z localhost:9983`
`bin/solr delete -c recipes`
`bin/solr create -c recipes -s 2 -rf 2`
`bin/post -c recipes ../recipes.json`
`bin/solr stop -all`


