@echo off
echo.
echo Restarting Development Server...
echo.
echo Step 1: Regenerating Prisma Client...
call npx prisma generate
echo.
echo Step 2: Starting Dev Server...
call npm run dev




