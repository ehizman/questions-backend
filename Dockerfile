# pull official node 16 image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure that both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only-production

# Bundle app source
COPY . .

# Expose the port that your app runs on
EXPOSE 5000

CMD ["npm", "run", "dev"]


