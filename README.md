# Where is My Bird?! - Backend

This repository contains the backend code for the "Where is My Bird?!" project. This README provides an overview of the project, including its purpose, structure, and development guidelines.

## Trello Board

You can track the progress of the project and view the tasks on our Trello board [here](https://trello.com/b/jfamD4u0/where-is-my-bird).

## GitHub Repository

The frontend repository for this project is available on GitHub: [birdfrontend](https://github.com/hannakayes/birdfrontend).

## Description

"Where is My Bird?!" is a web-based application designed to provide bird enthusiasts with detailed information about birds that inhabit Europe and the Western Palearctic. This backend API supports the frontend application by providing endpoints to manage bird data, user data, and regional information.

## Features

1. **Bird Management**: API endpoints to create, read, update, and delete bird entries.
2. **User Management**: API endpoints for user registration, login, and managing favorite birds.
3. **Region Management**: API endpoints to retrieve information about regions and the birds found in them.
4. **Image and Sound Upload**: Functionality to upload bird images and sounds via URL.

## Data Structure

### Models

1. **Bird**: Represents a bird in the database.
   - `id`: Unique identifier.
   - `name`: Name of the bird.
   - `habitat`: Habitat of the bird.
   - `description`: Description of the bird.
   - `image_url`: URL of the bird's image.
   - `sound_url`: URL of the bird's sound.
2. **User**: Represents a user in the system.
   - `id`: Unique identifier.
   - `username`: Username of the user.
   - `email`: Email address of the user.
   - `password`: Hashed password of the user.
   - `favorites`: List of favorite birds (references Bird).
3. **Region**: Represents a geographic region.
   - `id`: Unique identifier.
   - `name`: Name of the region.
   - `birds`: List of birds found in this region (references Bird).

### API Endpoints

1. **GET /birds**: Retrieves a list of all birds.
2. **GET /birds/:id**: Retrieves details of a specific bird.
3. **POST /birds**: Adds a new bird to the database.
4. **PUT /birds/:id**: Updates a specific bird in the database.
5. **DELETE /birds/:id**: Deletes a specific bird from the database.
6. **GET /regions**: Retrieves a list of all regions.
7. **GET /regions/:id**: Retrieves birds found in a specific region.
8. **POST /users/register**: Registers a new user.
9. **POST /users/login**: Logs in a user and returns an authentication token.
10. **POST /users/:id/favorites**: Adds a bird to the user's favorites.
11. **DELETE /users/:id/favorites/:bird_id**: Removes a bird from the user's favorites.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hannakayes/birdbackend.git
   cd birdbackend
   ```
