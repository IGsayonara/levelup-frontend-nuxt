# Use an official Node.js runtime as the base image
FROM node:20-buster

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies and Dart Sass (required for compiling SCSS)
RUN npm install --production \
    && npm install  sass-embedded-linux-x64
# Copy the rest of the application
COPY . .

# Build the Nuxt.js application for production
RUN npm run build

# Expose the port Nuxt.js will run on
EXPOSE 3000

# Run the Nuxt.js application in SSR mode
CMD [ "node", ".output/server/index.mjs" ]