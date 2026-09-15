# Frontend → Backend pricing integration

The React commission calculator no longer owns the painting price table. It sends `medium` and `size` to `POST /api/paintings/calculate`.

## Local development

Vite proxies `/api/*` to `http://localhost:8080`, so the browser calls the same origin and Vite forwards the request to Spring Boot.

Flow:

```text
React → /api/paintings/calculate → Vite proxy → Spring Boot → PricingService
```

This makes Spring Boot the source of truth for pricing. Later, Kubernetes Ingress will route `/api` to the backend Service.
