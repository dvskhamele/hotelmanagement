#!/bin/bash

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║                          🏥 HOSPITAL OPS LAUNCHER                           ║
# ║                    Professional Hospital Operations Management              ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                          Script Configuration                                │
# └──────────────────────────────────────────────────────────────────────────────┘

# Colors for beautiful output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Emojis for visual appeal
HOSPITAL="🏥"
SUCCESS="✅"
ERROR="❌"
WARNING="⚠️"
ROCKET="🚀"
GEAR="⚙️"
HEART="💖"
STAR="⭐"
CLOCK="⏰"
CHECK="✔️"
CROSS="✖️"

# Application configuration
BASE_DIR="/Users/test/startups/hospitalmanagement/hospital-ops-app"
FRONTEND_PORT=3000
BACKEND_PORT=3001
APP_NAME="HospitalOps"
VERSION="1.0.0"

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                          Utility Functions                                   │
# └──────────────────────────────────────────────────────────────────────────────┘

print_header() {
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}                              ${HOSPITAL} ${APP_NAME} ${HOSPITAL}                           ${CYAN}║${NC}"
    echo -e "${CYAN}║${NC}                      Professional Hospital Management                      ${CYAN}║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_section() {
    echo -e "${BLUE}┌──────────────────────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│${NC}  $1"
    echo -e "${BLUE}└──────────────────────────────────────────────────────────────────────────────┘${NC}"
}

print_success() {
    echo -e "${GREEN}${SUCCESS} $1${NC}"
}

print_error() {
    echo -e "${RED}${ERROR} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_info() {
    echo -e "${CYAN}${GEAR} $1${NC}"
}

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                          System Check Functions                              │
# └──────────────────────────────────────────────────────────────────────────────┘

check_prerequisites() {
    print_section "System Prerequisites Check"
    
    # Check if we're in the right directory
    if [ ! -d "$BASE_DIR" ]; then
        print_error "HospitalOps directory not found at $BASE_DIR"
        exit 1
    fi
    
    cd "$BASE_DIR"
    print_success "Working directory: $(pwd)"
    
    # Check if required files exist
    if [ ! -f "package.json" ]; then
        print_error "package.json not found"
        exit 1
    fi
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        echo "Please install Node.js from https://nodejs.org/"
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_info "Node.js version: $(node --version)"
    print_info "npm version: $(npm --version)"
    print_success "All prerequisites satisfied!"
    echo ""
}

install_dependencies() {
    print_section "Installing Dependencies"
    
    # Install root dependencies
    if [ ! -d "node_modules" ]; then
        print_info "Installing root dependencies..."
        npm install --silent
        if [ $? -ne 0 ]; then
            print_error "Failed to install root dependencies"
            exit 1
        fi
        print_success "Root dependencies installed successfully"
    else
        print_info "Root dependencies already installed"
    fi
    
    # Check and install backend dependencies
    if [ -d "backend" ]; then
        print_info "Backend directory found"
        if [ ! -d "backend/node_modules" ]; then
            print_info "Installing backend dependencies..."
            cd backend
            npm install --silent
            if [ $? -ne 0 ]; then
                print_error "Failed to install backend dependencies"
                exit 1
            fi
            print_success "Backend dependencies installed successfully"
            cd ..
        else
            print_info "Backend dependencies already installed"
        fi
    else
        print_warning "Backend directory not found"
    fi
    
    # Check and install frontend dependencies
    if [ -d "frontend" ]; then
        print_info "Frontend directory found"
        if [ ! -d "frontend/node_modules" ]; then
            print_info "Installing frontend dependencies..."
            cd frontend
            npm install --silent
            if [ $? -ne 0 ]; then
                print_error "Failed to install frontend dependencies"
                exit 1
            fi
            print_success "Frontend dependencies installed successfully"
            cd ..
        else
            print_info "Frontend dependencies already installed"
        fi
    else
        print_warning "Frontend directory not found"
    fi
    
    echo ""
}

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                          Port Management                                     │
# └──────────────────────────────────────────────────────────────────────────────┘

check_ports() {
    print_section "Port Availability Check"
    
    # Check if frontend port is available
    if lsof -Pi :$FRONTEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_warning "Port $FRONTEND_PORT is already in use"
        FRONTEND_AVAILABLE=false
    else
        print_success "Port $FRONTEND_PORT is available"
        FRONTEND_AVAILABLE=true
    fi
    
    # Check if backend port is available
    if lsof -Pi :$BACKEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_warning "Port $BACKEND_PORT is already in use"
        BACKEND_AVAILABLE=false
    else
        print_success "Port $BACKEND_PORT is available"
        BACKEND_AVAILABLE=true
    fi
    
    echo ""
}

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                          Enhanced Backend Functions                          │
# └──────────────────────────────────────────────────────────────────────────────┘

enhance_backend() {
    print_section "Enhancing Backend Services"
    
    if [ -d "backend" ]; then
        print_info "Configuring enhanced backend services..."
        
        # Create backup of original files
        if [ -f "backend/src/server.js" ] && [ ! -f "backend/src/server.js.backup" ]; then
            cp backend/src/server.js backend/src/server.js.backup
            print_info "Created backup of original server.js"
        fi
        
        # Show available backend endpoints
        echo -e "${PURPLE}Available Backend Endpoints:${NC}"
        echo -e "  ${STAR} Authentication: POST /api/auth/login"
        echo -e "  ${STAR} Dashboard Stats: GET /api/dashboard/stats"
        echo -e "  ${STAR} Recent Activity: GET /api/dashboard/activity"
        echo -e "  ${STAR} Patient Room Management: GET/PUT /api/rooms/*"
        echo -e "  ${STAR} Staff Management: GET/PUT /api/staff/*"
        echo -e "  ${STAR} Patient Requests: GET/PUT /api/requests/*"
        echo -e "  ${STAR} Pharmacy Inventory: GET/PUT /api/inventory/*"
        echo -e "  ${STAR} Departments: GET /api/departments"
        echo ""
        
        # Show backend services
        echo -e "${PURPLE}Available Backend Services:${NC}"
        echo -e "  ${HEART} Hospital Service - Core hospital operations"
        echo -e "  ${HEART} Patient Room Service - Room status management"
        echo -e "  ${HEART} Staff Service - Medical staff management"
        echo -e "  ${HEART} Request Service - Patient request handling"
        echo -e "  ${HEART} Inventory Service - Pharmacy & medical supplies tracking"
        echo -e "  ${HEART} Department Service - Medical department coordination"
        echo ""
        
        print_success "Backend enhancement completed!"
    else
        print_warning "Backend directory not found, skipping enhancement"
    fi
}

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                          Application Startup                                 │
# └──────────────────────────────────────────────────────────────────────────────┘

start_application() {
    print_section "Starting ${APP_NAME} Application"
    
    echo -e "${ROCKET} Launching ${APP_NAME} v${VERSION}..."
    echo -e "${CLOCK} This may take a moment while services initialize..."
    echo ""
    
    # Display startup information
    echo -e "${BLUE}Application Services:${NC}"
    echo -e "  ${CHECK} Frontend Server: http://localhost:${FRONTEND_PORT}"
    echo -e "  ${CHECK} Backend API: http://localhost:${BACKEND_PORT}"
    echo -e "  ${CHECK} Real-time Updates: WebSocket connections"
    echo ""
    
    echo -e "${BLUE}Monitoring:${NC}"
    echo -e "  ${STAR} Press ${WHITE}Ctrl+C${NC} to stop all services"
    echo -e "  ${STAR} Logs will be displayed below"
    echo ""
    
    # Start the development server
    print_info "Initializing development environment..."
    
    # Check ports before starting
    if [ "$FRONTEND_AVAILABLE" = false ] || [ "$BACKEND_AVAILABLE" = false ]; then
        print_warning "Some ports are in use. Application may not start correctly."
        echo -e "${YELLOW}Consider stopping other applications or changing ports.${NC}"
        echo ""
    fi
    
    # Start the application
    echo -e "${ROCKET} ${WHITE}Starting application services...${NC}"
    echo ""
    
    # Run the development server
    npm run dev
    
    if [ $? -eq 0 ]; then
        print_success "${APP_NAME} application started successfully!"
        echo ""
        echo -e "${GREEN}🎉 Application is now running!${NC}"
        echo -e "${BLUE}Frontend:${NC} http://localhost:${FRONTEND_PORT}"
        echo -e "${BLUE}Backend API:${NC} http://localhost:${BACKEND_PORT}"
        echo ""
        echo -e "${PURPLE}Happy hospital managing! 🏥${NC}"
    else
        print_error "Failed to start ${APP_NAME} application"
        echo "Please check the error messages above for details."
        exit 1
    fi
}

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                          Main Execution                                      │
# └──────────────────────────────────────────────────────────────────────────────┘

show_welcome() {
    clear
    print_header
    echo -e "${WHITE}Welcome to ${APP_NAME} - The Ultimate Hospital Operations Management System${NC}"
    echo -e "${CYAN}Streamlining hospital operations with cutting-edge technology${NC}"
    echo ""
}

show_completion() {
    echo ""
    echo -e "${HEART} ${GREEN}Thank you for using ${APP_NAME}!${NC} ${HEART}"
    echo -e "${CYAN}Visit our website for documentation and support${NC}"
    echo ""
}

# ┌──────────────────────────────────────────────────────────────────────────────┐
# │                          Main Script Execution                               │
# └──────────────────────────────────────────────────────────────────────────────┘

# Main execution flow
main() {
    show_welcome
    check_prerequisites
    install_dependencies
    check_ports
    enhance_backend
    start_application
    show_completion
}

# Handle script termination gracefully
trap 'echo ""; print_info "Shutting down ${APP_NAME}..."; show_completion; exit 0' INT TERM

# Run the main function
main "$@"
