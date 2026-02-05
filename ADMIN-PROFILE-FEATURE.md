# Admin Profile Settings Feature

## Overview
Added a complete profile management system for admin users to update their email and password.

## Files Created

### 1. Profile Page
**File**: `src/app/admin/profile/page.tsx`
- Client component with three sections:
  - Account Information (read-only: name, role)
  - Update Email form
  - Update Password form
- Full translation support (TR/EN)
- Real-time validation
- Toast notifications for success/error

### 2. API Routes

#### Profile Info
**File**: `src/app/api/admin/profile/route.ts`
- GET endpoint to fetch current user data
- Returns: id, name, email, role

#### Update Email
**File**: `src/app/api/admin/profile/email/route.ts`
- PATCH endpoint to update email
- Validates email format
- Checks if email is already in use by another user
- Prevents duplicate emails

#### Update Password
**File**: `src/app/api/admin/profile/password/route.ts`
- PATCH endpoint to update password
- Requires current password verification
- Validates minimum length (6 characters)
- Hashes new password with bcrypt

## Features

### Email Update
- ✅ Change email address
- ✅ Email validation
- ✅ Duplicate email check
- ✅ Success notification

### Password Update
- ✅ Current password verification (security)
- ✅ New password confirmation
- ✅ Minimum length validation (6 characters)
- ✅ Password strength requirements
- ✅ Success notification
- ✅ Form auto-clear on success

### Security
- ✅ Requires authentication (middleware protected)
- ✅ Requires admin role
- ✅ Current password verification before change
- ✅ Password hashing with bcrypt
- ✅ No plain text passwords stored

### UI/UX
- ✅ Clean card-based layout
- ✅ Clear section separation
- ✅ Loading states
- ✅ Error handling with toast notifications
- ✅ Success feedback
- ✅ Responsive design
- ✅ Full bilingual support (EN/TR)

## Navigation

Added "Profile" link to admin navigation:
- **Position**: At the bottom of the main menu, before Logout
- **Icon**: User icon
- **URL**: `/admin/profile`
- **Visible**: To all authenticated admin users

## Translations

### English (admin-en.json)
```json
"nav": {
  "profile": "Profile"
},
"profile": {
  "title": "Profile Settings",
  "subtitle": "Manage your account settings",
  "accountInfo": "Account Information",
  "name": "Name",
  "email": "Email Address",
  "role": "Role",
  "updateEmail": "Update Email",
  "updatePassword": "Update Password",
  "currentPassword": "Current Password",
  "newPassword": "New Password",
  "confirmPassword": "Confirm New Password",
  "passwordHint": "Minimum 6 characters",
  "emailUpdated": "Email Updated",
  "emailUpdatedDesc": "Your email has been updated successfully",
  "passwordUpdated": "Password Updated",
  "passwordUpdatedDesc": "Your password has been updated successfully",
  "passwordMismatch": "Passwords do not match",
  "passwordTooShort": "Password must be at least 6 characters"
}
```

### Turkish (admin-tr.json)
All fields fully translated to Turkish.

## Usage

### Accessing Profile
1. Log in to admin panel
2. Click "Profile" / "Profil" in the navigation menu
3. You'll see your account information

### Updating Email
1. Go to Profile page
2. Enter new email in "Update Email" section
3. Click "Update" / "Güncelle"
4. Success notification will appear

### Updating Password
1. Go to Profile page
2. Enter current password
3. Enter new password (min 6 characters)
4. Confirm new password
5. Click "Update" / "Güncelle"
6. Success notification will appear
7. Form will clear automatically

## Validation Rules

### Email
- Must be valid email format
- Cannot be empty
- Must be unique (not used by another user)

### Password
- Current password must be correct
- New password must be at least 6 characters
- New password and confirmation must match

## Error Messages

### Email Update
- "Invalid email" - Email format is incorrect
- "Email already in use" - Another user has this email
- "Internal server error" - Server error occurred

### Password Update
- "Missing required fields" - Empty fields
- "Password must be at least 6 characters" - Too short
- "Current password is incorrect" - Wrong current password
- "Passwords do not match" - Confirmation doesn't match
- "Internal server error" - Server error occurred

## Security Considerations

1. **Authentication Required**: All endpoints check session
2. **Role Verification**: Only admin users can access
3. **Current Password Check**: Must provide current password to change password
4. **Password Hashing**: bcrypt with salt rounds
5. **No Password Exposure**: Passwords never returned in API responses
6. **SQL Injection Protected**: Prisma ORM handles sanitization
7. **XSS Protected**: React escapes all user input

## Testing Checklist

- [ ] Access profile page as admin
- [ ] View current email and name
- [ ] Update email to new valid email
- [ ] Try to update email to existing email (should fail)
- [ ] Try to update email with invalid format (should fail)
- [ ] Update password with correct current password
- [ ] Try to update password with wrong current password (should fail)
- [ ] Try to update password with mismatched confirmation (should fail)
- [ ] Try to update password shorter than 6 chars (should fail)
- [ ] Verify password change by logging out and logging in with new password
- [ ] Test in both English and Turkish
- [ ] Verify navigation link appears in menu
- [ ] Verify page is responsive on mobile

## Future Enhancements (Optional)

- Add name editing
- Add profile picture upload
- Add password strength meter
- Add 2FA (Two-Factor Authentication)
- Add session management (view/revoke active sessions)
- Add activity log (recent logins, changes)
- Email verification for email changes
- Password history (prevent reusing recent passwords)
