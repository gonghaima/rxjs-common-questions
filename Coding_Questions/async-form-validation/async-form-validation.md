# RxJS Coding Question: Async Form Validation

## Problem Statement

You are building a user registration form that requires real-time validation of username and email fields. Both fields need to be validated asynchronously against a backend API, but you want to minimize API calls and provide immediate feedback to users.

Implement an RxJS solution that:
1. Validates username availability (debounced to avoid excessive API calls)
2. Validates email format and uniqueness (also debounced)
3. Combines both validation results to determine overall form validity
4. Handles validation errors gracefully
5. Shows loading states during validation

## Requirements

- Debounce input changes by 300ms before triggering validation
- Skip validation for empty values
- Cancel previous validation requests when new input arrives
- Combine both validation results to determine form validity
- Handle API errors without breaking the validation flow
- Provide loading indicators during async validation

## Expected Behavior

- User types "john" → API call after 300ms pause → "Username taken" 
- User types "jane" → API call after 300ms pause → "Username available"
- User types "test@email.com" → API call after 300ms pause → "Email already exists"
- Form is valid only when both username and email are valid
- Loading states are shown during validation

## API Functions Provided

```typescript
validateUsername(username: string): Observable<{valid: boolean, message: string}>
validateEmail(email: string): Observable<{valid: boolean, message: string}>
```

---

**Bonus:** How would you extend this to support field-level validation rules (e.g., minimum length) before async validation?