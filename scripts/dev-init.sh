#!/bin/bash

# Development Environment Initialization Script
# This script sets up the development environment for the Swedish Property Mortgage Platform

set -e

echo "🚀 Initializing Swedish Property Mortgage Platform Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "📦 Installing dependencies..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd apps/frontend
npm install
cd ../..

# Install backend dependencies
echo "Installing backend dependencies..."
cd apps/backend
pip install -r requirements.txt
cd ../..

echo "🐳 Starting Docker services..."

# Start PostgreSQL and Redis services
docker-compose -f infra/docker-compose.yml up -d postgres redis

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker-compose -f infra/docker-compose.yml exec postgres pg_isready -U postgres; do
    sleep 2
done

echo "🗄️ Running database migrations..."
cd apps/backend
alembic upgrade head
cd ../..

echo "✅ Development environment initialized successfully!"
echo ""
echo "🎯 Next steps:"
echo "  1. Copy .env.local.example to .env.local in apps/frontend and configure your environment variables"
echo "  2. Copy .env.example to .env in apps/backend and configure your environment variables"
echo "  3. Run 'npm run dev' in apps/frontend to start the frontend development server"
echo "  4. Run 'uvicorn app.main:app --reload' in apps/backend to start the backend development server"
echo ""
echo "📚 Documentation: Check README.md for more information"
