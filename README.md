# Workshop Buddy

Workshop Buddy is a multi-tenant inventory management system designed to help you keep track of materials, consumables, and items in your workshop. Always know what's in stock, what's running low, and which materials are needed for your projects.

## Features

- **User Authentication**: Secure multi-tenant system where each user has their own isolated data
- **Materials Management**: Track materials with quantities, minimum stock levels, and low-stock alerts
- **Consumables Management**: Manage consumables separately with quantity tracking
- **Items Management**: Create items and link required materials to them
- **Material Requirements**: See at a glance which items have sufficient materials available
- **Low Stock Indicators**: Visual warnings when materials or consumables fall below minimum quantities

## Technology Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and optimized builds
- **Jotai** for state management
- **TanStack Query (React Query)** for server state management
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **.NET 9** with ASP.NET Core
- **Entity Framework Core** for data access
- **SQLite** database
- **JWT** authentication
- **Swagger/OpenAPI** documentation

### Infrastructure
- **Docker Compose** for easy deployment
- **Nginx** for frontend serving and API proxying

## Getting Started

### Prerequisites

- .NET 9 SDK
- Node.js 20+
- Docker and Docker Compose (for containerized deployment)

### Development Setup

#### Backend

1. Navigate to the backend directory:
```bash
cd backend/WorkshopBuddy
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Run the backend:
```bash
dotnet run
```

The backend API will be available at `http://localhost:5000`
Swagger documentation: `http://localhost:5000/swagger`

#### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Docker Deployment

To run the entire application with Docker Compose:

```bash
cd infrastructure
docker-compose up --build
```

This will start:
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`
- SQLite database with persistent volume

## Usage

### First Time Setup

1. Open the application in your browser
2. Click "Register" to create a new account
3. Enter a username and password
4. You'll be automatically logged in

### Managing Materials

1. Navigate to **Materials** from the dashboard
2. Click **Add Material** to create a new material
3. Enter:
   - Name (required)
   - Description (optional)
   - Current quantity
   - Minimum quantity (for low-stock alerts)
   - Unit of measurement (e.g., "pieces", "kg", "liters")
4. Materials with quantities below the minimum will show a **LOW STOCK** warning

### Managing Consumables

Consumables work the same way as materials but are tracked separately:

1. Navigate to **Consumables**
2. Click **Add Consumable**
3. Enter the same information as for materials

### Managing Items

Items represent projects or equipment that require specific materials:

1. Navigate to **Items**
2. Click **Add Item**
3. Enter:
   - Name (required)
   - Description (optional)
   - Notes (optional)
4. After creating an item, you can link materials to it:
   - Click **Link Material**
   - Select a material from the dropdown
   - Enter the required quantity
   - Click **Link**
5. The item will show whether sufficient materials are available:
   - ✓ Green checkmark: Enough material available
   - ✗ Red cross: Insufficient material

## API Documentation

When running the backend in development mode, Swagger documentation is available at:
```
http://localhost:5000/swagger
```

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

#### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/{id}` - Get a specific material
- `POST /api/materials` - Create a new material
- `PUT /api/materials/{id}` - Update a material
- `DELETE /api/materials/{id}` - Delete a material

#### Consumables
- `GET /api/consumables` - Get all consumables
- `GET /api/consumables/{id}` - Get a specific consumable
- `POST /api/consumables` - Create a new consumable
- `PUT /api/consumables/{id}` - Update a consumable
- `DELETE /api/consumables/{id}` - Delete a consumable

#### Items
- `GET /api/items` - Get all items with linked materials
- `GET /api/items/{id}` - Get a specific item
- `POST /api/items` - Create a new item
- `PUT /api/items/{id}` - Update an item
- `DELETE /api/items/{id}` - Delete an item
- `POST /api/items/{id}/materials` - Link a material to an item
- `DELETE /api/items/{id}/materials/{materialId}` - Unlink a material

## Project Structure

```
workshop-buddy/
├── backend/
│   ├── WorkshopBuddy/
│   │   ├── Controllers/      # API endpoints
│   │   ├── Data/             # Database context
│   │   ├── DTOs/             # Data transfer objects
│   │   ├── Models/           # Entity models
│   │   └── Services/         # Business logic
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/              # API client
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Jotai state
│   │   └── types/            # TypeScript types
│   ├── Dockerfile
│   └── nginx.conf
└── infrastructure/
    └── docker-compose.yml
```

## Security

- **Multi-tenant isolation**: Each user can only access their own data
- **JWT Authentication**: Secure token-based authentication
- **Password hashing**: Passwords are hashed using BCrypt
- **CORS protection**: Configured for specific origins
- **API authorization**: All endpoints except auth require valid JWT

## Testing

### Backend Tests
```bash
cd backend/WorkshopBuddy
dotnet test
```

### Frontend Tests
```bash
cd frontend
npm run test        # Unit tests with Vitest
npm run test:e2e    # E2E tests with Playwright
```

## Configuration

### Backend Configuration

Edit `backend/WorkshopBuddy/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=workshopbuddy.db"
  },
  "Jwt": {
    "Key": "your-secret-key-change-in-production",
    "Issuer": "WorkshopBuddy",
    "Audience": "WorkshopBuddyApp"
  }
}
```

### Frontend Configuration

Edit `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Follow conventional commits style for commit messages
2. Every PR should answer:
   - **What changed?**
   - **Why?**
   - **Breaking changes?**
3. Add tests for new features or bug fixes
4. Update documentation for user-facing changes

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or contributions, please open an issue on the repository.
