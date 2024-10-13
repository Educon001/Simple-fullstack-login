# API Service

This directory contains the API service for the project. The API is built using Fastapi and requires several dependencies to run.

## Prerequisites

- Python 3.x
- pip (Python package installer)
- Docker (optional, for containerized deployment)

## Setup

### Local Development

1. **Create a virtual environment:**

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2**Install dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

3**Set up environment variables:**

   Copy the `example.env` file to `.env` in the `api` directory and replace the placeholder values with your own:

    ```sh
    cp example.env .env
   # Use openssl rand -hex 32 to generate a secret key
    ```

4**Run the application:**

    ```sh
    uvicorn main:app --reload
    ```

   The API will be available at `http://localhost:8000`.
   Docs will be available at `http://localhost:8000/docs`.
