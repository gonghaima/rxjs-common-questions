# Observable vs Promise vs Subject

**Observable**
- Lazy execution (runs when subscribed)
- Cancellable (unsubscribe to stop)
- Can emit multiple values over time
- *Use case:* Streams of user input, HTTP polling, valueChanges in Angular forms

**Promise**
- Eager execution (runs immediately)
- Not cancellable
- Emits a single value (or error) once
- *Use case:* One-time HTTP requests, loading config at startup

**Subject**
- Like an Observable, but also acts as an Observer
- Multicast: multiple subscribers share the same execution
- Useful for broadcasting values/events to many observers
- *Use case:* Sharing data between components, manual event emitters

**Summary Table:**
| Feature                | Observable         | Promise         | Subject           |
|------------------------|-------------------|-----------------|-------------------|
| Execution              | Lazy              | Eager           | Lazy              |
| Cancellable            | Yes               | No              | Yes               |
| Emissions              | Multiple          | Single          | Multiple          |
| Multicast              | No (by default)   | No              | Yes               |
