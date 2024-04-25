# Use an official Node.js image based on Alpine Linux
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the rest of your application code
COPY ./ /app

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile


# Expose the port your app runs on
EXPOSE 8000

# Command to run your app
CMD ["yarn", "start"]
