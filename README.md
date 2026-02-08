How to Run the Project?

Prerequisites:

- Node.js installed
- MongoDB Atlas connection

Installation:
- npm install

Run the Server
node server.js


After running the command, the server will start on:

http://localhost:5000


If the connection is successful, you will see:

Server running on port 5000

MongoDB connected

API Endpoints:

Authentication (Public)
POST	/api/auth/register	
Register a new user (password is hashed using bcrypt)

POST	/api/auth/login	
Authenticate user and return JWT token
User (Private – JWT required)

GET	/api/users/profile	
Get logged-in user profile

PUT	/api/users/profile	
Update logged-in user profile

All user routes are protected using JWT authentication middleware.

Courses (Private – JWT required)

My Courses (CRUD – only owner access)

POST	/api/courses	
Create a new course

GET	/api/courses	
Get courses created by the logged-in user

GET	/api/courses/:id	
Get a specific course (only owner)

PUT	/api/courses/:id	
Update a course (only owner)

DELETE	/api/courses/:id	
Delete a course (only owner)

All Courses (Read-only)

GET	/api/courses/all	
Get all courses created by all users (read-only)

Users are allowed to view all courses but can modify or delete only their own courses.

Authorization

All private endpoints require the following HTTP header:

Authorization: Bearer <JWT_TOKEN>

Testing

API endpoints can be tested using: Postman