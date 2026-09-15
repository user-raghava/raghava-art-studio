# Architecture

Customer -> Cloudflare -> Kubernetes Ingress -> React frontend / Spring Boot API -> PostgreSQL / WhatsApp provider.

CI:
GitHub -> Actions -> tests -> CodeQL/SonarQube/Trivy -> Docker image -> Docker Hub.

CD:
Docker Hub -> Helm -> K3d/Kubernetes.
