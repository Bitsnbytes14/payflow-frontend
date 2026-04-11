# PayFlow

## Project Overview

PayFlow is a full-stack payment gateway where merchants can register, authenticate via JWT, create orders, process payments, track transactions, and receive automated webhook events.

## Tech Stack

* **Frontend**: React (Vite), Tailwind CSS
* **Backend**: Node.js, Express, PostgreSQL, Redis (BullMQ)

## Key Features

* Idempotent payment processing preventing duplicate charges
* ACID compliant transactions using PostgreSQL
* Asynchronous webhook delivery with retries via BullMQ
* Secure JWT authentication
* Merchant dashboard for transaction monitoring and status tracking

## Payment Flow

1. **Register**: Merchant creates an account and configures an external webhook URL.
2. **Create Order**: System generates a unique order resource for the transaction.
3. **Process Payment**: Payment logic executes against the generated order ID.
4. **Status Update**: Order state updates based on payment outcome.
5. **Webhook Trigger**: System asynchronously dispatches the event payload to the merchant server.

## Architecture

```text
Frontend -> Backend -> PostgreSQL + Redis -> Webhook Worker -> Merchant Server
```

## Setup

### Backend

1. Navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables for database, Redis, and JWT.
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the client:
   ```bash
   npm run dev
   ```

## Why This Project

PayFlow serves to demonstrate real-world system design for high-stakes applications. It handles failures properly and implements production-level backend concepts, focusing on data integrity, fault tolerance, and secure scalable architecture.
