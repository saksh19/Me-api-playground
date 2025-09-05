# Me-api-playground
# ARCHITECTURE
- The project follows a client-server architecture:
- Frontend: Built with ReactJS, responsible for UI rendering and API interactions.
- Backend: Developed using Node.js with Express, exposing RESTful APIs.
- Database: MySQL 12 with Sequelize ORM for data modeling and management.
- Deployment: Configurable for both local development and production environments.
  
# SETUP
-Local Development
 -Install dependencies
  -Backend:
    npm install CORS express
-Frontend:
 -npm install
 -Configure environment variables

 -Create a .env file in the server folder with the following keys:

DB_HOST=admin
DB_USER=root
DB_PASSWORD=****
DB_NAME=me_api
PORT=3000
JWT_SECRET=<my-secret-key>

-Run the backend server

 cd server
 npx nodemon index.js

-Run the frontend application

cd client
npm run dev


Open the application

Visit http://localhost:5173 to access the application locally.

# Production Deployment

Build the frontend for production

cd client
npm run build

drag and drop client/dist folder on netlify to deploy


Deploy the backend

Use Railway to run the server.

Configure production environment variables

Set .env values appropriate for production.

# Database Schema

-The project uses the following main tables:

Users

| Column   | Type    | Description       |
| -------- | ------- | ----------------- |
| id       | INT     | Primary Key       |
| name     | VARCHAR | User full name    |
| email    | VARCHAR | Unique user email |
| password | VARCHAR | Hashed password   |

Skills

| Column   | Type    | Description       |
| -------- | ------- | ----------------- |
| id       | INT     | Primary Key       |
| name     | VARCHAR |  skill name       |




