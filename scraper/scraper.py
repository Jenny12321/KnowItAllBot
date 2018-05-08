import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)
# @app.route("/output")
# def output():
# 	return "Hello World!"

@app.route("/postmethod", methods = ['GET', 'POST'])
def get_results():
	print "asdfasdf"
	if request.method == 'POST':

		#req = request.form.to_dict()
		#----
		# req = request.get_data()
		# jsonData = json.loads(req)
		# question = jsonData['params']
		#----
		
		#user's question
		
		#-----search_item = question
		search_item = "what is the largest country"
		#google url
		url = 'https://www.google.ca/search?q=' + search_item

		#make request and get content of result
		r = requests.get(url).text

		soup = BeautifulSoup(r, "lxml")

		#extracting results from html
		# for results in soup.findAll('span', {'class': 'st'}):
		# 	answer = ''.join(results.strings)
		# 	if (answer != ''):
		# 		print answer
		# 		break

		for results in soup.findAll('div', {'class': 'g'}, {'class', 'st'}):
			#answer = ''.join(results.strings)
			answer = results.get_text(separator='')

			if ("http" in answer):
				ind = answer.index("http")
				answer = answer[:ind] + "\n" + answer[ind:]

			if (answer != ''):
				print answer
				break
		return answer
	else:
		return "Get not supported"

if __name__ == "__main__":
	app.run()
