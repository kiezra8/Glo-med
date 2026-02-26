import React from 'react';
import { Home, LayoutGrid, Sparkles, MessageCircle, User, ShoppingBag, Search, ChevronLeft } from 'lucide-react';

const Header = ({ currentPage, onPageChange }) => {
    const showSearch = ['home', 'categories'].includes(currentPage);
    const isRootPage = ['home', 'categories', 'news', 'cart', 'profile'].includes(currentPage);

    return (
        <header className="px-4 pt-4 pb-2 bg-white sticky top-0 z-50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {!isRootPage && (
                        <button onClick={() => window.history.back()} className="p-1 -ml-2 text-shein-dark">
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <div className="font-black text-2xl uppercase tracking-tighter text-shein-blue">
                        GLO-MED
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => onPageChange('cart')} className="relative text-shein-dark">
                        <ShoppingBag size={24} />
                        <span className="absolute -top-1 -right-1.5 bg-shein-blue text-white text-[8px] font-bold min-w-[14px] h-3.5 rounded-full flex items-center justify-center border border-white px-0.5">
                            0
                        </span>
                    </button>
                    <button onClick={() => onPageChange('profile')} className="text-shein-dark">
                        <User size={24} />
                    </button>
                </div>
            </div>

            {showSearch && (
                <div className="bg-gray-100 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-shein-blue/10">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Medical supplies, drugs, equipment..."
                        className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-shein-dark placeholder:text-gray-400 font-medium"
                    />
                </div>
            )}
        </header>
    );
};

export default Header;
