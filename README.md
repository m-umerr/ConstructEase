# Edifice Operations Suite - Full Stack (Spring Boot + React)

A construction project management system with a Spring Boot backend and React/TypeScript frontend.

## Project Structure

This is a full-stack application with:

- **Backend**: Spring Boot with JPA, Spring Security, and JWT authentication
- **Frontend**: React with TypeScript, Vite, and shadcn/ui components

## Prerequisites

- Java 17 or higher (for local development)
- Node.js 18 or higher (for local development)
- Bun package manager (for local development)
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (installed locally or via Docker)

## Running the Application

### Method 1: Using Docker Compose (Recommended)

The easiest way to run the entire application is using Docker Compose:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

This will start:
- PostgreSQL database at http://localhost:5432
- Spring Boot backend at http://localhost:8080/api
- React frontend at http://localhost:80

To stop all services:
```bash
docker-compose down
```

### Method 2: Local Development

#### 1. Start PostgreSQL Database

```bash
docker-compose up -d postgres
```

This will start a PostgreSQL database with the following configuration:
- Host: localhost
- Port: 5432
- Database: edifice
- Username: postgres
- Password: postgres

#### 2. Start Backend

Navigate to the backend directory and run the Spring Boot application:

```bash
cd backend
./mvnw spring-boot:run
```

If you're on Windows:
```bash
cd backend
mvnw.cmd spring-boot:run
```

The backend API will be available at http://localhost:8080/api.

#### 3. Start Frontend

In a new terminal, navigate to the frontend directory and start the development server:

```bash
cd frontend
bun install
bun run dev
```

The frontend will be available at http://localhost:5173.

## Authentication

The application supports two authentication methods:

1. **Legacy Supabase Auth**: Uses Supabase authentication (being phased out)
2. **Spring Boot Auth**: JWT-based authentication with the Spring Boot backend

### Default Users

The backend is seeded with the following users:

- Admin:
  - Username: `admin`
  - Password: `admin123`
  - Role: ADMIN

- Project Manager:
  - Username: `manager`
  - Password: `manager123`
  - Role: PROJECT_MANAGER

- Engineer:
  - Username: `engineer`
  - Password: `engineer123`
  - Role: ENGINEER

## Database Configuration

The application is configured to use PostgreSQL by default. Configuration options are in:
- `backend/src/main/resources/application.properties`

The database schema is created using:
- `backend/src/main/resources/schema-postgres.sql`

Sample data is loaded from:
- `backend/src/main/resources/data-postgres.sql`

## Development

### Backend Development

- Models are in `backend/src/main/java/com/edifice/api/model`
- Controllers are in `backend/src/main/java/com/edifice/api/controller`
- Services are in `backend/src/main/java/com/edifice/api/service`
- Repositories are in `backend/src/main/java/com/edifice/api/repository`

### Frontend Development

- API services are in `frontend/src/services/api.ts`
- Auth context is in `frontend/src/contexts/AuthContext.tsx`
- Components are in `frontend/src/components`
- Pages are in `frontend/src/pages`

## Building for Production

### Backend

```bash
cd backend
./mvnw clean package
```

This will create a JAR file in the `target` directory.

### Frontend

```bash
cd frontend
bun run build
```

This will create a production build in the `dist` directory.

## Troubleshooting

### Docker Compose Issues

If you encounter issues with Docker Compose:

1. Check container status: `docker-compose ps`
2. View logs: `docker-compose logs -f [service_name]`
3. Restart services: `docker-compose restart [service_name]`
4. Rebuild services: `docker-compose up -d --build [service_name]`

### Database Connection Issues

If you encounter issues connecting to PostgreSQL:

1. Verify PostgreSQL is running: `docker ps` should show the edifice-postgres container running
2. Check database logs: `docker logs edifice-postgres`
3. Ensure application.properties has the correct connection details

### CORS Issues

If you encounter CORS issues:

1. Verify that the frontend URL is correctly listed in the backend's CORS configuration
2. Check that requests include the correct headers
3. Ensure you're using the correct endpoint URLs in the frontend

### Authentication Issues

If authentication fails:

1. Check that you're using the correct authentication method (toggle in the Auth page)
2. Verify your credentials against the default users
3. Check the backend logs for any authentication-related errors

## Customizing the Application

### Changing Database Configuration

To use a different database configuration, update the following files:
- `backend/src/main/resources/application.properties` (for local development)
- `docker-compose.yml` (for Docker deployment)

### Adding Custom Themes

The frontend uses Tailwind CSS for styling. You can modify the theme in:
```
frontend/tailwind.config.ts
```
