# authentication-and-authorization
 Node.js application that demonstrates user authentication and authorization using Express, MongoDB, bcrypt for password hashing, and JWT for session management.



## Features

- User registration with hashed passwords
- User login with JWT-based authentication
- Cookie-based session management
- Logout functionality
- EJS templating for frontend forms

## Setup Instructions

1. **Install dependencies:**
   ```sh
   npm install
   ``

2. **Start MongoDB:**
   Make sure MongoDB is running locally on port 27017.

3. **Run the application:**
   ```sh
   node app.js
   ```

4. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Register:** Go to `/` and fill out the registration form.
- **Login:** Go to `/login` and enter your credentials.
- **Logout:** Visit `/logout` to clear your session.

## Technologies Used

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [EJS](https://ejs.co/)
- [Tailwind CSS](https://tailwindcss.com/) (via CDN)
