import AdminNav from '@/components/admin/AdminNav';
import { auth } from '@/lib/auth';
import { AdminLocaleProvider } from '@/contexts/AdminLocaleContext';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If there's a session, show admin layout with navigation
  // If not, just render children (login page will handle its own layout)
  if (session) {
    return (
      <AdminLocaleProvider>
        <div className="min-h-screen bg-gray-50">
          <AdminNav user={session.user} />
          <main className="container mx-auto px-4 py-8 max-w-7xl">{children}</main>
        </div>
      </AdminLocaleProvider>
    );
  }

  // No session - render children without nav (login page)
  return <>{children}</>;
}
