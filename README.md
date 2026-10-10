# Shop Management

A shop management web application built with Node.js and Express.js. This project focuses on learning backend development, database management, authentication, and e-commerce workflows.

## Features

- **Product Management**: Manage product information, including titles, prices, descriptions, and image URLs.
- **Shopping Cart**: Add products to the cart, manage cart items, and calculate totals.
- **User Authentication**: Handle user login and session-based authentication.
- **Password Security**: Hash and verify passwords using bcrypt.
- **Email Verification**: Support email verification workflows using tokens.
- **Database Integration**: Use Sequelize ORM to interact with a MySQL database.
- **Server-side Rendering**: Render dynamic web pages using Pug templates.

> Update this section to reflect the features currently implemented in the repository.

## Tech Stack

- **Runtime:** Node.js
- **Web Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Template Engine:** Pug
- **Authentication:** Express Session
- **Password Hashing:** bcrypt
- **Email Service:** Nodemailer
- **Environment Configuration:** dotenv

## Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- Git

A code editor such as Visual Studio Code is recommended.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/genhakiyama/Shop_management.git
cd Shop_management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a MySQL database

Start your MySQL server and log in:

```bash
mysql -u root -p
```

Create a database:

```sql
CREATE DATABASE shop_management;
```

Exit the MySQL shell:

```sql
EXIT;
```

Use the database name and credentials that match your local MySQL configuration.

### 4. Configure environment variables

Create a `.env` file in the project root directory.

Example:

```ini
PORT=3000

DB_NAME=shop_management
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

SESSION_SECRET=replace_with_a_long_random_secret

BASE_URL=http://localhost:3000

EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_app_password
```

Replace the example values with your own configuration.

**Important:** Never commit your real `.env` file, database passwords, session secrets, or email credentials to GitHub.

Make sure `.env` is included in `.gitignore`. You can provide a `.env.example` file containing placeholder values for other developers.

> Keep only the environment variables actually used by your application. Variable names must match those referenced in your source code.

### 5. Start the application

Check `package.json` for the available scripts.

If the project defines a start script:

```bash
npm start
```

If it uses Nodemon for development, run the development script defined in `package.json`, for example:

```bash
npm run dev
```

If neither script exists, use the actual application entry file, such as:

```bash
node app.js
```

Replace `app.js` with the correct entry filename if necessary.

### 6. Open the application

If the server is configured to use port 3000, open:

http://localhost:3000

Make sure the MySQL server is running and the database credentials are correct before starting the application.

## Usage

### Product Management

- Browse available products.
- View product details.
- Add products through the product management interface, if supported.
- Manage product information according to the application's available routes.

### Shopping Cart

- Add products to the shopping cart.
- View cart items.
- Review quantities and the total price.
- Remove items from the cart, if supported.

### User Authentication

- Log in using an existing account.
- Access protected pages after authentication.
- Log out to terminate the current session.
- Complete email verification if required by the registration workflow.

The exact routes and available actions depend on the current implementation.

## Project Structure

The application uses a modular structure to separate responsibilities.

```text
Shop_management/
├── Controller/       # Request handling and application logic
├── Module/           # Data models and database operations
├── Middleware/       # Authentication and authorization
├── Helpers/          # Shared utility functions
├── views/            # Pug templates
├── public/            # CSS and static assets
├── .env.example       # Example environment configuration
├── .gitignore
├── package.json
└── README.md
```

This is an illustrative structure. Adjust the folder names to match the actual repository.

## Troubleshooting

### Database connection errors

- Verify that MySQL is running.
- Check `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`.
- Confirm that the database exists and the database user has the required permissions.

### Missing environment variables

- Make sure `.env` exists in the project root.
- Confirm that `dotenv` is loaded before the environment variables are accessed.
- Check that variable names match the source code exactly.

### Port already in use

Change `PORT` in `.env` if the application supports environment-based port configuration, then restart the server.

### Dependencies or startup errors

Run `npm install`, inspect the error message, and verify the start scripts in `package.json`.

## Future Improvements

- Order creation and order history.
- Inventory and stock management.
- Product search, filtering, sorting, and pagination.
- Customer and administrator roles.
- Input validation and centralized error handling.
- Automated tests for authentication, products, and shopping cart operations.
- Deployment and production configuration.

## Learning Objectives

This project provides practical experience with:

- Building web applications using Express.js.
- Organizing controllers, models, routes, and middleware.
- Working with relational databases through Sequelize.
- Implementing session-based authentication.
- Securing passwords and handling email verification.
- Managing environment variables and application configuration.

## License

Add the license applicable to this project before distributing or reusing the code.
