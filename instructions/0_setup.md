# Workshop Buddy

Software system to support work in the shop. Maintenance and inventory system.
Overview of devices and materials. Knowing which maintenances are done and which are pending and if materials are missing.
Have a overview of materials (inventory)

## Abstract data model 

- Devices (e.g. Car, Mower, Bike)
- Materials 
  - Raw 
  - Auxiliary (e.g. Screws)
- Association between Devices and raw materials
  - The association clarifies which raw materials an item needs and whether enough is available


## Technologies and Architecture

### General

- YOU MUST use the `specs.md` to create the system.
- Use a event-drivend architecture (CQRS, Event Sourcing)


### Frontend
- React
  - Libraries: Jotai, TanStack Query
- TypeScript
- Vite
- Tests
  - UI and E2E tests with Playwright
  - Vitest for unit tests

#### UX
  - The app has a intutive and mobile friendly navigation
  - Use an appealing design


### Backend
- .NET web backend with ASP.NET
- API security
  - Authenticated users may only access their own data
- Data abstraction layer with Entity Framework
- Persistence in a SQLite database
  - For development use the sqlite database setup in the infrastructure section
- Swagger documentation

### Communication
- Use open-telemetry to enable effective observability


### Infrastructure
- Docker Compose
  - SQLite database for data storage and user management

### Deployment
- The system is hosted as docker container

### Tests
- The main functionalities should be covered by E2E tests

## Documentation
The most important functions are documented in `README.md`.