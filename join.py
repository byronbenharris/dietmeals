#!/usr/bin/python

import json
from os import walk

filenames = next(walk('recipes'), (None, None, []))[2]

counter = 0
all_recipes = []

for fn in filenames:
    with open('recipes/recipes1_1000.json'.format(fn=fn),'r') as f:
        recipes = json.load(f)
        for recipe in recipes["recipes"]:
            recipe["id"] = counter
            print(counter); counter += 1
            all_recipes.append(recipe)

with open('recipes.json', 'w') as outfile:
    json.dump(all_recipes, outfile)