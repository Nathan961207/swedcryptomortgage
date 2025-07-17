#!/bin/bash

# Deployment Script for Swedish Property Mortgage Platform
# This script handles deployment to different environments

set -e

# Default values
ENVIRONMENT="staging"
NAMESPACE="mortgage-platform"
REGISTRY="your-registry.com"
VERSION="latest"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -n|--namespace)
            NAMESPACE="$2"
            shift 2
            ;;
        -r|--registry)
            REGISTRY="$2"
            shift 2
            ;;
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -e, --environment    Target environment (staging, production) [default: staging]"
            echo "  -n, --namespace      Kubernetes namespace [default: mortgage-platform]"
            echo "  -r, --registry       Docker registry URL [default: your-registry.com]"
            echo "  -v, --version        Image version tag [default: latest]"
            echo "  -h, --help           Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

echo "🚀 Deploying Swedish Property Mortgage Platform to $ENVIRONMENT..."
echo "📋 Configuration:"
echo "   Environment: $ENVIRONMENT"
echo "   Namespace: $NAMESPACE"
echo "   Registry: $REGISTRY"
echo "   Version: $VERSION"
echo ""

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    echo "❌ Invalid environment. Must be 'staging' or 'production'"
    exit 1
fi

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl and try again."
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "🏗️ Building Docker images..."

# Build frontend image
echo "Building frontend image..."
docker build -t $REGISTRY/mortgage-platform-frontend:$VERSION apps/frontend/

# Build backend image
echo "Building backend image..."
docker build -t $REGISTRY/mortgage-platform-backend:$VERSION apps/backend/

echo "📤 Pushing images to registry..."
docker push $REGISTRY/mortgage-platform-frontend:$VERSION
docker push $REGISTRY/mortgage-platform-backend:$VERSION

echo "☸️ Deploying to Kubernetes..."

# Create namespace if it doesn't exist
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Apply database configuration
echo "Applying database configuration..."
kubectl apply -f infra/k8s/db.yaml -n $NAMESPACE

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n $NAMESPACE --timeout=300s

# Apply backend configuration
echo "Applying backend configuration..."
sed "s|IMAGE_TAG|$VERSION|g" infra/k8s/backend.yaml | \
sed "s|REGISTRY_URL|$REGISTRY|g" | \
kubectl apply -f - -n $NAMESPACE

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
kubectl wait --for=condition=ready pod -l app=mortgage-backend -n $NAMESPACE --timeout=300s

# Apply frontend configuration
echo "Applying frontend configuration..."
sed "s|IMAGE_TAG|$VERSION|g" infra/k8s/frontend.yaml | \
sed "s|REGISTRY_URL|$REGISTRY|g" | \
kubectl apply -f - -n $NAMESPACE

# Wait for frontend to be ready
echo "⏳ Waiting for frontend to be ready..."
kubectl wait --for=condition=ready pod -l app=mortgage-frontend -n $NAMESPACE --timeout=300s

# Apply ingress configuration
echo "Applying ingress configuration..."
kubectl apply -f infra/k8s/ingress.yaml -n $NAMESPACE

echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Deployment Status:"
kubectl get pods -n $NAMESPACE
echo ""
echo "🌐 Services:"
kubectl get services -n $NAMESPACE
echo ""
echo "🔗 Ingress:"
kubectl get ingress -n $NAMESPACE

if [[ "$ENVIRONMENT" == "production" ]]; then
    echo "⚠️  Production deployment completed. Please verify all services are working correctly."
else
    echo "🧪 Staging deployment completed. You can now test the application."
fi
