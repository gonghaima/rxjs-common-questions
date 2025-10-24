# Common Patterns

- **Search-as-you-type:**
  - Use `fromEvent`, `debounceTime`, `distinctUntilChanged`, and `switchMap` to handle live search efficiently.
  ```typescript
  import { fromEvent } from 'rxjs';
  import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

  fromEvent(searchInput, 'input').pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(event => http.get('/api/search?q=' + event.target.value))
  ).subscribe(results => {
    // Update search results
  });
  ```

- **Route params:**
  - Subscribe to route parameter changes in Angular.
  ```typescript
  this.route.params.subscribe(params => {
    // React to route param changes
    const id = params['id'];
    // Fetch data for id
  });
  ```

- **Form controls:**
  - React to form control value changes using RxJS.
  ```typescript
  this.formControl.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged()
  ).subscribe(value => {
    // Handle value change
  });
  ```
