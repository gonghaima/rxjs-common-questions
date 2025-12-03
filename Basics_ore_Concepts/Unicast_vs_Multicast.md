# Unicast vs Multicast

**Observable vs Subject**

- **Observable (Unicast):**

  - Each subscriber gets its own independent execution and data stream.
  - Useful for HTTP requests, timers, or any scenario where each consumer needs a separate result.

- **Subject (Multicast):**
  - One execution is shared among all subscribers; all receive the same data/events.
  - Useful for broadcasting events, sharing state, or when multiple components need the same stream.

**Example:**

- Unicast: `http.get('/api/data')` — each call triggers a new request.
- Multicast: `subject.next(data)` — all subscribers receive the same value.
