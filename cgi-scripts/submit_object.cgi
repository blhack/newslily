#!/usr/bin/python

import cgi
import sys
import json
import Cookie
import os

sys.path.append("/home/john/projects/lilian/")

import lilian

cookie = Cookie.SimpleCookie(os.environ.get("HTTP_COOKIE",""))
if cookie.has_key("session_id"):
  session_id = cookie["session_id"].value

form = cgi.FieldStorage()
token = form.getvalue("token","")
url = form.getvalue("url","")
title = form.getvalue("title","")
category = form.getvalue("category","")


object_id = lilian.submit_object(url,title,category,session_id,token)


print "Content-type:application/json"
print
response = {"object_id":object_id}

print (json.JSONEncoder().encode(response))
