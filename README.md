# Product Management System

A full-stack application for managing products with user authentication and role-based access control.

## Features

- **User Authentication**: Register, login, and logout functionality
- **Role-Based Access Control**: Regular users and admin users with different permissions
- **Product Management**: Browse, search, filter, and view product details
- **Admin Dashboard**: Manage products (create, update, delete) and users

## Tech Stack

### Frontend

- React with TypeScript
- React Router for navigation
- React Query for server state management
- Axios for API requests
- Context API for state management
- Tailwind CSS for styling

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

## Project Structure

The project is organized into two main directories:

### Frontend Structure

```
frontend/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Shared components like buttons, inputs, etc.
│   │   ├── layout/        # Layout components like header, footer, etc.
│   │   ├── products/      # Product-related components
│   │   └── auth/          # Authentication-related components
│   ├── contexts/          # React Context providers
│   ├── features/          # Feature-specific code
│   │   ├── auth/          # Authentication feature
│   │   ├── products/      # Products feature
│   │   ├── cart/          # Shopping cart feature
│   │   └── admin/         # Admin dashboard feature
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   │   ├── auth/          # Auth pages (login, register)
│   │   ├── products/      # Product pages
│   │   └── admin/         # Admin pages
│   ├── services/          # API service functions
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
```

### Backend Structure

```
backend/
├── src/
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── services/          # Business logic
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation and Setup

1. Clone the repository

   ```
   git clone https://github.com/yourusername/product-management-system.git
   cd product-management-system
   ```

2. Backend Setup

   ```
   cd backend
   npm install
   cp .env.example .env   # Update with your configuration
   npm run dev
   ```

3. Frontend Setup

   ```
   cd frontend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## User Roles

- **Regular Users**: Can browse products, view details, and add to cart
- **Admin Users**: Can do everything regular users can, plus manage products and users

## License

This project is licensed under the MIT License.
