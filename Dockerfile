# Use Node 16 alpine as parent image
FROM node:18-alpine

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json to the /app directory
COPY package.json ./

# Install, Testing and Building dependencies
RUN npm install

# Copy the rest of project files into this image
COPY . .

RUN npm run build 

# Expose application port
EXPOSE 3000

COPY .env.development ./dist/
# Start the application
CMD ["node", "dist/main"]