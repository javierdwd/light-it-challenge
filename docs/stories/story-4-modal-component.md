# User Story: Modal Component Implementation

## Story Title
**As a developer, I want to create a reusable Modal component system with custom hook integration so that I can display overlay content with proper animations and state management throughout the patient management application.**

---

## Story Description
Create a complete Modal component system that includes a main Modal component, ModalHeader, ModalFooter subcomponents, and a custom useModal hook. The Modal should support programmatic opening/closing, smooth animations, and flexible content composition. This modal system will be used across the patient management features for confirmations, forms, and information displays.

---

## Objectives

### ✅ Objective 1. Set Up Modal Foundation and Basic Structure
**Sub-tasks:**
- ✅ Create folder structure: `frontend/src/components/Modal/`
- ✅ Create basic `Modal.tsx` component with forwardRef wrapper
- ✅ Create `styles.ts` with basic styled components (Backdrop, Container)
- ✅ Create `index.ts` file for exports
- ✅ Set up TypeScript interfaces for Modal props and ref methods
- ✅ Create simple Modal that renders children (no state management yet)

### ✅ Objective 2. Implement Basic Modal State (Rendering Control)
**Sub-tasks:**
- ✅ Add `isRendered` state to Modal component
- ✅ Implement early return logic when `isRendered` is false
- ✅ Add basic `open()` method using useImperativeHandle that sets isRendered to true
- ✅ Test that Modal can be opened programmatically
- ✅ Ensure Modal renders its children when opened

### ✅ Objective 3. Add Visibility State and Close Functionality
**Sub-tasks:**
- ✅ Add `isOpen` state for animation control
- ✅ Implement `close()` method that sets isOpen to false, then isRendered to false after delay
- ✅ Add 500ms setTimeout logic for proper unmounting
- ✅ Test opening and closing cycle works correctly
- ✅ Verify state transitions happen in correct order

### ✅ Objective 4. Create useModal Hook with Basic Integration
**Sub-tasks:**
- ✅ Create `useModal.ts` hook file
- ✅ Implement hook with `defaultOpen` parameter and ref creation
- ✅ Add useEffect for defaultOpen behavior
- ✅ Return object with ref and any additional props needed by Modal
- ✅ Test basic integration: `const modal = useModal()` and `<Modal ref={modal.ref} />`
- ✅ Export useModal from index.ts

### ✅ Objective 5. Implement Modal Animations
**Sub-tasks:**
- ✅ Add animation styles to Backdrop (opacity transitions)
- ✅ Add animation styles to Container (scale and opacity transitions)
- ✅ Connect animations to `isOpen` state
- ✅ Set 500ms transition duration matching the close timeout
- ✅ Test smooth enter/exit animations
- ✅ Verify no animation glitches during state changes

### [ ] Objective 6. Build ModalHeader and ModalFooter Components
**Sub-tasks:**
- [ ] Create ModalHeader with title/children conditional logic
- [ ] Style ModalHeader title as styled.h3
- [ ] Create ModalFooter with right-aligned flexbox
- [ ] Add default "Close" button to ModalFooter when no children provided
- [ ] Connect ModalFooter close button to Modal's close method
- [ ] Add TypeScript interfaces for both components
- [ ] Export both components from index.ts

### [ ] Objective 7. Complete Integration Testing and Polish
**Sub-tasks:**
- [ ] Test full Modal system with Header and Footer components
- [ ] Verify all imperative methods work (ref.current.open/close)
- [ ] Test defaultOpen functionality end-to-end
- [ ] Ensure proper TypeScript compilation
- [ ] Test component composition flexibility
- [ ] Create comprehensive usage example
- [ ] Verify all exports work correctly from index.ts

---

## Acceptance Criteria

### ✅ Component Structure Requirements
1. **Folder structure** follows specified pattern:
   ```
   frontend/src/components/Modal/
   ├── Modal.tsx
   ├── ModalHeader.tsx
   ├── ModalFooter.tsx
   ├── useModal.ts
   ├── styles.ts
   └── index.ts
   ```

2. **All components** are properly exported from `index.ts`
3. **TypeScript interfaces** are defined for all component props
4. **Styled Components** are organized in `styles.ts` file

### ✅ Modal Core Functionality
5. **Modal component** is wrapped with `forwardRef`
6. **State management** includes both `isOpen` and `isRendered` states
7. **Early return** prevents rendering when `isRendered` is false
8. **Imperative methods** (open/close) work via ref.current
9. **Timing logic** properly handles 500ms delay for unmounting

### ✅ useModal Hook Integration
10. **useModal hook** accepts `defaultOpen` parameter
11. **useRef** is created and exported by the hook
12. **useEffect** handles defaultOpen behavior correctly
13. **Return object** contains all props needed by Modal component
14. **Integration pattern** `const modal = useModal()` and `<Modal {...modal} />` works

### ✅ Animation Requirements
15. **Enter animation** smoothly transitions opacity (0→1) and scale (0.9→1)
16. **Exit animation** smoothly transitions opacity (1→0) and scale (1→0.9)
17. **Animation duration** is exactly 500ms
18. **Backdrop styling** includes proper opacity transitions
19. **No animation glitches** during state changes

### ✅ ModalHeader Functionality
20. **Title prop** renders as styled.h3 when provided
21. **Children fallback** works when title prop is not provided
22. **Conditional rendering** logic works correctly
23. **TypeScript types** are properly defined

### ✅ ModalFooter Functionality
24. **Flexbox alignment** positions content to the right
25. **Default Close button** appears when no children provided
26. **Close functionality** properly calls modal close method
27. **Custom children** can override default button

### ✅ Integration & Testing
28. **All exports** work correctly from index.ts
29. **TypeScript compilation** passes without errors
30. **Modal opening/closing** works programmatically
31. **Animation timing** aligns with state management
32. **Component composition** allows flexible usage patterns

---

## Definition of Done
- [ ] All objectives are completed and checked off
- [ ] All acceptance criteria are met
- [ ] Modal system works with imperative API (ref.current.open/close)
- [ ] Animations are smooth and properly timed
- [ ] All components are properly typed with TypeScript
- [ ] Integration pattern works as specified
- [ ] Code follows project's styling and linting standards
- [ ] Components are ready for use in patient management features

---

## Dependencies
- Existing Next.js project with Styled Components configured
- TypeScript setup and configuration
- React 18+ for useImperativeHandle and forwardRef support
- Understanding of React ref patterns and imperative APIs

---

## Notes
- Animation duration (500ms) must be consistent between CSS transitions and JavaScript timeouts
- Modal should be accessible (consider focus management in future iterations)
- Component design allows for easy extension with additional modal variants
- Integration pattern provides clean API for developers using the modal system