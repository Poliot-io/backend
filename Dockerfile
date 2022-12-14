FROM node:18-alpine

# Install dependencies
COPY package.json  ./
RUN npm install --frozen-lockfile

# Copy source code

WORKDIR /app


COPY . .