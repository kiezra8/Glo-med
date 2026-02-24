import React, { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import { LayoutGrid, ChevronRight, Package, ShoppingBag } from 'lucide-react';

const Categories = () => {
    const { categories, loading } = useAppData();
    const [selectedCat, setSelectedCat] = useState(null);

    const activeCategory = selectedCat || (categories.length > 0 ? categories[0] : null);

    return (
        <div className="bg-white min-h-screen">
            <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xs font-black uppercase tracking-widest text-shein-blue">All Departments</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-shein-green rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Live Updates</span>
                </div>
            </div>

            <div className="flex h-[calc(100vh-120px)] overflow-hidden">
                {/* Sidebar Nav */}
                <div className="w-28 bg-gray-50 flex-shrink-0 overflow-y-auto hide-scrollbar border-r border-gray-100">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="p-4 border-b border-gray-100 bg-white">
                                <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto animate-pulse" />
                            </div>
                        ))
                    ) : (
                        categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCat(cat)}
                                className={`w-full p-4 flex flex-col items-center gap-2 transition-all relative ${activeCategory?.id === cat.id ? 'bg-white' : 'grayscale opacity-70'
                                    }`}
                            >
                                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${activeCategory?.id === cat.id ? 'border-shein-blue shadow-lg shadow-shein-blue/20' : 'border-transparent'
                                    }`}>
                                    <img src={cat.image} className="w-full h-full object-cover" alt="" />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-tighter text-center leading-[1.1] ${activeCategory?.id === cat.id ? 'text-shein-blue' : 'text-gray-400'
                                    }`}>
                                    {cat.name}
                                </span>
                                {activeCategory?.id === cat.id && (
                                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-shein-blue rounded-r-full" />
                                )}
                            </button>
                        ))
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 hide-scrollbar bg-white">
                    {activeCategory && (
                        <div className="space-y-6">
                            {/* Banner Area */}
                            <div className="relative h-36 rounded-2xl overflow-hidden group">
                                <img src={activeCategory.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-4">
                                    <h3 className="text-white text-lg font-black uppercase tracking-tighter">{activeCategory.name}</h3>
                                    <div className="flex items-center gap-1 text-white/70 text-[10px] uppercase font-bold tracking-widest mt-1">
                                        <Sparkles size={12} /> Special Collections
                                    </div>
                                </div>
                            </div>

                            {/* Subcategories Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {(activeCategory.subcategories || []).map((sub) => (
                                    <div key={sub.id} className="group cursor-pointer">
                                        <div className="aspect-square rounded-2xl overflow-hidden bg-shein-light mb-2 relative shadow-sm border border-gray-50">
                                            <img src={sub.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="flex items-center justify-between px-1">
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-shein-dark flex-1 truncate pr-2">{sub.name}</span>
                                            <ChevronRight size={12} className="text-gray-300" />
                                        </div>
                                        <div className="px-1 mt-0.5">
                                            <span className="text-[8px] font-black text-shein-blue/60 uppercase tracking-widest">
                                                {(sub.products || []).length} ITEMS
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {!loading && (!activeCategory.subcategories || activeCategory.subcategories.length === 0) && (
                                    <div className="col-span-2 py-20 text-center">
                                        <div className="w-16 h-16 bg-shein-light rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package size={24} className="text-gray-300" />
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No Collections Found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Sparkles = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
);

export default Categories;
