# Docker Image which is used as foundation to create a custom Docker Image with this Dockerfile
# The foundational image (here FROM) we are using here makes sure that all Node/npm commands 
# are available in the Dockerfile. Otherwise, if using a non related Node image, 
# we would need to install Node in the Dockerfile ourselves before we could use the Node specific commands.
FROM node:12.13.0

# set working directory
WORKDIR /usr/app/client

# copy json files in to WORKDIR
COPY package*.json ./

# install and cache app dependencies
RUN npm install --silent

# start app
CMD ["npm", "start"]