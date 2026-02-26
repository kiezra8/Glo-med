import React, { useState, useEffect } from 'react';
import { useAppData } from '../hooks/useAppData';
import { Sparkles, Zap, ChevronRight, Star, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminImageUpload from '../components/AdminImageUpload';

const Home = () => {
    const { categories, loading } = useAppData();
    const { isAdmin } = useAuth();
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            title: 'Fast Delivery',
            subtitle: 'Medical supplies in 2-4 hours',
            image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&fit=crop',
            gradient: 'from-shein-blue to-blue-600'
        },
        {
            title: 'New Arrivals',
            subtitle: 'FDA approved medications',
            image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&fit=crop',
            gradient: 'from-purple-600 to-indigo-600'
        },
        {
            title: 'Special Deals',
            subtitle: 'Up to 25% OFF bulk orders',
            image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&fit=crop',
            gradient: 'from-orange-500 to-red-500'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Extract all products for trending section
    const trendingProducts = categories
        .flatMap(cat => cat.subcategories || [])
        .flatMap(sub => sub.products || [])
        .slice(0, 20);

    return (
        <div className="pb-8">
            {/* Hero Carousel */}
            <div className="px-4 mt-2">
                <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg group">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                                }`}
                        >
                            <img src={slide.image} className="w-full h-full object-cover" alt="" />
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-60`} />
                            <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                                <span className="text-[10px] font-black uppercase tracking-[3px] opacity-80 mb-1">{slide.title}</span>
                                <h2 className="text-xl font-black uppercase leading-tight tracking-tighter max-w-[180px]">
                                    {slide.subtitle}
                                </h2>
                                <button className="mt-4 w-fit bg-white text-shein-dark text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Indicators */}
                    <div className="absolute bottom-4 left-6 flex gap-1.5">
                        {heroSlides.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Categories */}
            <div className="mt-8 px-4 overflow-x-auto hide-scrollbar flex gap-6">
                {loading ? (
                    Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 min-w-[64px]">
                            <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse" />
                            <div className="w-12 h-2 bg-gray-100 rounded animate-pulse" />
                        </div>
                    ))
                ) : (
                    categories.map((cat) => (
                        <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[64px] group cursor-pointer">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-shein-blue transition-all">
                                <img src={cat.image} className="w-full h-full object-cover" alt={cat.name} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500 group-hover:text-shein-blue">
                                {cat.name}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {/* Flash Deals / Trending Products */}
            <div className="mt-10 px-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-shein-blue p-1.5 rounded-lg text-white">
                            <Zap size={16} fill="white" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-shein-dark">Flash Deals</h3>
                    </div>
                    <button className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        View All <ChevronRight size={14} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-3 shadow-sm aspect-[4/5] animate-pulse">
                                <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4" />
                                <div className="space-y-2">
                                    <div className="h-2 bg-gray-100 rounded w-full" />
                                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : trendingProducts.length > 0 ? (
                        trendingProducts.map((p) => (
                            <div key={p.id} className="bg-white rounded-lg overflow-hidden group active:scale-[0.98] transition-all duration-200">
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F6]">
                                    {isAdmin && (
                                        <AdminImageUpload
                                            collectionName="products"
                                            documentId={p.id}
                                            className="top-1 left-1 scale-75 origin-top-left"
                                        />
                                    )}
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} />
                                    {p.discount && (
                                        <div className="absolute top-0 left-0 bg-[#FF4545] text-white text-[10px] font-black px-2 py-0.5 rounded-br-lg">
                                            -{p.discount}%
                                        </div>
                                    )}
                                    <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-shein-dark shadow-sm hover:bg-shein-blue hover:text-white transition-colors">
                                        <ShoppingBag size={14} />
                                    </button>
                                </div>
                                <div className="p-2 space-y-1">
                                    <h4 className="text-[11px] text-gray-800 leading-tight line-clamp-2 h-7 font-medium">{p.name}</h4>
                                    <div className="flex items-baseline gap-1.5 flex-wrap">
                                        <span className="text-[13px] font-black text-[#222222]">UGX {p.price}</span>
                                        {p.oldPrice && (
                                            <span className="text-[10px] text-gray-400 line-through">UGX {p.oldPrice}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={8} fill={i < Math.floor(p.rating || 4.5) ? "#222" : "none"} className={i < Math.floor(p.rating || 4.5) ? "text-[#222]" : "text-gray-300"} />
                                            ))}
                                        </div>
                                        <span className="text-[9px] text-gray-400 font-bold">({p.reviews || '100+'})</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 py-10 text-center text-gray-400 text-xs font-black uppercase tracking-widest bg-shein-light rounded-2xl">
                            No products found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
