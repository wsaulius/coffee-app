#!/bin/bash 

docker build -t ionic-app . 
docker run -p 8080:8080 ionic-app serve

