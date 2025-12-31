# Workshop Buddy

Software system to support work in the shop.
- Always keep track of which materials are available or missing
- Know which maintenance tasks are coming up and whether all materials are still on hand


## Features


- Add, edit, and remove material master data
  - Maintain the available quantity of a material
- Add, edit, and remove consumables
- Add, edit, and remove items
  - Link items to materials
    - The association clarifies which materials an item needs and whether enough is available
- Overview of items and their linked materials

Data description:

- Manage materials (e.g., brake pad) and consumables (e.g., screws)
  - Inventory list
- Manage items
  - Information
- Link materials and items
  - Example: brake pads linked to the item "Bicycle"

## Technologies and Architecture

### General

- Multi-tenant system. A user logs in and sees only their data.

### Frontend
- React
  - Libraries: Jotai, TanStack Query
- TypeScript
- Vite
- Tests
  - UI tests with Playwright
  - Vitest for unit tests

### Backend
- .NET web backend with ASP.NET
- API security
  - Authenticated users may only access their own data
- Data abstraction layer with Entity Framework
- Persistence in a SQLite database
  - For development use the sqlite database setup in the infrastructure section
- Swagger documentation

### Infrastructure
- Docker Compose
  - SQLite database for data storage and user management

### Tests
- The main functionalities should be covered by E2E tests

## Documentation
The most important functions are documented in `README.md`.