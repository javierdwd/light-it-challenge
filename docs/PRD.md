# Product Requirements Document (PRD)

---

## Overview
The purpose of this product is to provide a simple patient management system for a health clinic. The application allows clinic administrators to manage patient records by creating, viewing, updating, and deleting basic patient information. The system includes a web-based frontend and a backend RESTful API that stores data in a PostgreSQL database.

---

## Goals and Objectives
- Enable administrators to register and store patient data in a structured database.
- Allow secure storage of patient information, including an uploaded image file.
- Provide CRUD (Create, Read, Update, Delete) operations on patient records (Edit and Delete as optional features).

---

## Scope

### Included in Initial Release:
- Web-based frontend for clinic administrators.
- Backend RESTful API for handling patient data.
- Data storage in PostgreSQL database.
- Features:
  - View list of patients.
  - Add new patients.
- Image upload and storage (up to 5MB, stored locally).
- Validation of form fields (on both frontend and backend).

### Optional / Nice to Have (Not Required in Initial Release):
- Edit patient records.
- Delete patient records.
- Upload images to AWS S3.
- Authentication for administrator users.

### Out of Scope:
- Public access or patient-side functionality.
- Mobile application.

---

## User Personas / Target Audience

| Persona               | Description                                                |
|----------------------|------------------------------------------------------------|
| Clinic Administrator | Responsible for manually entering and managing patient data |

---

## Functional Requirements

### Must-Have Features (Initial Release):
1. **Patient List View**
   - Display all registered patients.
   
2. **Add New Patient**
   - Input fields:
     - Name (string)
     - Email (string)
     - Phone Number (string)
     - Image file (up to 5MB)
   - Form validations:
     - All fields required.
     - Valid email format.
     - Valid phone number format.
     - Image file size limit (5MB).

3. **Image Upload Handling**
   - Accept image files and store them locally (initial implementation).

4. **Data Persistence**
   - RESTful API to send and store data in a PostgreSQL database.

5. **Validation**
   - Data validation implemented on both frontend and backend.

### Optional Features (Future Releases / Nice-to-Have):
1. Edit existing patient records.
2. Delete patient records.
3. Store image files in AWS S3.
4. Administrator login and authentication.

---

## Non-Functional Requirements
- The entire solution must run in Docker containers:
  - One container for the frontend.
  - One container for the backend API.
  - One container for the PostgreSQL database.
- Image file size limit: 5MB.
- RESTful API accessible via HTTP requests.
- Form data validation must be enforced both client-side and server-side.

---

## User Journeys

### Primary User Journey: Adding a New Patient
1. Administrator logs into the application (if authentication is implemented).
2. Administrator clicks “Add New Patient”.
3. Fills in Name, Email, Phone Number.
4. Uploads an image (max 5MB).
5. Submits the form.
6. The system validates the data (both frontend & backend).
7. On success, the patient is saved and displayed in the list.

### Primary User Journey: Viewing Patients
1. Administrator accesses the application.
2. Views the full list of registered patients.

### Optional Journeys
- Edit patient.
- Delete patient.
- Image storage in S3.
- Admin authentication/login.
- Add pagination for patience profiles.

---

## Success Metrics
- 100% of patient records must be stored and retrievable.
- All form validation rules must be enforced.
- Image uploads must respect the 5MB limit.
- Docker containers must run independently without failure.

---

## Open Questions / Assumptions
- No production-level scalability required.
- Authentication and S3 storage are considered optional for this challenge.
- No need for multi-user or concurrent access handling.

---

## Notes
- Technology-specific libraries and tools will be detailed in a separate `tech-stack.md` document.
