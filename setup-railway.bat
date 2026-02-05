@echo off
echo.
echo ========================================
echo   Railway Database Setup
echo ========================================
echo.
echo This script will setup your Railway database.
echo.
set /p DATABASE_URL="Paste your DATABASE_URL from Railway and press Enter: "
echo.
echo Setting up database...
echo.
set DATABASE_URL=%DATABASE_URL%
node setup-railway-db.js
pause





