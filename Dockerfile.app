# Base image
FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Define environment variables
ENV DB_TYPE=postgres
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASS=postgres
ENV DB_NAME=postgres
ENV JWT_SECRET=b8cfcc9590927546c9dbf97ccc5b32b0f038ce37d39e82c058bacb7615f85e25

# Expose port
EXPOSE 3000

# Start app
CMD [ "node", "dist/main" ]