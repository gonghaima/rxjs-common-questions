# rxjs-common-questions

a breakdown of common interview questions for Angular developers around RxJS, grouped by topic:

🔹 Basics & Core Concepts

What is RxJS and why is it used in Angular?

Reactive programming library.

Angular uses it heavily in HttpClient, Forms, EventEmitter, etc.

What is the difference between Observables, Promises, and Subjects?

Lazy vs eager, cancellable vs not, multiple vs single emissions.

What are cold vs hot observables?

Cold: each subscriber gets a new stream.

Hot: subscribers share the same execution.

Explain the difference between Observable and Subject.

Observable is unicast (independent execution per subscriber).

Subject is multicast (one execution, multiple subscribers).

🔹 Operators

Difference between map, switchMap, mergeMap, concatMap, and exhaustMap?

One of the most common interview questions.

Often asked with real-life examples (API calls, user typing, button clicks).

What’s the difference between tap and map?

tap: side effects, does not change the data.

map: transforms the stream.

What’s the difference between take, takeUntil, and first?

Limiting emissions and unsubscribing.

When would you use debounceTime vs throttleTime?

debounceTime: wait until events stop.

throttleTime: take the first, ignore rest for a time window.

🔹 Subscription Management

How do you avoid memory leaks with RxJS in Angular?

Use async pipe in templates.

Use takeUntil, Subscription.unsubscribe(), or AutoUnsubscribe.

What happens if you don’t unsubscribe from an Observable?

Memory leaks, multiple unintended executions.

🔹 Error Handling

How do you handle errors in RxJS?

catchError, retry, retryWhen.

What is the difference between throwError and catchError?

throwError: create observable that errors immediately.

catchError: handle or recover from an error.

🔹 Advanced Topics

Explain backpressure in RxJS.

Handling fast data sources that produce faster than you can consume.

What is the difference between shareReplay and share?

shareReplay: replays previous emissions to new subscribers (cache).

share: does not cache.

What is a higher-order observable?

Observable that emits Observables (like in switchMap).

What are Schedulers in RxJS?

Control concurrency and execution context (asyncScheduler, queueScheduler).

🔹 Angular Integration

How does Angular use RxJS in HttpClient?

Every HTTP request returns an Observable.

Composable with operators like map, catchError.

How do you handle multiple HTTP requests in parallel or sequence?

forkJoin, combineLatest, concat, merge.

How would you implement search-as-you-type in Angular?

fromEvent → debounceTime → distinctUntilChanged → switchMap.

How would you handle route params or form control value changes using RxJS?

this.route.params.subscribe(...)

formControl.valueChanges.pipe(...)

✅ Pro tip for interviews:
If they ask you about operators (switchMap, mergeMap, etc.), always explain with a real-life Angular example, e.g.:

switchMap → cancel previous search request when typing.

mergeMap → handle multiple background save requests in parallel.

concatMap → queue form submissions in order.

exhaustMap → ignore clicks until current login request completes.