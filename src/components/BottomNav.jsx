import React, { useState } from 'react';
import { Home, LayoutGrid, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ currentPage, onPageChange }) => {
    // Add custom animation state for tab clicks
    const [animatingTab, setAnimatingTab] = useState(null);

    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'categories', icon: LayoutGrid, label: 'Categories' },
        { id: 'chat', icon: MessageCircle, label: 'Chat' },
        { id: 'profile', icon: User, label: 'Me' }
    ];

    const handleTabClick = (id) => {
        setAnimatingTab(id);
        onPageChange(id);
        setTimeout(() => setAnimatingTab(null), 300); // Reset animation
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.04)] z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentPage === tab.id;
                    const isAnimating = animatingTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className="flex flex-col items-center gap-1 min-w-[64px] py-1 relative"
                        >
                            <div className="relative">
                                <Icon
                                    size={24}
                                    className={`transition-all duration-300 ${isAnimating ? 'scale-75' : 'scale-100'} ${isActive
                                        ? 'text-shein-dark fill-shein-dark'
                                        : 'text-gray-400'
                                        }`}
                                    strokeWidth={isActive ? 2 : 1.5}
                                />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-shein-dark' : 'text-gray-400'
                                }`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
