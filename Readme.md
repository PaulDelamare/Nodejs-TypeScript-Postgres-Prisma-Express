# Node.js Express TypeScript Prisma Postgres

## Description

This project is a boilerplate for creating and configuring a Node.js API using Express, Prisma, and PostgreSQL in TypeScript. The goal is to provide a ready-to-use structure so that developers don't have to start from scratch for each new project. With this setup, you only need to define your routes, controllers, and services to get your API running.

Each developer must configure their database connection details, but this project provides a strong foundation, including basic API security measures.

## Features

- **Express.js** for server setup
- **Prisma** as the ORM to interact with PostgreSQL
- **PostgreSQL** as the database
- **TypeScript**

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (Latest LTS version recommended)

- npm or yarn (for package management)

- PostgreSQL (Ensure the database is set up and running)

## Getting the Project

To clone and set up the project, run:

```bash
git clone https://github.com/PaulDelamare/Nodejs-TypeScript-Postgres-Prisma-Express.git
cd Nodejs-TypeScript-Postgres-Prisma-Express
npm install
```

## Remove Git History

Following this you will have to delete the .git which was created during the clone, this will allow you to have your own project and create a new repository for your project

## Project Structure

```
config/
logs/
node_modules/
src/
  ├── Controllers/
  ├── Routes/
  ├── Services/
  ├── Middlewares/
  ├── Utils/
  ├── app.ts
  ├── server.ts
```

## Setting Up Prisma Models

1. Create a new Prisma schema file inside the `schema/` directory, e.g., `schema/example.prisma`.
2. Define your models using Prisma's syntax, for example:
   ```prisma
   model User {
     id    Int     @id @default(autoincrement())
     name  String
     email String  @unique
   }
   ```

## Notes

As a junior developer, this setup may not be fully optimized compared to a more experienced developer's approach. However, it provides a solid starting point for API development, following best practices and ensuring a maintainable structure.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run the following command to apply your models to the database
```bash
  npm run migrate:init
```

### Start the Development Server

```bash
npm run dev
```

### Run in Production

```bash
npm start
```

## Environment Variables

Create a `.env` file at the root and configure your database connection. You can use `.env.example` as a reference for the required information

## Contributions

If you have suggestions for improving the project, feel free to fork the repository and submit a pull request!
