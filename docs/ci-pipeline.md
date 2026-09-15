# CI Pipeline

The GitHub Actions CI pipeline validates every pull request and every push to `main`.

## Pipeline flow

```text
GitHub
  |
  +--> Backend: Java 21 -> Maven verify -> unit tests
  |
  +--> Frontend: Node 24 -> npm install -> Vite build
  |
  +--> Trivy filesystem scan
  |
  +--> Docker build (backend + frontend)
          |
          +--> Trivy backend image scan
          |
          +--> Trivy frontend image scan
```

## Why the jobs are separated

- `backend`: validates Java compilation, tests, packaging and Maven verification.
- `frontend`: validates that the React/Vite application can be built successfully.
- `filesystem-security`: checks dependencies, secrets and common IaC/configuration issues in the repository.
- `docker`: builds the application images and scans the final images for HIGH/CRITICAL vulnerabilities.
- `codeql.yml`: performs GitHub CodeQL static analysis separately.

## Important CI/CD distinction

This workflow does **not** push images to Docker Hub and does **not** deploy to Kubernetes yet.

That is intentional. The stages are:

```text
CI  = test + build + security scan
CD  = push image + deploy with Helm/Kubernetes
```

Docker Hub authentication and image pushing will be added when we build the CD pipeline.

## Current frontend dependency note

The project does not yet commit `frontend/package-lock.json`, so CI uses `npm install` instead of `npm ci`.

For production-grade reproducibility, generate and commit the lockfile, then change the workflow to:

```text
npm ci
```

and enable npm dependency caching in `actions/setup-node`.
