# E-Commerce Application

This is a scalable e-commerce platform designed to provide a comprehensive solution for online retail. This platform encompasses various services including user management, product catalog, shopping cart functionality, payment processing, and notification services, all built to work seamlessly to create a robust e-commerce backend ecosystem.

## Services

- **User Service**: Manages user data and authentication.
- **Product Service**: Manages product information.
- **Shopping Cart Service**: Manages shopping cart operations.
- **Order Service**: Manages order processing.
- **Payment Service**: Handles payment transactions.
- **Notification Service**: Sends notifications to users.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB running on your local machine or set up a MongoDB Atlas account

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/milindrai/E-Commerce-Application.git
   cd E-Commerce-Application
   ```
   
2. Install dependencies for each service:
   ```bash
   cd services/user-service
   npm install
   cd ../product-service
   npm install
   cd ../shopping-cart-service
   npm install
   cd ../order-service
   npm install
   cd ../payment-service
   npm install
   cd ../payment-gateway
   npm install
   cd ../notification-service
   npm install
   ```

## Environment Variables

Each service requires specific environment variables. You can find the required variables in the `.env` file of each service.

### Example for `user-service`:
```env
PORT=5001
DB_URI=mongodb://mongo:27017yourdburl
JWT_SECRET=yoursecretjwtkey
```


## Running the Services

1. Start MongoDB:
   ```bash
   mongod --dbpath /path/to/your/db
   ```

2. Start each service individually. Navigate to the respective service directory and run:
   ```bash
   npm start
   ```

## API Endpoints
User Service:
- **Base URL**: /api/users
- **Port**: 5001

Product Service:
- **Base URL**: /api/products
- **Port**: 5002

Shopping Cart Service:
- **Base URL**: /api/cart
- **Port**: 5003

Order Service:
- **Base URL**: /api/orders
- **Port**: 5004

Payment Service:
- **Base URL**: /api/payments
- **Port**: 5005

Notification Service:
- **Base URL**: /api/notifications
- **Port**: 5006


## Technologies Used
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
