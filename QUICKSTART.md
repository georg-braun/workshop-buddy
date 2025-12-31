# Workshop Buddy - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Option 1: Development Mode (Recommended for development)

1. **Start the application:**
   ```bash
   ./dev.sh
   ```

2. **Open your browser:**
   - Frontend: http://localhost:5173
   - API Docs: http://localhost:5000/swagger

3. **Create your account:**
   - Click "Register"
   - Enter username and password
   - Start managing your workshop inventory!

### Option 2: Docker Compose (Recommended for production)

1. **Start with Docker:**
   ```bash
   cd infrastructure
   docker-compose up --build
   ```

2. **Access the application:**
   - Application: http://localhost:3000
   - API: http://localhost:5000

## 📋 What You Can Do

### Materials Management
- Add materials (e.g., brake pads, bolts, paint)
- Track quantities and set minimum stock levels
- Get low-stock warnings automatically

### Consumables
- Manage consumables separately (e.g., screws, tape, oil)
- Same tracking features as materials

### Items & Projects
- Create items (e.g., Bicycle, Car, Furniture)
- Link required materials to each item
- See at a glance if you have enough materials for a project

## 🎯 Quick Workflow Example

1. **Add a Material:**
   - Go to "Materials"
   - Click "Add Material"
   - Name: "Brake Pads", Quantity: 10, Min: 5, Unit: "sets"

2. **Create an Item:**
   - Go to "Items"
   - Click "Add Item"
   - Name: "Mountain Bike", Description: "Main bike"

3. **Link Material to Item:**
   - Click "Link Material" on your item
   - Select "Brake Pads"
   - Required: 1 set
   - System shows ✓ (sufficient) or ✗ (insufficient)

## 🔧 Development

### Backend Only
```bash
cd backend/WorkshopBuddy
dotnet run
```

### Frontend Only
```bash
cd frontend
npm install
npm run dev
```

### Run Tests
```bash
# Backend tests
cd backend/WorkshopBuddy
dotnet test

# Frontend E2E tests
cd frontend
npm run test:e2e
```

## 📚 More Information

See [README.md](README.md) for:
- Complete API documentation
- Configuration options
- Architecture details
- Contributing guidelines

## 🆘 Troubleshooting

**Port already in use:**
- Backend: Change port in `backend/WorkshopBuddy/Properties/launchSettings.json`
- Frontend: Change port with `npm run dev -- --port 3001`

**Database issues:**
- Delete `workshopbuddy.db` and restart to reset database

**Build errors:**
- Backend: `cd backend/WorkshopBuddy && dotnet restore`
- Frontend: `cd frontend && npm install`

## ✨ Features Highlight

- ✅ Secure multi-tenant system (your data is yours)
- ✅ Real-time inventory tracking
- ✅ Low-stock alerts
- ✅ Material-to-item relationships
- ✅ Clean, intuitive interface
- ✅ Mobile-friendly design
- ✅ Fast and responsive

Happy organizing! 🛠️
