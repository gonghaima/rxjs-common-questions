# RxJS Common Questions - Mind Map

## 🎯 RxJS Common Questions
```
RxJS Common Questions
├── 📚 Basics & Core Concepts
│   ├── What is RxJS?
│   │   ├── Reactive programming library
│   │   └── Used in Angular (HttpClient, Forms, EventEmitter)
│   ├── Observable vs Promise vs Subject
│   │   ├── Lazy vs eager execution
│   │   ├── Cancellable vs not cancellable
│   │   └── Multiple vs single emissions
│   ├── Cold vs Hot Observables
│   │   ├── Cold: each subscriber gets new stream
│   │   └── Hot: subscribers share same execution
│   └── Observable vs Subject
│       ├── Observable: unicast (independent execution)
│       └── Subject: multicast (one execution, multiple subscribers)
│
├── ⚙️ Operators
│   ├── Mapping Operators
│   │   ├── map: transforms data
│   │   ├── switchMap: cancel previous, switch to new
│   │   ├── mergeMap: handle multiple in parallel
│   │   ├── concatMap: queue in order
│   │   └── exhaustMap: ignore until current completes
│   ├── Side Effects vs Transformation
│   │   ├── tap: side effects, no data change
│   │   └── map: transforms the stream
│   ├── Limiting Emissions
│   │   ├── take: take specific number
│   │   ├── takeUntil: take until condition
│   │   └── first: take first emission
│   └── Timing Operators
│       ├── debounceTime: wait until events stop
│       └── throttleTime: take first, ignore rest in window
│
├── 🔄 Subscription Management
│   ├── Avoiding Memory Leaks
│   │   ├── Use async pipe in templates
│   │   ├── Use takeUntil pattern
│   │   ├── Use Subscription.unsubscribe()
│   │   └── Use AutoUnsubscribe decorator
│   └── Consequences of Not Unsubscribing
│       ├── Memory leaks
│       └── Multiple unintended executions
│
├── ❌ Error Handling
│   ├── Error Operators
│   │   ├── catchError: handle/recover from error
│   │   ├── retry: retry on error
│   │   └── retryWhen: conditional retry
│   └── throwError vs catchError
│       ├── throwError: create observable that errors
│       └── catchError: handle or recover from error
│
├── 🚀 Advanced Topics
│   ├── Backpressure
│   │   ├── Fast data sources
│   │   └── Produce faster than consume
│   ├── Sharing Operators
│   │   ├── shareReplay: cache previous emissions
│   │   └── share: no caching
│   ├── Higher-order Observables
│   │   ├── Observable that emits Observables
│   │   └── Used in switchMap, mergeMap, etc.
│   └── Schedulers
│       ├── Control concurrency
│       └── asyncScheduler, queueScheduler
│
└── 🅰️ Angular Integration
    ├── HttpClient
    │   ├── Every HTTP request returns Observable
    │   └── Composable with operators (map, catchError)
    ├── Multiple HTTP Requests
    │   ├── forkJoin: parallel, wait for all
    │   ├── combineLatest: combine latest values
    │   ├── concat: sequential
    │   └── merge: parallel, emit as they come
    ├── Common Patterns
    │   ├── Search-as-you-type: fromEvent → debounceTime → distinctUntilChanged → switchMap
    │   ├── Route params: this.route.params.subscribe()
    │   └── Form controls: formControl.valueChanges.pipe()
    └── Real-world Examples
        ├── switchMap: cancel previous search
        ├── mergeMap: parallel background saves
        ├── concatMap: queue form submissions
        └── exhaustMap: ignore clicks until login completes
```

## 💡 Interview Pro Tips

### Most Common Questions:
1. **Operator Differences**: map vs switchMap vs mergeMap vs concatMap vs exhaustMap
2. **Memory Management**: How to avoid memory leaks
3. **Cold vs Hot Observables**: Understanding the difference
4. **Error Handling**: catchError, retry patterns

### Key Strategies:
- Always explain with real-life Angular examples
- Focus on practical use cases
- Understand when to use each operator
- Know subscription management patterns

### Quick Reference:
- **switchMap**: Cancel previous (search requests)
- **mergeMap**: Parallel execution (background saves)
- **concatMap**: Sequential order (form submissions)
- **exhaustMap**: Ignore until complete (login buttons)

## 📋 Study Checklist

### Core Concepts ✅
- [ ] Understand Observable vs Promise vs Subject
- [ ] Know the difference between cold and hot observables
- [ ] Explain unicast vs multicast behavior

### Operators Mastery ✅
- [ ] Master the "Big 4" mapping operators (switchMap, mergeMap, concatMap, exhaustMap)
- [ ] Understand timing operators (debounceTime, throttleTime)
- [ ] Know limiting operators (take, takeUntil, first)

### Memory Management ✅
- [ ] Implement proper unsubscription patterns
- [ ] Use async pipe effectively
- [ ] Understand takeUntil pattern

### Error Handling ✅
- [ ] Use catchError for error recovery
- [ ] Implement retry strategies
- [ ] Handle HTTP errors gracefully

### Angular Integration ✅
- [ ] Work with HttpClient observables
- [ ] Handle form value changes
- [ ] Manage route parameter changes
- [ ] Implement search-as-you-type functionality