FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Generate Prisma client first
RUN npx prisma generate

# Build the NestJS application
RUN yarn build

# Make sure the dist directory exists and has content
RUN ls -la dist/

# Start the application
CMD ["yarn", "start:prod"]