
from bs4 import BeautifulSoup
import json
from os import walk

# filenames = next(walk('recipes'), (None, None, []))[2]

id_count = 0
all_recipes = []
recipe_url_set = set()

# for fn in filenames:
with open('recipes/recipes1_1000.json','r') as f:
    recipes = json.load(f)
    for recipe in recipes:
        if recipe["url"] not in recipe_url_set:
            recipe_url_set.add(recipe["url"])
            try:
                soup = BeautifulSoup(recipe["html"], "lxml")
                title = soup.find("h1", {"class": "headline heading-content elementFont__display"}).string
                ingredients = [s.string for s in soup.find_all("span", {"class": "ingredients-item-name elementFont__body"})]
                directions = [li.find("p").string for li in soup.find_all("li", {"class": "subcontainer instructions-section-item"})]
                all_recipes.append({ "id":id_count, "url":recipe["url"], "title":title, "ingredients":ingredients, "directions":directions})
                id_count += 1
                print("SUCCESS : {url}".format(url=recipe["url"]))
            except Exception as e:
                print("FAIL : {url}".format(url=recipe["url"]))
                print(e)      

with open('recipes2.json', 'w') as outfile:
    json.dump(all_recipes, outfile)
