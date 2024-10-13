# Use the official node base image
FROM node:20.18-slim

# Set the working directory inside the container
WORKDIR /

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the system dependencies
RUN apt-get update \
    && apt-get -y install gcc \
    && rm -rf /var/lib/apt/lists/*

# Install the Node.js dependencies
RUN npm install \
    && npm install -g serve

# Copy the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Serve the React application
CMD ["serve", "-s", "build"]
