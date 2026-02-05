# 🐛 Bug Fix: Select Component Value Error

## Issue

When accessing `/admin/visas/new`, you got this error:

```
Error: A <Select.Item /> must have a value prop that is not an empty string. 
This is because the Select value can be set to an empty string to clear the 
selection and show the placeholder.
```

## Root Cause

Radix UI Select component (used in our admin forms) **does not allow empty strings as values**. The VisaForm was using an empty string `""` for the "No specific country" option, which violates this rule.

## What Was Fixed

### File: `src/components/admin/VisaForm.tsx`

#### Fix 1: Changed Select value handling

**Before:**
```typescript
<SelectItem value="">No specific country</SelectItem>  // ❌ Empty string not allowed
```

**After:**
```typescript
<SelectItem value="none">No specific country</SelectItem>  // ✅ Using 'none' string
```

#### Fix 2: Updated value conversion

**Before:**
```typescript
<Select
  value={formData.countryId || ''}
  onValueChange={(value) => setFormData(prev => ({ 
    ...prev, 
    countryId: value || null  // ❌ Would set empty string
  }))}
>
```

**After:**
```typescript
<Select
  value={formData.countryId || 'none'}
  onValueChange={(value) => setFormData(prev => ({ 
    ...prev, 
    countryId: value === 'none' ? null : value  // ✅ Converts 'none' to null
  }))}
>
```

#### Fix 3: Initialized countryId as null

**Before:**
```typescript
const [formData, setFormData] = useState({
  // ...
  countryId: visa?.countryId || '',  // ❌ Empty string default
});
```

**After:**
```typescript
const [formData, setFormData] = useState({
  // ...
  countryId: visa?.countryId || null,  // ✅ null default
});
```

## Why This Works

1. **'none' as a placeholder value**: We use the string `'none'` as a valid value that represents "no country selected"
2. **Convert to null on save**: When saving to the database, we convert `'none'` back to `null` which is what the database expects
3. **Proper initialization**: Starting with `null` instead of empty string ensures consistency

## Benefits

✅ Select component works without errors  
✅ Database still receives `null` for optional country  
✅ Form validation works correctly  
✅ User experience is unchanged  

## Testing

The visa form at `/admin/visas/new` should now work without errors:

1. Go to `http://localhost:3000/admin/visas/new`
2. Country dropdown should work properly
3. Selecting "No specific country" should work
4. Form should submit successfully

---

**Date:** January 23, 2026  
**Status:** ✅ Fixed  
**Impact:** Visa form now works correctly
