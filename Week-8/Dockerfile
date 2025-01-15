# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy all files from the current directory to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port your app listens on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]