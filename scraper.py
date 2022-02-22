#!/usr/bin/python

from bs4 import BeautifulSoup
import json
import requests
import sys

url="https://www.allrecipes.com/sitemaps/recipe/{i}/sitemap.xml"

i = 1 if len(sys.argv) < 2 else sys.argv[1]
start = 0 if len(sys.argv) < 3 else int(sys.argv[2])
stop = float('inf') if len(sys.argv) < 4 else int(sys.argv[3])
content = requests.get(url.format(i=i)).text
soup = BeautifulSoup(content, "lxml")
rec_urls = soup.find_all("loc")

count = 0
rec_urls_set = set()
data = {'recipes':[]}

for rec_url in rec_urls:
    if rec_url not in rec_urls_set:
        count += 1
        rec_urls_set.add(rec_url)
        if (count > start and count < stop):
            status = "SUCCESS"
            try:
                content = requests.get(rec_url.string).text
                soup = BeautifulSoup(content, "lxml")
                name = soup.find("h1", {"class": "headline heading-content elementFont__display"}).string
                ingredients = [s.string for s in soup.find_all("span", {"class": "ingredients-item-name elementFont__body"})]
                directions = [li.find("p").string for li in soup.find_all("li", {"class": "subcontainer instructions-section-item"})]
                data['recipes'].append({ "url":rec_url.string, "name":name, "ingredients":ingredients, "directions":directions})
            except Exception as e:
                status = "FAIL"
                print(e)
            print("{count} : {status} : {url}".format(count=count,status=status,url=rec_url.string))
            if count % 1000 == 0:
                print(data)
                with open("recipes{i}_{count}.json".format(i=i,count=count), 'w') as outfile:
                    json.dump(json.dumps(data), outfile)
                data = {'recipes':[]}

print(data)
with open("recipes{i}_{count}.json".format(i=i,count=count), 'w') as outfile:
    json.dump(json.dumps(data), outfile)
