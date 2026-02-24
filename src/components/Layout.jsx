import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout = ({ children, currentPage, onPageChange }) => {
    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md min-h-screen relative flex flex-col bg-white shadow-xl">
                <Header currentPage={currentPage} onPageChange={onPageChange} />
                <main className="flex-1 overflow-y-auto pb-20 hide-scrollbar bg-white">
                    {children}
                </main>
                <BottomNav currentPage={currentPage} onPageChange={onPageChange} />
            </div>
        </div>
    );
};

export default Layout;
