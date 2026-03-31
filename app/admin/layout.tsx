import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <AdminSidebar />
      <div className="ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
}
