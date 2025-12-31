#!/bin/bash

echo "Starting Workshop Buddy Development Environment..."

# Start backend
echo "Starting backend..."
cd backend/WorkshopBuddy
dotnet run &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 5

# Start frontend
echo "Starting frontend..."
cd ../../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Workshop Buddy is starting..."
echo "Backend API: http://localhost:5000"
echo "Swagger Docs: http://localhost:5000/swagger"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
