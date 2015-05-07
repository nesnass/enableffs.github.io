#!/usr/bin/python
from HTMLParser import HTMLParser
from os.path import join
from os import walk
import json

fPath = 'partials/'
fList = []
metaTags = ['meta']
dataTags = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'section', 'aside', 'header', 'footer']
freetext_dictionary = {}
meta_dictionary = {}
minWordLength = 4
extractWordLength = 30
metaTagName = "content"
# e.g. <meta name="categories" content="one,two,three,four">

# create a subclass for the parser and override the handler methods
class MyHTMLParser(HTMLParser):
	takeTheData = False
	currentPath = ""

	#Decide whether to look within this tag
	def handle_starttag(self, tag, attrs):
		if tag in dataTags:
			self.takeTheData = True
		if tag in metaTags:
			for name, value in attrs:
				if name == metaTagName:
					keywordlist = value.split(",")
					for word in keywordlist:
						self.add_to_meta_dictionary(word)

	#Handle data in tag
	def handle_data(self, data):
		if self.takeTheData:
			extract = ""
			wordlist = data.split(" ")
			for idx, word in enumerate(wordlist):
				if len(word) >= minWordLength:
					extract = self.create_extract(word, idx, wordlist)
					self.add_to_freetext_dictionary(word, extract)
		self.takeTheData = False

	def add_to_freetext_dictionary(self, word, extract):
		newEntry = {'extract' : extract, 'path' : self.currentPath}
		if word in freetext_dictionary:
			freetext_dictionary[word].append(newEntry)
		else:
			freetext_dictionary[word] = [newEntry]

	def add_to_meta_dictionary(self, word):
		newEntry = {'path' : self.currentPath}
		if word in meta_dictionary:
			meta_dictionary[word].append(newEntry)
		else:
			meta_dictionary[word] = [newEntry]

	# Create an extract of the words surrounding the search word
	def create_extract(self, word, index, wordlist):
		extract = ""
		end = len(wordlist)
		i = 0
		j = index - extractWordLength // 2
		if j < 0:
			j = 0
		if len(wordlist) <= extractWordLength:
			extract = " ".join(wordlist)
		else:
			while (i <= extractWordLength and j < end):
				extract+=wordlist[i]+" "
				i+=1
				j+=1
		return extract

	def set_path(self, path):
		self.currentPath = path


#build fList automatically
for (dirpath, dirnames, filenames) in walk(fPath):
	for fname in filenames:
		if fname.endswith(".html"):
			theFile = join(dirpath, fname)
			fList.append(theFile)

# instantiate the parser
parser = MyHTMLParser()

#feed it some HTML
for x in fList:
	#open file
	#f = open(fPath+x, 'r')
	f = open(x, 'r')
	s = f.read()
	parser.set_path(x)
	parser.feed(s)

#write out to a JSON file
#with open('freetext_dictionary.json', 'w') as fp:
#    json.dump(freetext_dictionary, fp)
with open('meta_dictionary.json', 'w') as fp:
    json.dump(meta_dictionary, fp)