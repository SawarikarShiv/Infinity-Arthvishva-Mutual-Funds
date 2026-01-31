@echo off
echo ============================================
echo    Infinity Arthvishva Mutual Funds Setup
echo ============================================
echo.

echo [1/6] Cleaning previous installation...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist yarn.lock del yarn.lock
if exist dist rmdir /s /q dist

echo [2/6] Creating package.json...
(
echo {
echo   "name": "infinity-arthvishva-mutual-funds",
echo   "private": true,
echo   "version": "1.0.0",
echo   "type": "module",
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "vite build",
echo     "preview": "vite preview"
echo   },
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0"
echo   },
echo   "devDependencies": {
echo     "@vitejs/plugin-react": "^4.1.0",
echo     "vite": "^4.5.0"
echo   }
echo }
) > package.json

echo [3/6] Installing Vite and React...
call npm install

echo [4/6] Creating vite.config.js...
(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo // https://vitejs.dev/config/
echo export default defineConfig({
echo   plugins: [react()],
echo   server: {
echo     port: 3000,
echo     host: true,
echo     open: true
echo   },
echo   build: {
echo     outDir: 'dist'
echo   }
echo })
) > vite.config.js

echo [5/6] Creating index.html...
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8" /^>
echo     ^<link rel="icon" type="image/svg+xml" href="/vite.svg" /^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
echo     ^<title^>Infinity Arthvishva Mutual Funds^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div id="root"^>^</div^>
echo     ^<script type="module" src="/src/index.js"^>^</script^>
echo   ^</body^>
echo ^</html^>
) > index.html

echo [6/6] Creating basic React files...
if not exist src mkdir src

(
echo import React from 'react';
echo import ReactDOM from 'react-dom/client';
echo import App from './App';
echo.
echo const root = ReactDOM.createRoot(document.getElementById('root'));
echo root.render(
echo   ^<React.StrictMode^>
echo     ^<App /^>
echo   ^</React.StrictMode^>
echo );
) > src\index.js

(
echo function App() {
echo   return (
echo     ^<div style={{ 
echo       display: 'flex', 
echo       justifyContent: 'center', 
echo       alignItems: 'center', 
echo       height: '100vh',
echo       backgroundColor: '#f0f2f5'
echo     }}^>
echo       ^<div style={{ textAlign: 'center' }}^>
echo         ^<h1 style={{ color: '#2563eb', fontSize: '2.5rem', marginBottom: '1rem' }}^>
echo           Infinity Arthvishva Mutual Funds
echo         ^</h1^>
echo         ^<p style={{ color: '#6b7280', fontSize: '1.2rem' }}^>
echo           Your investment platform is ready!
echo         ^</p^>
echo         ^<button 
echo           style={{
echo             marginTop: '2rem',
echo             padding: '0.75rem 1.5rem',
echo             backgroundColor: '#2563eb',
echo             color: 'white',
echo             border: 'none',
echo             borderRadius: '0.5rem',
echo             fontSize: '1rem',
echo             cursor: 'pointer'
echo           }}
echo           onClick={() => alert('Welcome to Infinity Arthvishva!')}
echo         ^>
echo           Get Started
echo         ^</button^>
echo       ^</div^>
echo     ^</div^>
echo   );
echo }
echo.
echo export default App;
) > src\App.js

echo.
echo ============================================
echo ✅ Setup Complete!
echo.
echo Run the following commands:
echo 1. npm run dev    - Start development server
echo 2. npm run build  - Build for production
echo 3. npm run preview - Preview production build
echo ============================================
echo.
pause