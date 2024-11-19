# Use the latest Node.js LTS version
FROM node:lts

# Update and install required packages
RUN apt-get update -y && apt-get upgrade -y

# Set working directory in the container
WORKDIR /app/

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for the Express server
EXPOSE 8000

# Run the application
CMD ["node", "index.js"]
