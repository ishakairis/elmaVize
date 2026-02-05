# Alternative: Setup Database via Railway Dashboard

Since the DATABASE_URL might not be easily accessible externally, we can run commands directly in Railway:

## Method 1: Use Railway's Run Command Feature

1. Go to your Railway project dashboard
2. Click on your **elmaVize web service** (not PostgreSQL)
3. Click on the **"..."** menu (three dots)
4. Look for **"Run Command"** or similar
5. Run these commands one by one:
   ```
   npm run db:push
   ```
   Then:
   ```
   npm run db:seed
   ```

## Method 2: Add a Temporary Build Command

1. Go to your web service **Settings**
2. Find **"Deploy"** or **"Build"** settings
3. Temporarily add to build command:
   ```
   npm install && npx prisma generate && npm run db:push && npm run db:seed && npm run build
   ```
4. Redeploy
5. After successful deploy, remove the db:push and db:seed from build command

## Method 3: Connect Services Manually

The DATABASE_URL should automatically be available in your web service if they're connected.

Check your web service variables (not PostgreSQL variables):
1. Click on **elmaVize** service
2. Go to **Variables** tab
3. Look for **DATABASE_URL** there (it should be automatically injected)





