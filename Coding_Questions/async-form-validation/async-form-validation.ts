import { Observable, combineLatest, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, startWith } from 'rxjs/operators';

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface FormValidationState {
  usernameValid: boolean;
  emailValid: boolean;
  usernameMessage: string;
  emailMessage: string;
  usernameLoading: boolean;
  emailLoading: boolean;
  formValid: boolean;
}

// Simulated API validation functions
export function validateUsername(username: string): Observable<ValidationResult> {
  return new Observable(observer => {
    setTimeout(() => {
      if (username === 'error') {
        observer.error('Username validation failed');
      } else if (username === 'john' || username === 'admin') {
        observer.next({ valid: false, message: 'Username taken' });
      } else {
        observer.next({ valid: true, message: 'Username available' });
      }
      observer.complete();
    }, 200);
  });
}

export function validateEmail(email: string): Observable<ValidationResult> {
  return new Observable(observer => {
    setTimeout(() => {
      if (email === 'error@test.com') {
        observer.error('Email validation failed');
      } else if (email === 'test@email.com' || email === 'admin@test.com') {
        observer.next({ valid: false, message: 'Email already exists' });
      } else if (!email.includes('@')) {
        observer.next({ valid: false, message: 'Invalid email format' });
      } else {
        observer.next({ valid: true, message: 'Email available' });
      }
      observer.complete();
    }, 150);
  });
}

// Main validation function
export function validateForm(
  username$: Observable<string>,
  email$: Observable<string>
): Observable<FormValidationState> {
  
  const usernameValidation$ = username$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(username => {
      if (!username.trim()) {
        return [{ valid: false, message: '', loading: false }];
      }
      
      return validateUsername(username).pipe(
        map(result => ({ ...result, loading: false })),
        startWith({ valid: false, message: '', loading: true }),
        catchError(() => [{ valid: false, message: 'Validation error', loading: false }])
      );
    }),
    startWith({ valid: false, message: '', loading: false })
  );

  const emailValidation$ = email$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(email => {
      if (!email.trim()) {
        return [{ valid: false, message: '', loading: false }];
      }
      
      return validateEmail(email).pipe(
        map(result => ({ ...result, loading: false })),
        startWith({ valid: false, message: '', loading: true }),
        catchError(() => [{ valid: false, message: 'Validation error', loading: false }])
      );
    }),
    startWith({ valid: false, message: '', loading: false })
  );

  return combineLatest([usernameValidation$, emailValidation$]).pipe(
    map(([usernameResult, emailResult]) => ({
      usernameValid: usernameResult.valid,
      emailValid: emailResult.valid,
      usernameMessage: usernameResult.message,
      emailMessage: emailResult.message,
      usernameLoading: usernameResult.loading,
      emailLoading: emailResult.loading,
      formValid: usernameResult.valid && emailResult.valid
    }))
  );
}