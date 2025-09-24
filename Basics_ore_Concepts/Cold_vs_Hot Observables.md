# Cold vs Hot Observables

**Cold Observable**
- Each subscriber gets a new, independent stream
- Data is produced for each subscription
- *Use case:* HTTP requests, valueChanges in Angular forms, interval/timer

**Hot Observable**
- Subscribers share the same execution and data source
- Data is produced regardless of subscriptions
- *Use case:* User events (clicks, mouse moves), WebSocket streams, shared state

**Comparison Table:**
| Feature         | Cold Observable                | Hot Observable                  |
|-----------------|-------------------------------|---------------------------------|
| Data Source     | Created per subscriber         | Shared among subscribers        |
| Start Emitting  | On subscribe                   | Immediately or by external event|
| Use Case        | HTTP, timer, form changes      | Events, WebSocket, shared data  |

**Quick Tip:**
- Use `share()` or `shareReplay()` to turn a cold observable into a hot one when you want to share execution.

**Code Examples:**
```typescript
import { interval } from 'rxjs';
import { share, shareReplay } from 'rxjs/operators';

// Cold Observable
const source$ = interval(1000);

// Hot Observable with share()
const shared$ = source$.pipe(share());

// Hot Observable with shareReplay()
const replayed$ = source$.pipe(shareReplay(1));
```
