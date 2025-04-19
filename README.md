# Event Management Platform

## Overview

The Event Management Platform is a full-stack web application built with Next.js, React, and Prisma, designed to facilitate event creation, management, bidding, and user interactions. Users can register, log in, browse events, place bids, manage resources, send messages, and receive notifications. The application integrates Stripe for payments and uses Redux for state management.

## Features

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Event Management**: Create, view, and manage events with dynamic categories.
- **Bidding System**: Place and manage bids on event-related posts.
- **Resource Management**: Add and manage resources associated with events.
- **Messaging**: Real-time messaging between users.
- **Notifications**: Receive updates on bids, events, and requests.
- **Payment Integration**: Secure payments via Stripe.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js, React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Redux Toolkit
- **Payments**: Stripe
- **Authentication**: JWT
- **File Uploads**: Multer for handling image uploads
- **Deployment**: Vercel (recommended)

## Project Structure

```
spl-2/
├── app/                    # Next.js app directory (pages and API routes)
├── components/             # Reusable React components
├── prisma/                 # Prisma schema, migrations, and seed scripts
├── redux/                  # Redux slices, store, and hooks
├── server/                 # Express.js backend (controllers, routes, services)
├── public/                 # Static assets (e.g., favicon)
├── README.md               # Project documentation
├── package.json            # Dependencies and scripts
├── next.config.mjs         # Next.js configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
└── postcss.config.mjs      # PostCSS configuration
```

For a detailed folder structure, refer to `project_structure.txt`.

## Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Stripe account (for payment integration)
- Git

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/shahalam22/spl-2.git
   cd spl-2
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**: Create a `.env` file in the root directory and add the following:

   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   JWT_SECRET="your_jwt_secret"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   ```

4. **Set Up the Database**:

   - Ensure PostgreSQL is running.
   - Run Prisma migrations:

     ```bash
     npx prisma migrate dev
     ```
   - Seed the database (optional):

     ```bash
     node prisma/seed.js
     ```

5. **Run the Application**:

   - Start the Next.js frontend and Express backend:

     ```bash
     npm run dev
     ```
   - The app will be available at `http://localhost:3000`.

## Usage

- **Register/Login**: Create an account or log in to access the platform.
- **Browse Events**: Explore events by category or view all events on the dashboard.
- **Create Events**: Use the event form to create new events.
- **Place Bids**: Bid on event posts via the bidding dialog.
- **Manage Resources**: Add or view resources associated with events.
- **Messages & Notifications**: Communicate with other users and stay updated via notifications.

## API Endpoints

The backend provides RESTful APIs under `/api`. Key routes include:

- `/api/users`: User registration, login, and profile management.
- `/api/events`: Create, read, update, and delete events.
- `/api/bids`: Manage bids on posts.
- `/api/messages`: Send and retrieve messages.
- `/api/notifications`: View and manage notifications.
- `/api/stripe`: Handle Stripe payments.

Refer to the `server/routes/` directory for detailed route definitions.

## Deployment

To deploy the application:

1. Push the code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set up environment variables in Vercel.
4. Deploy the app and configure a custom domain (optional).

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Contact

For questions or support, contact the project maintainer at shahalam22.official@gmail.com or open an issue on GitHub.
