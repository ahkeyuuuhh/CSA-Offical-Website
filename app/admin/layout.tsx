'use client';

import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <AdminSidebar />
      <div 
        className="min-h-screen transition-all duration-300 p-4"
        style={{ 
          marginLeft: 'calc(var(--sidebar-width, 256px) + 16px)' 
        }}
      >
        {children}
      </div>
    </div>
  );
}
