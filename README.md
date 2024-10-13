# Project Overview

This project consists of two main services: the API service and the frontend service. The API is built using Fastapi, and the frontend is built using React.

## Prerequisites

- Docker
- Docker Compose

## Setup

### Local Development

For detailed setup instructions for each service, refer to their respective `README.md` files:

- [API Service](./api/README.md)
- [Frontend Service](./frontend/README.md)

### Docker Deployment

To run the entire project using Docker, follow these steps:

1. **Build the Docker images:**

    ```sh
    docker-compose build
    ```

2. **Run the Docker containers:**

    ```sh
    docker-compose up
   # Make sure to set up the environment variables in the corresponding .env files
    ```

   The frontend will be available at `http://localhost:3000` and the API will be available at `http://localhost:8000`.
