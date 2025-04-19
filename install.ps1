# Install frontend dependencies
Write-Host "Installing frontend dependencies..."
cd frontend
npm install

# Install backend dependencies
Write-Host "Installing backend dependencies..."
cd ../backend
npm install

Write-Host "All dependencies installed successfully!" 