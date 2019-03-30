#!/bin/bash

cd /home/Hosting
docker rm $(docker ps -a -q)
docker run -d armourshield/apple -p 49160:3000