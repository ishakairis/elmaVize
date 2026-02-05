@echo off
echo.
echo ================================================
echo   Deploy to Railway - Automated Script
echo ================================================
echo.
echo Step 1: Changing database provider to PostgreSQL...
echo.

:: Create a backup of schema
copy prisma\schema.prisma prisma\schema.prisma.backup >nul

:: Replace sqlite with postgresql in schema
powershell -Command "(Get-Content prisma\schema.prisma) -replace 'provider = \"sqlite\"', 'provider = \"postgresql\"' | Set-Content prisma\schema.prisma"

echo Done! Schema updated to PostgreSQL.
echo.
echo Step 2: Committing changes...
git add .
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"
echo.
echo Step 3: Pushing to GitHub (Railway will auto-deploy)...
git push
echo.
echo ✓ Pushed to GitHub! Railway is deploying...
echo.
echo Step 4: Restoring SQLite for local development...
:: Restore backup (this reverts to sqlite)
copy prisma\schema.prisma.backup prisma\schema.prisma >nul
del prisma\schema.prisma.backup >nul
echo.
echo ✓ Local schema restored to SQLite!
echo.
echo ================================================
echo   Deployment Complete!
echo ================================================
echo.
echo Your changes are deploying to Railway.
echo Check status at: https://railway.app
echo.
echo Your local environment is still set to SQLite.
echo You can continue developing locally!
echo.
pause




