# Server 1 - SpaceZee Sensitive Data Service

## Overview

Server 1 is a dedicated service for managing sensitive user data, including usernames, emails, and hashed passwords. It communicates securely with Server 2 to handle non-sensitive profile data, ensuring a modular and secure architecture.

---

## Features

### User Management

1. **Create User**:

   - Accepts sensitive user data (username, email, password).
   - Hashes the password securely using bcrypt.
   - Saves sensitive data in the database.
   - Forwards non-sensitive data (bio, interests) to Server 2 securely.

2. **Retrieve User**:
   - Aggregates sensitive data from Server 1 and non-sensitive data from Server 2.
   - Returns a unified response.

### Security

- Passwords are hashed using bcrypt for secure storage.
- Communication between Server 1 and Server 2 is secured using shared secrets (set via environment variables).

---

## Error Handling

All errors follow a unified response structure for consistency and better debugging:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400
}
```

---

## Environment Variables

All necessary environment variable names are provided in the `.env.example` file. Ensure you create a `.env` file in your project root and populate it with the correct values.

Example variables include:

- `DB_URL`: Connection string for Server 1 MongoDB.
- `PORT`: Port number for the server.

For a complete list of environment variables, refer to the `.env.example` file.

---

## API Details

API details, including endpoints and request/response formats, are provided in the `API.ENDPOINTS.md` file. Ensure to review it for integration and usage.

---

## Project Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (running instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sm-noushan/space-zee-jt-backend-1
   cd space-zee-jt-backend-1
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file from `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Populate it with the necessary values.

4. Start the server:

   ```bash
   npm run start
   ```

5. Access the API at `http://localhost:<PORT>`.

---

## Contribution

Contributions are welcome. Follow these steps:

1. Fork the repository.
2. Clone the forked repository.
3. Create a feature branch and implement changes.
4. Submit a pull request.
