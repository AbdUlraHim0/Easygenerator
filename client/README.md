# Easygenerator Full Stack Test Task

## Prerequisites

Ensure you have the following installed:

- **Docker**
- **Docker Compose**

## Setup Instructions

### 1. Clone the Repository

Choose one of the following methods:

- **SSH:**  
  `git clone git@github.com:AbdulRahim0/Easygenerator.git`

- **HTTPS:**  
  `git clone https://github.com/AbdulRahim0/Easygenerator.git`

### 2. Build and Run the Containers

From the root directory, run:

```bash
docker-compose up --build

# EasyGenerators Frontend Documentation

## Overview
The frontend for the EasyGenerators project is built using **React**, with **Vite** as the build tool for faster development. It uses **Tailwind CSS** for styling, providing a clean and modern user interface. The frontend handles authentication, navigation, and private route protection, interacting with the backend through secure APIs.

## Overview

- **React:**
  Core framework for building the user interface.

- **@tanstack/react-router:**
  Manages client-side routing with support for nested routes, lazy loading, and route guards.

- **TanStack React Query:**
  Handles asynchronous data fetching and caching.

- **Zustand:**
  State management solution for managing global state.

- **Tailwind CSS:**
  Utility-first CSS framework for building consistent and responsive UI.

- **Zod & TanStack Form:**
  Zod is used for schema validation, integrated with TanStack Form for form management.

- **Axios:**
  Handles API requests with token-based authentication.

## Features Implemented

1. **Private Routes**
   Implemented with `@tanstack/react-router`, allowing only authenticated users to access certain routes like the dashboard.
   Redirects users to the login page if authentication fails.

2. **NotFound Page**
   Provides a user-friendly 404 page for undefined routes using a dedicated `NotFound` component.
   Implemented globally at the root route level to handle undefined URLs.

3. **JWT Authentication**
   Integrated with access and refresh tokens, where access tokens are used for authentication and refresh tokens for renewing access.
   Tokens are stored in `localStorage` and managed using the Zustand store.

4. **Form Handling and Validation**
   Forms are created using `TanStack Form` and validated with `Zod`.
   Sign-in and sign-up forms have client-side validation to prevent incorrect data submission.

5. **Axios Configuration**
   `Axios` instance is configured to include authorization headers for secure API requests.
   Automatically refreshes access tokens using the refresh token when the access token expires.

6. **State Management**
   `Zustand` is used to manage the global state, particularly for authentication status and user data.



## Authentication Flow

1. **Sign Up**
   Users can register through the sign-up page, creating a new account in the backend.

2. **Sign In**
   Users log in with their credentials, receiving access and refresh tokens stored in `localStorage`.

3. **Sign Out**
   Logs out users by clearing tokens from `localStorage` and redirecting to the home page.

4. **Token Refresh**
   Refresh tokens are used to obtain new access tokens when the access token expires.

## Routing Structure

- The routing is managed using `@tanstack/react-router`.
- Public pages include home, sign-in, and sign-up, while private pages include the dashboard.
- Routes are defined under the `src/routes` folder, with separate files for each route.
```
