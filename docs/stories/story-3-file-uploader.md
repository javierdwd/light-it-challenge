# User Story: FileUploader Component Implementation

## Story Title
**As a developer, I want to create a reusable FileUploader component with drag-and-drop functionality and image preview so that clinic administrators can easily upload patient images with a user-friendly interface.**

---

## Story Description
Create a comprehensive FileUploader component that supports both click-to-upload and drag-and-drop functionality. The component should validate file types, display image previews using base64 encoding, and integrate seamlessly with React Hook Form. This component will be used in the PatientForm to handle patient image uploads as specified in the PRD requirements.

---

## Objectives

### [ ] Objective 1. Create Component File Structure
**Sub-tasks:**
- [ ] Create `frontend/src/components/FileUploader/` directory
- [ ] Create `FileUploader.tsx` main component file
- [ ] Create `index.ts` export file
- [ ] Create `styles.ts` for styled-components definitions
- [ ] Set up proper TypeScript interfaces for component props
- [ ] Create component barrel export structure

### [ ] Objective 2. Implement Core Component Props Interface
**Sub-tasks:**
- [ ] Define TypeScript interface for FileUploader props:
  - `name: string` - field name for form integration
  - `onChange: (file: File | null) => void` - callback function
  - `acceptedTypes: string[]` - array of accepted MIME types
  - `maxSize?: number` - optional file size limit (default 5MB)
  - `value?: File | null` - current file value for controlled component
  - `error?: string` - validation error message
  - `disabled?: boolean` - disable upload functionality
- [ ] Set up proper TypeScript types for component state
- [ ] Define internal state interface for file handling

### [ ] Objective 3. Implement Click-to-Upload Functionality
**Sub-tasks:**
- [ ] Create hidden file input element with proper attributes
- [ ] Implement click handler to trigger file dialog
- [ ] Add file selection validation (type and size)
- [ ] Handle file selection and trigger onChange callback
- [ ] Add proper error handling for invalid files
- [ ] Implement file input reset functionality
- [ ] Add accessibility attributes for screen readers

### [ ] Objective 4. Implement Drag-and-Drop Functionality
**Sub-tasks:**
- [ ] Add drag event handlers (onDragEnter, onDragOver, onDragLeave, onDrop)
- [ ] Implement visual feedback for drag states (hover, active)
- [ ] Prevent default browser drag behaviors
- [ ] Handle multiple files (use first file, ignore others)
- [ ] Validate dropped files (type and size)
- [ ] Add proper error handling for drag-drop operations
- [ ] Implement drag counter for nested drag events

### [ ] Objective 5. Create Image Preview with Base64 Encoding
**Sub-tasks:**
- [ ] Implement FileReader API for base64 conversion
- [ ] Create image preview component with proper styling
- [ ] Handle image loading states and errors
- [ ] Add image dimensions and file size display
- [ ] Implement remove/clear functionality for uploaded images
- [ ] Add loading spinner during file processing
- [ ] Handle non-image files with appropriate placeholders

### [ ] Objective 6. Implement File Validation
**Sub-tasks:**
- [ ] Create file type validation using MIME types
- [ ] Implement file size validation (default 5MB as per PRD)
- [ ] Add custom validation error messages
- [ ] Handle validation errors gracefully
- [ ] Display validation errors to user
- [ ] Implement real-time validation feedback
- [ ] Add support for multiple validation rules

### [ ] Objective 7. Create Styled Components
**Sub-tasks:**
- [ ] Design main upload area with proper styling
- [ ] Create drag-and-drop visual states (normal, hover, active, error)
- [ ] Style image preview container and thumbnail
- [ ] Add responsive design for mobile devices
- [ ] Implement proper spacing and typography
- [ ] Add hover and focus states for accessibility
- [ ] Create loading and error state styles
- [ ] Add animation transitions for smooth UX

### [ ] Objective 8. Integrate with React Hook Form
**Sub-tasks:**
- [ ] Ensure compatibility with React Hook Form Controller
- [ ] Handle form validation integration
- [ ] Implement proper value and onChange patterns
- [ ] Add form reset functionality
- [ ] Handle form submission with file data
- [ ] Add proper error message display from form validation
- [ ] Test integration with existing form validation schemas

### [ ] Objective 9. Add Accessibility Features
**Sub-tasks:**
- [ ] Add proper ARIA labels and descriptions
- [ ] Implement keyboard navigation support
- [ ] Add screen reader announcements for file changes
- [ ] Ensure proper focus management
- [ ] Add high contrast mode support
- [ ] Implement proper color contrast ratios
- [ ] Add error announcements for screen readers

### [ ] Objective 10. Update Validation Schema and Integration
**Sub-tasks:**
- [ ] Extend `patientFormSchema` in `validation.ts` to include image field:
  - Add optional image field with File type validation
  - Implement file size validation (5MB limit as per PRD)
  - Add file type validation for image formats (jpeg, jpg, png, gif, webp)
  - Create proper Zod schema for File validation
- [ ] Import FileUploader in `PatientForm.tsx`
- [ ] Integrate with existing form validation schema
- [ ] Add proper field registration with React Hook Form
- [ ] Configure accepted file types for patient images
- [ ] Set up proper error handling and display
- [ ] Test form submission with uploaded files
- [ ] Ensure proper form reset functionality

---

## Acceptance Criteria

### ✅ Component Architecture
1. **File structure** follows the specified organization:
   ```
   frontend/src/components/FileUploader/
   ├── FileUploader.tsx      # Main component
   ├── index.ts             # Export file
   └── styles.ts            # Styled components
   ```

2. **TypeScript interfaces** are properly defined for all props and state
3. **Component** is exported as default from index.ts
4. **Styled components** are separated in styles.ts file

### ✅ Core Functionality
5. **Click-to-upload** opens native file dialog
6. **Drag-and-drop** accepts files from desktop/file manager
7. **File validation** checks MIME types and file size (5MB limit)
8. **Image preview** displays thumbnail using base64 encoding
9. **Error handling** shows appropriate messages for invalid files
10. **File removal** allows users to clear selected files

### ✅ Props Interface
11. **Required props** are implemented:
    - `name: string` - form field name
    - `onChange: (file: File | null) => void` - callback function
    - `acceptedTypes: string[]` - valid MIME types array
12. **Optional props** are supported:
    - `maxSize?: number` - file size limit
    - `value?: File | null` - controlled component value
    - `error?: string` - validation error message
    - `disabled?: boolean` - disable state

### ✅ User Experience
13. **Visual feedback** for different states (normal, hover, drag-over, error)
14. **Loading states** during file processing
15. **Responsive design** works on mobile and desktop
16. **Accessibility** supports keyboard navigation and screen readers
17. **Smooth animations** for state transitions

### ✅ Integration Requirements
18. **React Hook Form** compatibility with Controller component
19. **Form validation** integrates with existing Zod schemas
20. **PatientForm** successfully uses FileUploader component
21. **File upload** works with patient image requirements from PRD

### ✅ Technical Standards
22. **TypeScript** strict mode compliance with no errors
23. **ESLint** and Prettier rules pass without warnings
24. **Styled components** with proper theming support
25. **Performance** optimized for large file handling
26. **Memory management** proper cleanup of base64 URLs

### ✅ Validation & Error Handling
27. **File type validation** rejects non-image files
28. **File size validation** enforces 5MB limit
29. **Error messages** are user-friendly and informative
30. **Edge cases** handled (empty files, corrupted files, network issues)

---

## Definition of Done
- [ ] All objectives are completed and checked off
- [ ] All acceptance criteria are met
- [ ] Component renders without TypeScript errors
- [ ] All linting and formatting rules pass
- [ ] Component integrates successfully with PatientForm
- [ ] Manual testing confirms all functionality works
- [ ] Accessibility testing passes with screen readers
- [ ] Responsive design tested on multiple screen sizes
- [ ] Component is ready for production use

---

## Dependencies
- React Hook Form setup from previous stories
- Styled Components configuration
- Zod validation schema for patient form (needs extension for image field)
- PatientForm component structure
- Base theme and styling system

---

## Technical Notes
- Use `FileReader` API for base64 conversion
- Implement proper memory cleanup for object URLs
- Consider using `URL.createObjectURL()` for large files if needed
- Ensure proper handling of file input reset for multiple uploads
- Add debouncing for drag events to prevent flickering