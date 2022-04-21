
from bs4 import BeautifulSoup
import json
from os import walk


filenames = next(walk('recipes2'), (None, None, []))[2]

id_count = 0
all_recipes = []
# recipe_url_set = set()

for fn in filenames:
    with open('recipes2/{fn}'.format(fn=fn),'r') as f:
        try:
            recipes = json.load(f)
            for recipe in recipes:
                # if recipe["url"] not in recipe_url_set:
                #     recipe_url_set.add(recipe["url"])

                try:
                    
                    soup = BeautifulSoup(recipe["html"], "lxml")
                    title = soup.find("h1", {"class": "headline heading-content elementFont__display"}).string
                    ingredients = [s.string for s in soup.find_all("span", {"class": "ingredients-item-name elementFont__body"})]
                    directions = [li.find("p").string for li in soup.find_all("li", {"class": "subcontainer instructions-section-item"})]
                    
                    try:
                        image = soup.find("div", {"class": "image-container"}).find("img")["src"]
                    except:
                        image = ""
                    
                    try:
                        nutrition = soup.find("div", {"class": "recipeNutritionSectionBlock"}).find("div", {"class": "section-body"}).text
                        calories = -1
                        nutrition_list = nutrition.split()
                        if nutrition_list[1] == "calories;":
                            calories = int(nutrition_list[0])
                    except:
                        calories = -1
                    
                    try:
                        time = ""
                        time_list = soup.find("div", {"class": "recipe-info-section"}).findAll("div", {"class": "recipe-meta-item"})
                        for times in time_list:
                            if times.find("div", {"class": "recipe-meta-item-header elementFont__subtitle--bold elementFont__transformCapitalize"}).text == "total:":
                                time = times.find("div", {"class": "recipe-meta-item-body elementFont__subtitle"}).text                
                    except:
                        time = ""
                    
                    all_recipes.append({ 
                        "id":id_count, 
                        "url":recipe["url"], 
                        "title":title, 
                        "image":image,
                        "ingredients":ingredients,
                        "directions":directions,
                        "calories":calories,
                        "time":time
                    })

                    id_count += 1
                    print("SUCCESS : {fn} : {id} : {url}".format(id=id_count, fn=fn, url=recipe["url"]))
                    
                except Exception as e:
                    print("FAIL : {fn} : {id} : {url}".format(id=id_count, fn=fn, url=recipe["url"]))
                    print(e)

            with open('recipes3/{fn}'.format(fn=fn),'w') as outfile:
                json.dump(all_recipes, outfile)
                all_recipes = []

        except:
            pass

# with open('recipes.json', 'w') as outfile:
#     json.dump(all_recipes, outfile)
