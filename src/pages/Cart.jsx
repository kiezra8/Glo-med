import React from 'react';
import { ShoppingBag, ChevronRight, Truck, ShieldCheck, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    // Pull from local UI state for now, but in reality would use a CartContext
    const cartItems = [];
    const totals = 0;

    if (cartItems.length === 0) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center">
                <div className="w-32 h-32 bg-shein-light rounded-full flex items-center justify-center mb-10 relative">
                    <ShoppingBag size={48} className="text-gray-200" />
                    <div className="absolute top-2 right-2 w-6 h-6 bg-shein-blue/10 rounded-full animate-ping" />
                </div>
                <h2 className="text-base font-black uppercase tracking-widest text-shein-dark mb-3">Your bag is empty</h2>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest max-w-[200px] leading-relaxed mb-10">
                    Time to fill it with world-class medical essentials!
                </p>
                <button className="w-full bg-shein-dark text-white py-5 rounded-full font-black uppercase tracking-[3px] shadow-2xl shadow-shein-dark/20 transition-all active:scale-[0.98]">
                    Discover Items
                </button>
            </div>
        );
    }

    return (
        <div className="bg-shein-light min-h-screen pb-40">
            <div className="px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between">
                <h2 className="text-xs font-black uppercase tracking-widest text-shein-blue">Shopping Bag ({cartItems.length})</h2>
                <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select All</button>
            </div>

            <div className="p-4 space-y-4">
                {/* Placeholder for Cart Item */}
                <div className="bg-white rounded-[32px] p-4 shadow-sm flex gap-4 relative overflow-hidden group">
                    <div className="w-24 h-24 rounded-2xl bg-shein-light overflow-hidden flex-shrink-0 border border-gray-50 p-2">
                        <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200" className="w-full h-full object-contain" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                            <h3 className="text-[12px] font-black text-shein-dark uppercase tracking-tight line-clamp-2 leading-tight mb-1">Advanced Surgical Kit</h3>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Sterile • Certified</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-base font-black text-shein-blue">UGX 150,000</span>
                            <div className="flex items-center bg-shein-light rounded-full p-1 border border-gray-100 gap-3 px-2">
                                <button className="w-6 h-6 flex items-center justify-center text-shein-dark/30 hover:text-shein-blue"><Minus size={14} /></button>
                                <span className="text-xs font-black text-shein-dark min-w-[20px] text-center">1</span>
                                <button className="w-6 h-6 flex items-center justify-center text-shein-dark/30 hover:text-shein-blue"><Plus size={14} /></button>
                            </div>
                        </div>
                    </div>
                    <button className="absolute top-4 right-4 text-gray-200 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="px-6 py-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><Truck size={18} className="text-shein-green" /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><ShieldCheck size={18} className="text-shein-blue" /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Secure Payment</span>
                </div>
            </div>

            {/* Checkout Bar */}
            <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-6 z-40 shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-1">Total Estimation</span>
                        <span className="text-xl font-black text-shein-dark tracking-tighter">UGX 0</span>
                    </div>
                    <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-shein-green/10 text-shein-green text-[9px] font-black uppercase rounded-full tracking-widest">Saved 10% Today</span>
                    </div>
                </div>
                <button className="w-full bg-shein-blue text-white py-5 rounded-full font-black uppercase tracking-[3px] shadow-xl shadow-shein-blue/25 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
                    Secure Checkout
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default Cart;
