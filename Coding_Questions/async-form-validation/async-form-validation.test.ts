import { validateForm, validateUsername, validateEmail } from './async-form-validation';
import { Subject } from 'rxjs';

describe('Async Form Validation', () => {
  let username$: Subject<string>;
  let email$: Subject<string>;

  beforeEach(() => {
    username$ = new Subject<string>();
    email$ = new Subject<string>();
  });

  describe('validateUsername', () => {
    it('should return valid for available username', (done) => {
      validateUsername('jane').subscribe({
        next: (result) => {
          expect(result.valid).toBe(true);
          expect(result.message).toBe('Username available');
          done();
        }
      });
    });

    it('should return invalid for taken username', (done) => {
      validateUsername('john').subscribe({
        next: (result) => {
          expect(result.valid).toBe(false);
          expect(result.message).toBe('Username taken');
          done();
        }
      });
    });
  });

  describe('validateEmail', () => {
    it('should return valid for available email', (done) => {
      validateEmail('new@test.com').subscribe({
        next: (result) => {
          expect(result.valid).toBe(true);
          expect(result.message).toBe('Email available');
          done();
        }
      });
    });

    it('should return invalid for taken email', (done) => {
      validateEmail('test@email.com').subscribe({
        next: (result) => {
          expect(result.valid).toBe(false);
          expect(result.message).toBe('Email already exists');
          done();
        }
      });
    });
  });

  describe('validateForm', () => {
    it('should show loading states during validation', (done) => {
      const states: any[] = [];
      
      validateForm(username$, email$).subscribe({
        next: (state) => {
          states.push(state);
          if (state.usernameLoading) {
            expect(state.usernameLoading).toBe(true);
            done();
          }
        }
      });

      username$.next('jane');
    });

    it('should debounce rapid input changes', (done) => {
      const states: any[] = [];
      
      validateForm(username$, email$).subscribe({
        next: (state) => states.push(state)
      });

      username$.next('j');
      username$.next('ja');
      username$.next('jane');
      
      setTimeout(() => {
        const validationStates = states.filter(s => s.usernameMessage);
        expect(validationStates.length).toBeLessThanOrEqual(1);
        done();
      }, 600);
    });

    it('should combine validation results correctly', (done) => {
      validateForm(username$, email$).subscribe({
        next: (state) => {
          if (state.usernameValid && state.emailValid) {
            expect(state.formValid).toBe(true);
            done();
          }
        }
      });

      username$.next('jane');
      email$.next('new@test.com');
    });

    it('should handle validation errors gracefully', (done) => {
      validateForm(username$, email$).subscribe({
        next: (state) => {
          if (state.usernameMessage === 'Validation error') {
            expect(state.usernameValid).toBe(false);
            done();
          }
        }
      });

      username$.next('error');
    });

    it('should not validate empty inputs', (done) => {
      const states: any[] = [];
      
      validateForm(username$, email$).subscribe({
        next: (state) => states.push(state)
      });

      username$.next('');
      email$.next('');
      
      setTimeout(() => {
        const loadingStates = states.filter(s => s.usernameLoading || s.emailLoading);
        expect(loadingStates.length).toBe(0);
        done();
      }, 400);
    });
  });
});