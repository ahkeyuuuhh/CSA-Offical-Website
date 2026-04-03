'use client';

import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 overflow-x-hidden admin-interface">
      <AdminSidebar />
      <div 
        className="min-h-screen transition-all duration-300"
        style={{ 
          marginLeft: 'var(--sidebar-width, 256px)' 
        }}
      >
        {children}
      </div>
    </div>
  );
}
