# File: /backend/devops/docker/Dockerfile

# Step 1: Use a lightweight base image (Node.js 16 on Alpine Linux)
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Step 4: Copy the rest of the application code into the container
COPY . .

# Step 5: Expose the port the application will run on
EXPOSE 3000

# Step 6: Set the default command to run the application
CMD ["npm", "start"]
 
