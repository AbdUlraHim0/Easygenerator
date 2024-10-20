# EasyGenerators Backend Documentation

## Overview
The EasyGenerators backend is built using **NestJS**, leveraging **MongoDB** for data storage, **Redis** for caching tokens, and **JWT** for secure authentication. It includes multiple layers of security, such as rate limiting, **Helmet** for security headers, and **CORS** for cross-origin protection.

## Folder Structure
The backend follows a modular structure to keep the codebase organized and maintainable:
server/ │ ├── src/ │ ├── authentication/ │ ├── config/ │ ├── constants/ │ ├── database/ │ ├── enums/ │ ├── interceptors/ │ ├── interfaces/ │ ├── logger/ │ ├── redis/ │ ├── schemas/ │ ├── users/ │ └── main.ts │ ├── libs/ │ └── common/ │ ├── test/ │ ├── Dockerfile ├── nest-cli.json ├── package.json └── tsconfig.json


## Authentication Mechanism
The backend uses **JWT-based authentication** with access and refresh tokens:

### Access Token
- Used to authenticate API requests.
- Has a short lifespan.
- Sent in the **Authorization** header.

### Refresh Token
- Used to generate new access tokens.
- Stored securely (e.g., HTTP-only cookies).
- Cached in Redis for faster performance.

### JWT Flow
1. **Sign In**: Successful login returns both access and refresh tokens.
2. **Token Refresh**: Refresh tokens generate new access tokens upon expiry.
3. **Sign Out**: Refresh tokens are invalidated in Redis to prevent reuse.

## Security Implementations
- **Helmet**: Sets various HTTP headers to protect against well-known web vulnerabilities.
- **CORS**: Configured to allow specific origins and methods for enhanced security.
- **Rate Limiting**: Limits the number of requests a client can make within a given timeframe to prevent abuse.

## Redis for Caching
- **Redis** is used to cache JWT refresh tokens, enhancing token management.
- Tokens have a defined TTL (Time-to-Live) and are deleted upon logout or expiration.

## Rate Limiting
Implemented using **NestJS Throttler** to prevent DDoS attacks, restricting the number of requests within a specific timeframe.

> **Note**: For this test task, the rate limiting is applied globally across the entire application. While this approach ensures broad protection, it is generally recommended to implement rate limiting at more granular levels (e.g., per endpoint or user) in production environments for optimal security and performance. This decision was made to keep the setup simple and within the context of the task requirements.



## API Endpoints
- POST /api/authentication/sign-up: Registers a new user.
- POST /api/authentication/sign-in: Logs in an existing user.
- POST /api/authentication/refresh-tokens: Refreshes access tokens.
- POST /api/authentication/sign-out: Logs out the user and invalidates tokens.
