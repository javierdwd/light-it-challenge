# Patient Management API

Express.js backend API with TypeScript for the patient management system.

## Set up environment variables

```bash
cp api/.env.example api/.env
# Edit api/.env with your configuration
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## API Endpoints

- `GET /api/` - API info
- `GET /api/healthcheck` - Health check
- `GET /api/patients` - List Patients
- `POST /api/patients` - Create Patient

## Features

- ✅ Express.js with TypeScript
- ✅ Environment variable configuration
- ✅ Request validation with TypeBox + AJV
- ✅ File upload handling with Multer
- ✅ CORS configuration
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan
- ✅ ESLint + Prettier code quality
