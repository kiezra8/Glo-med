import React, { useState } from 'react';
import { ShoppingBag, X, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm sm:p-4 animate-in fade-in duration-300">
            <div
                className="bg-white w-full max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col pt-2 sm:pt-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header (Mobile drag handle purely visual) */}
                <div className="flex justify-center sm:hidden mb-2">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
                </div>

                <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md border-b border-gray-100 sm:rounded-t-3xl">
                    <h3 className="text-sm font-black uppercase tracking-widest text-shein-dark">Product Details</h3>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-shein-dark hover:bg-gray-100 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="overflow-y-auto hide-scrollbar flex-1 relative bg-shein-light">
                    {/* Image Section */}
                    <div className="w-full aspect-square bg-white relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {product.discount && (
                            <div className="absolute top-4 left-4 bg-[#FF4545] text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-sm">
                                -{product.discount}%
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="px-5 py-6 bg-white rounded-t-3xl -mt-6 relative shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <h2 className="text-xl font-black text-shein-dark leading-tight">{product.name}</h2>
                            <div className="flex flex-col items-end text-right">
                                <span className="text-xl font-black text-green-600 whitespace-nowrap">
                                    UGX {product.price?.toLocaleString()}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-sm text-red-500 line-through whitespace-nowrap">
                                        UGX {product.oldPrice?.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < Math.floor(product.rating || 4.5) ? "#222" : "none"}
                                        className={i < Math.floor(product.rating || 4.5) ? "text-[#222]" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-gray-400 block pt-0.5">
                                ({product.reviews || '100+'} reviews)
                            </span>
                        </div>

                        {product.description && (
                            <div className="mb-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-shein-dark mb-2">Description</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {product.brand && (
                            <div className="mb-6 flex gap-4">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-shein-dark mb-1">Brand</h4>
                                    <span className="text-sm font-bold text-gray-700">{product.brand}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 z-10 pb-8 sm:pb-4">
                    <button
                        onClick={handleAddToCart}
                        className={`w-full py-4 rounded-full font-black uppercase tracking-[2px] shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-sm ${added
                                ? 'bg-green-600 text-white shadow-green-600/25'
                                : 'bg-green-600 text-white shadow-green-600/25 hover:bg-green-700'
                            }`}
                    >
                        {added ? (
                            <>
                                <CheckCircle2 size={18} />
                                Added to Bag
                            </>
                        ) : (
                            <>
                                <ShoppingBag size={18} />
                                Add to Cart
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
