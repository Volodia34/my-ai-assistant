import Sidebar from '@/components/layout/Sidebar';
import React from 'react';

export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row h-screen main-layout">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
}
