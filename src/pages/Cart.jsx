import React from 'react';
import { ShoppingBag, ChevronRight, Truck, ShieldCheck, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
    const { cart: cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    const handleWhatsAppCheckout = () => {
        if (cartItems.length === 0) return;

        const total = getCartTotal();
        let message = `*New Order from Glo-Med App*%0A%0A`;

        cartItems.forEach((item, index) => {
            const itemPrice = typeof item.price === 'string'
                ? parseInt(item.price.replace(/,/g, ''), 10)
                : item.price;
            message += `${index + 1}. *${item.name}*%0A   Qty: ${item.quantity} x UGX ${itemPrice.toLocaleString()}%0A`;
            if (item.options && JSON.stringify(item.options) !== '{}') {
                message += `   Options: ${Object.entries(item.options).map(([k, v]) => `${k}: ${v}`).join(', ')}%0A`;
            }
            message += `%0A`;
        });

        message += `*Total Estimation: UGX ${total.toLocaleString()}*%0A%0A`;
        message += `Please process my order. Thank you!`;

        const phoneNumber = '+256756721820';
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    if (cartItems.length === 0) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center pb-24">
                <div className="w-32 h-32 bg-shein-light rounded-full flex items-center justify-center mb-10 relative">
                    <ShoppingBag size={48} className="text-gray-200" />
                    <div className="absolute top-2 right-2 w-6 h-6 bg-shein-blue/10 rounded-full animate-ping" />
                </div>
                <h2 className="text-base font-black uppercase tracking-widest text-shein-dark mb-3">Your bag is empty</h2>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest max-w-[200px] leading-relaxed mb-10">
                    Time to fill it with world-class medical essentials!
                </p>
                <button
                    onClick={() => window.location.href = '#/'}
                    className="w-full bg-shein-dark text-white py-5 rounded-full font-black uppercase tracking-[3px] shadow-2xl shadow-shein-dark/20 transition-all active:scale-[0.98]"
                >
                    Discover Items
                </button>
            </div>
        );
    }

    return (
        <div className="bg-shein-light min-h-screen pb-40">
            <div className="px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between">
                <h2 className="text-xs font-black uppercase tracking-widest text-shein-blue">Shopping Bag ({cartItems.length})</h2>
            </div>

            <div className="p-4 space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-[32px] p-4 shadow-sm flex gap-4 relative overflow-hidden group">
                        <div className="w-24 h-24 rounded-2xl bg-shein-light overflow-hidden flex-shrink-0 border border-gray-50 p-2">
                            <img src={item.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200"} className="w-full h-full object-cover rounded-xl" alt={item.name} />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                            <div>
                                <h3 className="text-[12px] font-black text-shein-dark uppercase tracking-tight line-clamp-2 leading-tight mb-1 pr-6">{item.name}</h3>
                                {(item.discount || item.brand) && (
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{item.brand || 'Premium'}</p>
                                )}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-sm font-black text-shein-blue gap-1 flex items-baseline">
                                    <span className="text-[9px]">UGX</span> {typeof item.price === 'string' ? parseInt(item.price.replace(/,/g, ''), 10).toLocaleString() : item.price?.toLocaleString()}
                                </span>
                                <div className="flex items-center bg-shein-light rounded-full p-1 border border-gray-100 gap-3 px-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity - 1); }}
                                        className="w-6 h-6 flex items-center justify-center text-shein-dark/30 hover:text-shein-blue transition-colors"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-xs font-black text-shein-dark min-w-[20px] text-center">{item.quantity}</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }}
                                        className="w-6 h-6 flex items-center justify-center text-shein-dark/30 hover:text-shein-blue transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                            className="absolute top-4 right-4 text-gray-200 hover:text-red-500 transition-colors bg-white/50 backdrop-blur-sm rounded-full p-1"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Trust Badges */}
            <div className="px-6 py-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><Truck size={18} className="text-shein-green" /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><ShieldCheck size={18} className="text-shein-blue" /></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Secure Order</span>
                </div>
            </div>

            {/* Checkout Bar */}
            <div className="fixed bottom-[70px] left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-6 z-40 shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-1">Total Estimation</span>
                        <span className="text-xl font-black text-shein-dark tracking-tighter">UGX {getCartTotal().toLocaleString()}</span>
                    </div>
                </div>
                <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-[#25D366] text-white py-4 rounded-full font-black uppercase tracking-[2px] shadow-xl shadow-[#25D366]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group text-sm"
                >
                    Order via WhatsApp
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default Cart;
