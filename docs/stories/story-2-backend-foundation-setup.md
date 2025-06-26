# User Story: Backend API Foundation Setup

## Story Title
**As a developer, I want to set up the Express.js backend API with all required middleware, database integration, and Docker configuration so that I can provide RESTful services for the patient management system.**

---

## Story Description
Set up a complete Express.js backend API with TypeScript, configured with all the libraries specified in the tech stack document. This includes middleware setup, PostgreSQL database integration with Drizzle ORM, file upload handling, and proper Docker containerization for the patient management system.

---

## Objectives

### [✅] Objective 1. Initialize Express.js Project with TypeScript
**Sub-tasks:**
- [✅] Create new Express.js project in `./api` folder
- [✅] Initialize TypeScript configuration with `tsconfig.json`
- [✅] Set up proper folder structure with `./api/src` for source code
- [✅] Install Express.js and @types/express
- [✅] Create basic Express server with TypeScript
- [✅] Configure package.json with development scripts (dev, build, start)
- [✅] Ensure TypeScript compilation works with `npm run build`

### [✅] Objective 2. Configure Essential Middleware
**Sub-tasks:**
- [✅] Install and configure CORS middleware for cross-origin requests
- [✅] Install and configure Body-Parser for request parsing
- [✅] Install and configure Helmet for security headers
- [✅] Install and configure Morgan for request logging (tiny format)
- [✅] Set up middleware chain in proper order
- [✅] Test middleware functionality with basic routes

### [✅] Objective 3. Set Up File Upload Handling
**Sub-tasks:**
- [✅] Install Multer middleware for file uploads
- [✅] Configure Multer with disk storage engine
- [✅] Set destination folder as `./PROJECT_ROOT/api/uploads`
- [✅] Configure file size limit to 5MB (matching PRD requirements)
- [✅] Set up file type validation for images only
- [✅] Implement secure filename strategy with crypto hash:
```javascript
filename: (request, file, callback) => {
  const fileHash = crypto.randomBytes(16).toString('hex');
  const fileName = `${fileHash}-${file.originalname}`;
  return callback(null, fileName);
}
```
- [✅] Create uploads directory structure
- [✅] Test file upload functionality

### [ ] Objective 4. Configure Request Validation
**Sub-tasks:**
- [ ] Install TypeBox for schema definition
- [ ] Install AJV for JSON schema validation
- [ ] Create validation middleware using TypeBox + AJV
- [ ] Define patient data validation schemas
- [ ] Implement validation error handling
- [ ] Test validation with sample requests

### [ ] Objective 5. Configure Environment Variables
**Sub-tasks:**
- [ ] Create `.env` file in `./api` folder
- [ ] Define database credentials and connection strings
- [ ] Set up API port and other configuration variables
- [ ] Install dotenv for environment variable loading
- [ ] Create `.env.example` template file
- [ ] Configure TypeScript types for environment variables

### [ ] Objective 6. Set Up PostgreSQL Database Container
**Sub-tasks:**
- [ ] Configure PostgreSQL service in docker-compose.yml
- [ ] Set up database initialization scripts
- [ ] Configure database volumes for data persistence
- [ ] Set database credentials via environment variables from .env
- [ ] Test database container starts successfully
- [ ] Verify database accessibility from host

### [ ] Objective 7. Set Up Database Integration
**Sub-tasks:**
- [ ] Install Drizzle ORM and PostgreSQL driver
- [ ] Create database connection configuration using .env variables
- [ ] Define patient table schema using Drizzle
- [ ] Set up database migration system
- [ ] Create database utility functions
- [ ] Test database connection and basic operations

### [ ] Objective 8. Create Basic API Routes
**Sub-tasks:**
- [ ] Create GET `/status` endpoint returning `{ status: "ok" }`
- [ ] Set up route structure and organization
- [ ] Create patient routes placeholder (GET, POST)
- [ ] Implement proper error handling middleware
- [ ] Add request/response logging
- [ ] Test all endpoints manually

### [ ] Objective 9. Configure Docker Environment
**Sub-tasks:**
- [ ] Create Dockerfile using node:22-alpine base image
- [ ] Configure volume mounting for `./src` folder hot reload
- [ ] Set up environment variables in Docker
- [ ] Configure proper working directory and file copying
- [ ] Test Docker container builds successfully
- [ ] Ensure hot reload works in development mode

### [ ] Objective 10. Configure Docker Compose Integration
**Sub-tasks:**
- [ ] Add API service to docker-compose.yml
- [ ] Configure proper dependency chain (FRONT → API → DB)
- [ ] Set up networks for inter-container communication
- [ ] Configure volume mounting for development
- [ ] Test complete stack with `docker compose up`
- [ ] Verify external API accessibility

---

## Acceptance Criteria

### ✅ Core API Setup
1. **Express.js with TypeScript** is properly installed and configured
2. **Folder structure** follows specification: `./api/src/` for source code
3. **TypeScript compilation** passes without errors
4. **All specified middleware** is installed and configured:
   - CORS for cross-origin requests
   - Body-Parser for request parsing
   - Helmet for security headers
   - Morgan for logging (tiny format)
   - Multer for file uploads

### ✅ File Upload Configuration
5. **Multer disk storage** is configured with destination `./PROJECT_ROOT/api/uploads`
6. **File size limit** is set to 5MB maximum
7. **Image file validation** only allows image file types
8. **Upload directory** is created and accessible

### ✅ Request Validation
9. **TypeBox schemas** are defined for patient data validation
10. **AJV validation** is integrated with request middleware
11. **Validation errors** are properly handled and returned
12. **Patient data schema** matches PRD requirements (name, email, phone, image)

### ✅ Database Integration
13. **Drizzle ORM** is properly configured with PostgreSQL
14. **Patient table schema** is defined and matches PRD requirements
15. **Database connection** is established and tested
16. **Migration system** is set up for schema changes

### ✅ Environment Configuration
17. **Environment variables** are stored in `./api/.env` file
18. **Database credentials** are properly configured in .env
19. **Sensitive data** is not hardcoded in source files
20. **Environment variables** are loaded in Docker container

### ✅ API Endpoints
21. **GET /status endpoint** returns status 200 with `{ status: "ok" }`
22. **Route structure** is organized and maintainable
23. **Error handling** is implemented for all routes
24. **Patient routes** structure is prepared (even if not fully implemented)

### ✅ Docker Configuration
25. **API Docker container** builds successfully using node:22-alpine
26. **Volume mounting** enables hot reload for `./src` folder changes
27. **API is accessible** from outside the container
28. **Environment variables** are properly passed to container

### ✅ Database Container
29. **PostgreSQL container** runs successfully
30. **Database persistence** works with proper volume mounting
31. **Database initialization** scripts run correctly
32. **API can connect** to database container

### ✅ Docker Compose Integration
33. **Full stack runs** with single `docker compose up` command
34. **Dependency chain** works correctly (FRONT → API → DB)
35. **Inter-container communication** is properly configured
36. **Development workflow** supports code changes and hot reload

### ✅ Security & Best Practices
37. **Helmet security headers** are applied
38. **CORS configuration** allows frontend communication
39. **Request logging** captures essential information
40. **Error responses** don't expose sensitive information

---

## Definition of Done
- [ ] All objectives are completed and checked off
- [ ] All acceptance criteria are met
- [ ] API builds successfully with `npm run build`
- [ ] Docker containers run without errors with `docker compose up`
- [ ] GET `/status` endpoint returns correct response
- [ ] Code passes all TypeScript compilation
- [ ] File upload functionality works correctly
- [ ] Database connection is established and tested
- [ ] Hot reload works in development environment
- [ ] API is accessible from external requests
- [ ] Documentation is complete in README

---

## Dependencies
- Node.js 22 runtime environment
- Docker and Docker Compose
- PostgreSQL database
- Frontend application (for CORS configuration)
- Understanding of patient data requirements from PRD
- Basic knowledge of Express.js middleware patterns