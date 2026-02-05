'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function ProfilePage() {
  const { toast } = useToast();
  const { t } = useAdminLocale();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Email form
  const [emailForm, setEmailForm] = useState({
    email: '',
  });
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    fetch('/api/admin/profile')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setEmailForm({ email: data.email });
        setLoading(false);
      });
  }, []);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingEmail(true);

    try {
      const res = await fetch('/api/admin/profile/email', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailForm.email }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update email');
      }

      toast({
        title: t.profile?.emailUpdated || 'Email Updated',
        description: t.profile?.emailUpdatedDesc || 'Your email has been updated successfully',
      });

      // Refresh user data
      const userData = await fetch('/api/admin/profile').then(r => r.json());
      setUser(userData);
    } catch (error: any) {
      toast({
        title: t.common?.error || 'Error',
        description: error.message || 'Failed to update email',
        variant: 'destructive',
      });
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: t.common?.error || 'Error',
        description: t.profile?.passwordMismatch || 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: t.common?.error || 'Error',
        description: t.profile?.passwordTooShort || 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const res = await fetch('/api/admin/profile/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update password');
      }

      toast({
        title: t.profile?.passwordUpdated || 'Password Updated',
        description: t.profile?.passwordUpdatedDesc || 'Your password has been updated successfully',
      });

      // Clear form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      toast({
        title: t.common?.error || 'Error',
        description: error.message || 'Failed to update password',
        variant: 'destructive',
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">{t.profile?.title || 'Profile Settings'}</h1>
        <p className="text-gray-600 mt-1">{t.profile?.subtitle || 'Manage your account settings'}</p>
      </div>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>{t.profile?.accountInfo || 'Account Information'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.profile?.name || 'Name'}</Label>
            <div className="text-sm text-gray-700">{user?.name}</div>
          </div>
          <div className="space-y-2">
            <Label>{t.profile?.role || 'Role'}</Label>
            <div className="text-sm text-gray-700 capitalize">{user?.role}</div>
          </div>
        </CardContent>
      </Card>

      {/* Update Email */}
      <Card>
        <CardHeader>
          <CardTitle>{t.profile?.updateEmail || 'Update Email'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.profile?.email || 'Email Address'}</Label>
              <Input
                id="email"
                type="email"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ email: e.target.value })}
                required
                placeholder="admin@example.com"
              />
            </div>
            <Button type="submit" disabled={isUpdatingEmail}>
              {isUpdatingEmail ? t.common.saving : t.common.update}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Update Password */}
      <Card>
        <CardHeader>
          <CardTitle>{t.profile?.updatePassword || 'Update Password'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t.profile?.currentPassword || 'Current Password'}</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                required
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t.profile?.newPassword || 'New Password'}</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                required
                placeholder="••••••••"
                minLength={6}
              />
              <p className="text-sm text-gray-500">
                {t.profile?.passwordHint || 'Minimum 6 characters'}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.profile?.confirmPassword || 'Confirm New Password'}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" disabled={isUpdatingPassword}>
              {isUpdatingPassword ? t.common.saving : t.common.update}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
