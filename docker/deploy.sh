#!/bin/bash
echo ------------------------------
echo BUILD DOCKER IMAGE
docker build -t evatoolui_image /home/evauser/evatool/frontend/docker
echo ------------------------------
echo RUNNING CONTAINERS
docker ps
echo ------------------------------
echo STOP DOCKER CONTAINER
docker stop evatoolui_container
echo ------------------------------
echo START DOCKER CONTAINER
docker run --name evatoolui_container -d --rm -p 80:80 evatoolui_image
echo ------------------------------
echo RUNNING CONTAINERS
docker ps
echo ------------------------------
echo ALL DOCKER IMAGES
docker images
echo ------------------------------
echo REMOVE DANGLING IMAGES
docker images --no-trunc -q -f dangling=true | xargs -r docker rmi
echo ------------------------------
echo ALL DOCKER IMAGES
docker images
echo ------------------------------
