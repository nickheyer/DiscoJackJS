FROM node:16-alpine

# Creating dir for Discord bot app
WORKDIR /usr/src/app

# Copy dependecy list to app directory
COPY package*.json ./

# Installing dependencies with NPM, already updated
RUN npm install 

#Bundling all source code to app dir
COPY . .

# Entrypoint
CMD ["node", "."]

