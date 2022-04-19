#!/usr/bin/python

from bs4 import BeautifulSoup
import json
import requests
import sys

base_url="https://www.allrecipes.com/sitemaps/recipe/{i}/sitemap.xml"

i = 1 if len(sys.argv) < 2 else sys.argv[1]
start = 0 if len(sys.argv) < 3 else int(sys.argv[2])
stop = float('inf') if len(sys.argv) < 4 else int(sys.argv[3])
content = requests.get(base_url.format(i=i)).text
soup = BeautifulSoup(content, "lxml")
urls = soup.find_all("loc")

count = 0
recipes = []
for url in urls:
    count += 1
    if (count > start and count < stop):
        status = "SUCCESS"
        try:
            content = requests.get(url.string).text
            recipes.append({"url": url.string, "html": content})
        except Exception as e:
            status = "FAIL"
            print(e)
        print("{i}.{count} : {status} : {url}".format(i=i, count=count,status=status,url=url.string))
        if count % 1000 == 0:
            with open("recipes{i}_{count}.json".format(i=i,count=count), 'w') as outfile:
                json.dump(recipes, outfile)
            recipes = []

with open("recipes{i}_{count}.json".format(i=i,count=count), 'w') as outfile:
    json.dump(recipes, outfile)
