import React from 'react';
import { Home, LayoutGrid, Sparkles, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ currentPage, onPageChange }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'HOME' },
        { id: 'categories', icon: LayoutGrid, label: 'CATEGORY' },
        { id: 'chat', icon: MessageCircle, label: 'CHAT' },
        { id: 'profile', icon: User, label: 'ME' }
    ];

    return (
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-2 pb-safe z-50">
            <div className="flex items-center justify-around h-16">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentPage === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onPageChange(tab.id)}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${isActive ? 'text-shein-blue' : 'text-shein-dark'
                                }`}
                        >
                            <div className="relative">
                                <Icon
                                    size={22}
                                    className={isActive ? 'fill-shein-blue/10' : ''}
                                />
                                {tab.id === 'cart' && (
                                    <span className="absolute -top-2 -right-2.5 bg-shein-blue text-white text-[9px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center border-2 border-white px-0.5 shadow-sm">
                                        0
                                    </span>
                                )}
                            </div>
                            <span className="text-[9px] font-bold tracking-tight">{tab.label}</span>
                            {isActive && (
                                <div className="absolute top-0 w-12 h-1 bg-shein-blue rounded-full opacity-10" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
