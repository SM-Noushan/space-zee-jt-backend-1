# API Endpoints - Server 1 (Sensitive Data Service)

## Overview

Server 1 provides the following endpoints to manage sensitive user data and communicate securely with Server 2 for non-sensitive data. Each endpoint includes details on request methods, payloads, and responses.

---

## API Endpoints

### 1. **Create User**

**Endpoint**: `/user`

**Method**: `POST`

**Description**: Accepts sensitive user data, hashes the password, saves it in the database, and forwards non-sensitive data to Server 2.

**Request Payload**:

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword123",
  "bio": "Software Developer",
  "interests": ["coding", "gaming"]
}
```

**Response**:

- **Success (201)**:
  ```json
  {
    "message": "User created successfully"
  }
  ```
- **Error (400)**:
  ```json
  {
    "success": false,
    "message": "Missing or invalid fields: email, password",
    "statusCode": 400
  }
  ```

---

### 2. **Retrieve User**

**Endpoint**: `/user/:id`

**Method**: `GET`

**Description**: Retrieves sensitive user data from Server 1 and non-sensitive data from Server 2, combining them into a unified response.

**Path Parameters**:

- `id`: The unique ID of the user.

**Response**:

- **Success (200)**:
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "bio": "Software Developer",
    "interests": ["coding", "gaming"]
  }
  ```
- **Error (404)**:

  ```json
  {
    "status": false,
    "message": "User not found",
    "statusCode": 404
  }
  ```

---

## Error Response Structure

All errors follow this unified structure:

```json
{
  "status": false,
  "message": "Error message",
  "statusCode": <HTTP status code>
}
```

---

## Authentication

Authentication between Server 1 and Server 2 is managed via a shared secret, passed as a `Bearer` token in the `Authorization` header of inter-service API requests.
