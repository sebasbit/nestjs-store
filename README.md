# NestJS Store

## Description
A RESTful API built with NestJS for an online store. It includes user authentication with JWT, user registration, and CRUD operations for categories and products. The API documentation is available via Swagger.

## Features
- User authentication with email and password, JWT-based.
- Endpoints for user registration.
- CRUD operations for categories.
- CRUD operations for products.
- API documentation available at `/api`.
- Docker Compose setup for deployment with a PostgreSQL database.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/nestjs-store.git
   cd nestjs-store
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables: Create a .env file in the root directory and add the following:
   ```
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_USERNAME=root
   DB_PASSWORD=1234
   DB_NAME=nestjs_store
   JWT_SECRET=your_jwt_secret
   ```
## Running Migrations

1. Run the database migrations:
   ```bash
   npm run migration:run
   ```

## Running the Application

1. Start the application:
   ```bash
   npm run start:dev
   ```
2. Access the API documentation: Open your browser and navigate to http://localhost:3000/api.

## Docker Deployment

1. Ensure Docker and Docker Compose are installed on your machine.
2. Start the application with Docker Compose:
   ```bash
   docker-compose up -d
   ```
3. The application will be available at http://localhost:3000.
