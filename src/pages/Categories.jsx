import React, { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import { LayoutGrid, ChevronRight, Package, ShoppingBag, ChevronLeft, Plus, Edit2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import AdminImageUpload from '../components/AdminImageUpload';
import AdminDataModal from '../components/AdminDataModal';

const Categories = () => {
    const { categories, loading } = useAppData();
    const { isAdmin } = useAuth();
    const { addToCart } = useCart();
    const [selectedCat, setSelectedCat] = useState(null);
    const [selectedSubCat, setSelectedSubCat] = useState(null);
    const [addedStates, setAddedStates] = useState({});

    // Admin Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'product',
        mode: 'add',
        initialData: null,
        parentId: null
    });

    const activeCategory = selectedCat || (categories.length > 0 ? categories[0] : null);

    const openModal = (type, mode, initialData = null, parentId = null) => {
        setModalConfig({ isOpen: true, type, mode, initialData, parentId });
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        addToCart(product);
        setAddedStates(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedStates(prev => ({ ...prev, [product.id]: false }));
        }, 2000);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header stays exactly the same */}
            <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xs font-black uppercase tracking-widest text-shein-blue">All Departments</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-shein-green rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Live Updates</span>
                </div>
            </div>

            <div className="flex h-[calc(100vh-120px)] overflow-hidden">
                {/* Sidebar Nav - ENLARGED */}
                <div className="w-32 bg-gray-50 flex-shrink-0 overflow-y-auto hide-scrollbar border-r border-gray-100 pb-20">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="p-4 border-b border-gray-100 bg-white">
                                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto animate-pulse" />
                            </div>
                        ))
                    ) : (
                        categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setSelectedCat(cat);
                                    setSelectedSubCat(null); // Reset drill-down
                                }}
                                className={`w-full p-4 flex flex-col items-center gap-3 transition-all relative ${activeCategory?.id === cat.id ? 'bg-white py-6' : 'grayscale opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <div className={`w-[72px] aspect-[4/5] rounded-[20px] overflow-hidden border-2 ${activeCategory?.id === cat.id ? 'border-shein-blue shadow-xl shadow-shein-blue/20 scale-105' : 'border-transparent'
                                    }`}>
                                    <img src={cat.image} className="w-full h-full object-cover" alt="" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-[1.1] px-1 ${activeCategory?.id === cat.id ? 'text-shein-blue' : 'text-gray-400'
                                    }`}>
                                    {cat.name}
                                </span>
                                {activeCategory?.id === cat.id && (
                                    <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-shein-blue rounded-r-full" />
                                )}
                            </button>
                        ))
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 hide-scrollbar bg-white pb-24">
                    {activeCategory && (
                        <div className="space-y-6">

                            {/* Drill-down View: If a Subcategory is picked, show its products */}
                            {selectedSubCat ? (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <button
                                        onClick={() => setSelectedSubCat(null)}
                                        className="flex items-center gap-1 text-shein-dark mb-4 sticky top-0 bg-white/95 backdrop-blur-md py-3 z-10 w-full"
                                    >
                                        <ChevronLeft size={24} className="text-shein-dark" />
                                        <span className="text-xs font-black uppercase tracking-widest">Back to Collections</span>
                                    </button>

                                    <div className="flex items-center justify-between mb-6 px-1">
                                        <h3 className="text-xl font-black uppercase tracking-tighter text-shein-dark">{selectedSubCat.name}</h3>
                                        {isAdmin && (
                                            <button
                                                onClick={() => openModal('product', 'add', null, selectedSubCat.id)}
                                                className="bg-shein-dark text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md hover:bg-black active:scale-95 transition-all"
                                            >
                                                <Plus size={12} /> Add Product
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {(selectedSubCat.products || []).length > 0 ? (
                                            (selectedSubCat.products || []).map((p) => (
                                                <div key={p.id} className="group cursor-pointer">
                                                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-shein-light mb-3 relative shadow-sm border border-gray-50 p-2 group-hover:shadow-md transition-shadow">
                                                        {isAdmin && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); openModal('product', 'edit', p, selectedSubCat.id); }}
                                                                className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-shein-dark shadow-sm z-10 hover:text-shein-blue transition-colors"
                                                            >
                                                                <Edit2 size={12} />
                                                            </button>
                                                        )}
                                                        <img src={p.image} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                                                        {p.discount && (
                                                            <div className="absolute top-4 left-4 bg-[#FF4545] text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-sm">
                                                                -{p.discount}%
                                                            </div>
                                                        )}
                                                        <button
                                                            onClick={(e) => handleAddToCart(e, p)}
                                                            className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${addedStates[p.id] ? 'bg-shein-green text-white scale-110' : 'bg-white/90 backdrop-blur-sm text-shein-dark hover:bg-shein-blue hover:text-white'
                                                                }`}
                                                        >
                                                            {addedStates[p.id] ? <CheckCircle2 size={16} /> : <ShoppingBag size={14} />}
                                                        </button>
                                                    </div>
                                                    <div className="px-2">
                                                        <h4 className="text-xs font-black uppercase tracking-tighter text-shein-dark line-clamp-2 leading-tight mb-1.5">{p.name}</h4>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-black text-[#FF4545]">UGX {p.price?.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-2 py-16 flex flex-col items-center justify-center text-center bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-100">
                                                <Package size={36} className="text-gray-300 mb-4" />
                                                <p className="text-xs font-black uppercase tracking-widest text-gray-400">No products added yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Standard Category View */
                                <div className="animate-in fade-in duration-300">
                                    {/* Main Banner */}
                                    <div className="relative h-44 rounded-3xl overflow-hidden group shadow-sm mb-8">
                                        {isAdmin && (
                                            <AdminImageUpload
                                                collectionName="categories"
                                                documentId={activeCategory.id}
                                                className="top-3 right-3"
                                            />
                                        )}
                                        <img src={activeCategory.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-6">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-white text-2xl font-black uppercase tracking-tighter">{activeCategory.name}</h3>
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => openModal('category', 'edit', activeCategory, null)}
                                                        className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-shein-dark transition-all"
                                                    >
                                                        <Edit2 size={12} />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-white/90 text-[10px] uppercase font-black tracking-widest mt-2 bg-black/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                                                <Sparkles size={12} /> Special Collections
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subcategories Grid - ENLARGED TO PERFECT SQUARES */}
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[11px] font-black uppercase tracking-widest text-shein-dark px-1">Shop by Type</h3>
                                        {isAdmin && (
                                            <button
                                                onClick={() => openModal('subcategory', 'add', null, activeCategory.id)}
                                                className="text-[10px] font-black uppercase tracking-widest text-shein-blue flex items-center gap-1 hover:text-shein-dark transition-colors"
                                            >
                                                <Plus size={14} /> Add Category
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {(activeCategory.subcategories || []).map((sub) => (
                                            <div
                                                key={sub.id}
                                                className="group cursor-pointer active:scale-95 transition-transform"
                                                onClick={() => setSelectedSubCat(sub)}
                                            >
                                                {/* Adjusted to aspect-[4/5], image fully covers the card without padding */}
                                                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-shein-light mb-3 relative shadow-sm border border-gray-50 group-hover:border-shein-blue/20 transition-all group-hover:shadow-md">
                                                    {isAdmin && (
                                                        <AdminImageUpload
                                                            collectionName="subcategories"
                                                            documentId={sub.id}
                                                            className="top-2 right-2 scale-[0.85] origin-top-right z-20"
                                                        />
                                                    )}
                                                    <img src={sub.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                                </div>
                                                <div className="px-2 text-center flex items-center justify-center gap-2">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-xs font-black uppercase tracking-tighter text-shein-dark line-clamp-2 leading-tight mb-1">{sub.name}</span>
                                                        <span className="text-[9px] font-black text-shein-blue/60 uppercase tracking-widest bg-shein-blue/5 px-2 py-0.5 rounded-full">
                                                            {(sub.products || []).length} ITEMS
                                                        </span>
                                                    </div>
                                                    {isAdmin && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); openModal('subcategory', 'edit', sub, activeCategory.id); }}
                                                            className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-shein-blue/10 hover:text-shein-blue transition-colors ml-1"
                                                        >
                                                            <Edit2 size={10} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {!loading && (!activeCategory.subcategories || activeCategory.subcategories.length === 0) && (
                                            <div className="col-span-2 py-20 text-center bg-gray-50 rounded-[32px]">
                                                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Package size={32} className="text-gray-300" />
                                                </div>
                                                <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">No Collections Found</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <AdminDataModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                type={modalConfig.type}
                mode={modalConfig.mode}
                initialData={modalConfig.initialData}
                parentId={modalConfig.parentId}
            />
        </div>
    );
};
export default Categories;
