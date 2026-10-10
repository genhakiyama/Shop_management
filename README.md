# Shop Management System

A web-based shop management application built with Node.js and Express.js. The project aims to help shopkeepers manage products, handle shopping carts, and organize essential shop operations through a web interface.

## Features

- **Product Management**: View product listings and product details.
- **Shopping Cart**: Add products to the cart, manage cart items, and calculate the total price.
- **User Authentication**: Handle user login and session-based authentication.
- **User Profiles**: View and update user profile information.
- **Password Security**: Hash passwords using bcrypt.
- **Email Verification**: Support email verification workflows.
- **Database Integration**: Use Sequelize ORM to interact with a MySQL database.
- **Server-Side Rendering**: Render dynamic web pages using Pug templates.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web application framework |
| Sequelize | Object-relational mapping (ORM) |
| MySQL | Relational database |
| Pug | Server-side templating engine |
| express-session | Session management |
| bcrypt | Password hashing |
| Nodemailer | Email delivery |
| dotenv | Environment variable management |

## Project Structure

```text
Shop_management/
├── Controller/      # Request handling and business logic
├── Helpers/         # Reusable utility functions
├── Middleware/      # Authentication and request middleware
├── Module/          # Data models and database operations
├── Routes/          # Application route definitions
├── Views/           # Pug templates
├── public/
│   └── css/         # Stylesheets
├── app.js           # Application entry point
├── .gitignore
├── nodemon.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [MySQL](https://www.mysql.com/)

### 1. Clone the repository

```bash
git clone https://github.com/genhakiyama/Shop_management.git
cd Shop_management
```

### 2. Install dependencies

Install the dependencies declared by the project:

```bash
npm install
```

If the project does not yet have a `package.json` with all required dependencies, configure it before proceeding.

### 3. Configure environment variables

Create a `.env` file in the project root and configure the database connection and other required secrets.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=shop_management
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password

SESSION_SECRET=your_session_secret

BASE_URL=http://localhost:3000

EMAIL_USER=your_email_address
EMAIL_PASSWORD=your_email_app_password
```

Replace the example values with your local configuration. The exact variable names must match those referenced in your source code.

**Security:** Never commit your `.env` file or expose database passwords, session secrets, or email credentials. Add `.env` to `.gitignore` and consider providing a `.env.example` containing placeholder values.

### 4. Set up the database

Create the MySQL database configured in your `.env` file.

```sql
CREATE DATABASE shop_management;
```

Ensure that the database models and Sequelize configuration are initialized correctly before starting the application.

### 5. Run the application

Start the application using the script defined in `package.json`. For example, if a `start` script is configured:

```bash
npm start
```

For development with Nodemon, if the corresponding script is configured:

```bash
npm run dev
```

Open the application at `http://localhost:3000`, or use the port configured in your environment.

## Learning Objectives

This project provides practical experience with:

- Building a web application using Node.js and Express.js.
- Organizing an application using routes, controllers, models, and middleware.
- Working with relational databases and Sequelize ORM.
- Implementing authentication and session management.
- Securing user passwords and managing sensitive environment variables.
- Integrating email functionality into a backend application.
- Rendering dynamic pages with Pug and styling them with CSS.

## Future Improvements

- Improve input validation and error handling.
- Add automated tests for routes and business logic.
- Improve the user interface and responsive design.
- Add product search, filtering, and pagination.
- Strengthen authentication and authorization.
- Improve deployment configuration and documentation.

## Author

**Nguyễn Hữu Nguyên**

GitHub: [@genhakiyama](https://github.com/genhakiyama)

---

*This project is being developed as a practical learning project for backend development and shop management workflows.*
