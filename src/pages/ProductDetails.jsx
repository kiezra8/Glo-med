import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronLeft, Star, Heart, Share2, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAppData } from '../hooks/useAppData';

const ProductDetails = () => {
    const { categories, loading } = useAppData();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        // Extract Product ID from URL hash: #/product_details/PRODUCT_ID
        const hash = window.location.hash;
        const parts = hash.split('/');
        const id = parts[parts.length - 1];

        if (id && categories.length > 0) {
            // Find the product across all categories and subcategories
            let foundProduct = null;
            for (const cat of categories) {
                if (cat.subcategories) {
                    for (const sub of cat.subcategories) {
                        if (sub.products) {
                            foundProduct = sub.products.find(p => p.id === id);
                            if (foundProduct) break;
                        }
                    }
                }
                if (foundProduct) break;
            }
            setProduct(foundProduct);
        }
    }, [categories]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-100 border-t-shein-blue rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-xl font-black uppercase text-shein-dark mb-4">Product Not Found</h2>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-shein-dark text-white rounded-full text-xs font-black uppercase tracking-widest"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-shein-light min-h-screen pb-28">
            {/* Header / Nav */}
            <div className="fixed top-0 w-full max-w-md z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => window.history.back()}
                    className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-shein-dark hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                    <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-shein-dark hover:bg-gray-100 transition-colors">
                        <Share2 size={18} />
                    </button>
                    <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-shein-dark hover:bg-gray-100 transition-colors">
                        <Heart size={18} />
                    </button>
                </div>
            </div>

            {/* Product Image */}
            <div className="w-full aspect-square bg-white relative mt-16">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                {product.discount && (
                    <div className="absolute bottom-4 left-4 bg-[#FF4545] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                        -{product.discount}% OFF
                    </div>
                )}
            </div>

            {/* Product Details Section */}
            <div className="px-5 py-6 bg-white rounded-t-[32px] -mt-8 relative shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">

                {/* Price & Title */}
                <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-black text-green-600">
                            UGX {product.price?.toLocaleString() || product.price}
                        </span>
                        {product.oldPrice && (
                            <span className="text-sm font-bold text-red-500 line-through">
                                UGX {product.oldPrice?.toLocaleString() || product.oldPrice}
                            </span>
                        )}
                    </div>
                    <h1 className="text-lg font-bold text-shein-dark leading-tight">{product.name}</h1>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                        <Star size={12} fill="#FFB800" className="text-[#FFB800] mr-1" />
                        <span className="text-xs font-black text-shein-dark">{product.rating || '4.8'}</span>
                    </div>
                    <span className="text-[11px] font-bold text-gray-400">
                        ({product.reviews || '100+'} verified reviews)
                    </span>
                    <div className="flex-1"></div>
                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                </div>

                {/* Description */}
                {product.description && (
                    <div className="mb-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[2px] text-shein-dark mb-3">Product Info</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                )}

                {/* Brand / Attributes */}
                {product.brand && (
                    <div className="mb-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[2px] text-shein-dark mb-3">Specifications</h4>
                        <div className="bg-gray-50 rounded-2xl p-4 flex gap-4">
                            <div>
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Brand</span>
                                <span className="text-sm font-black text-shein-dark">{product.brand}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Trust Badges */}
                <div className="bg-shein-light rounded-2xl p-4 grid grid-cols-2 gap-4 mt-8">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm"><Truck size={16} className="text-shein-green" /></div>
                        <div>
                            <span className="block text-[10px] font-black uppercase tracking-widest text-shein-dark mb-0.5">Fast Delivery</span>
                            <span className="text-[9px] text-gray-500 leading-tight block">Within 24 hours</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm"><ShieldCheck size={16} className="text-shein-blue" /></div>
                        <div>
                            <span className="block text-[10px] font-black uppercase tracking-widest text-shein-dark mb-0.5">Genuine Quality</span>
                            <span className="text-[9px] text-gray-500 leading-tight block">100% verified items</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 z-40 shadow-[0_-15px_40px_rgba(0,0,0,0.05)]">
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
    );
};

export default ProductDetails;
