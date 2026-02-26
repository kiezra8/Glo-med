import React, { useState, useRef } from 'react';
import { Camera, Loader2, X, Plus } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';
import { db } from '../lib/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

const AdminDataModal = ({
    isOpen,
    onClose,
    type, // 'category', 'subcategory', or 'product'
    mode, // 'add' or 'edit'
    initialData = null,
    parentId = null // categoryId for subcategories, subcategoryId for products
}) => {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(initialData?.image || null);

    // Form States
    const [name, setName] = useState(initialData?.name || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [oldPrice, setOldPrice] = useState(initialData?.oldPrice || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [discount, setDiscount] = useState(initialData?.discount || '');

    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = previewUrl;

            // 1. Upload new image to Cloudinary if a new file was selected
            if (imageFile) {
                imageUrl = await uploadToCloudinary(imageFile, 'glo-med-admin');
            }

            if (!imageUrl && mode === 'add') {
                throw new Error("An image is required!");
            }

            // 2. Prepare Data Object based on Type
            const dataToSave = {
                name,
                image: imageUrl,
                updatedAt: new Date().toISOString()
            };

            if (type === 'subcategory') {
                dataToSave.category_id = parentId;
            }

            if (type === 'product') {
                dataToSave.subcategory_id = parentId;
                dataToSave.price = Number(price);
                if (oldPrice) dataToSave.oldPrice = Number(oldPrice);
                if (discount) dataToSave.discount = Number(discount);
                if (description) dataToSave.description = description;
            }

            // 3. Save to Firestore Collections
            const collectionMap = {
                'category': 'categories',
                'subcategory': 'subcategories',
                'product': 'products'
            };
            const collectionName = collectionMap[type];

            if (mode === 'add') {
                dataToSave.createdAt = new Date().toISOString();
                await addDoc(collection(db, collectionName), dataToSave);
            } else if (mode === 'edit' && initialData) {
                await updateDoc(doc(db, collectionName, initialData.id), dataToSave);
            }

            // 4. Force reload to reflect fresh getDocs()
            window.location.reload();

        } catch (error) {
            console.error("Save Failed", error);
            alert(error.message || "Something went wrong saving the data.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] rounded-b-none sm:rounded-[40px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-shein-light">
                    <h3 className="text-sm font-black uppercase tracking-widest text-shein-dark flex items-center gap-2">
                        {mode === 'add' ? <Plus size={18} /> : null}
                        {mode} {type}
                    </h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh] no-scrollbar">

                    {/* Image Upload Area */}
                    <div className="mb-6 flex flex-col items-center">
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-32 h-32 rounded-[32px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group hover:border-shein-blue transition-colors"
                        >
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Camera size={28} className="text-gray-300 mb-2 group-hover:text-shein-blue transition-colors" />
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-4 text-center">Tap to Upload Photo</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Name</label>
                            <input
                                type="text" required value={name} onChange={e => setName(e.target.value)}
                                className="w-full bg-shein-light p-4 text-sm font-bold text-shein-dark rounded-2xl outline-none focus:ring-2 focus:ring-shein-blue/50"
                                placeholder={`Enter ${type} name`}
                            />
                        </div>

                        {type === 'product' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Current Price</label>
                                        <input
                                            type="number" required value={price} onChange={e => setPrice(e.target.value)}
                                            className="w-full bg-shein-light p-4 text-sm font-bold text-shein-dark rounded-2xl outline-none focus:ring-2 focus:ring-shein-blue/50"
                                            placeholder="UGX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Old Price (Optional)</label>
                                        <input
                                            type="number" value={oldPrice} onChange={e => setOldPrice(e.target.value)}
                                            className="w-full bg-shein-light p-4 text-sm font-bold text-shein-dark rounded-2xl outline-none focus:ring-2 focus:ring-shein-blue/50"
                                            placeholder="UGX"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Discount % (Optional)</label>
                                        <input
                                            type="number" value={discount} onChange={e => setDiscount(e.target.value)}
                                            className="w-full bg-shein-light p-4 text-sm font-bold text-shein-dark rounded-2xl outline-none focus:ring-2 focus:ring-shein-blue/50"
                                            placeholder="e.g. 20"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Description</label>
                                    <textarea
                                        rows="3" value={description} onChange={e => setDescription(e.target.value)}
                                        className="w-full bg-shein-light p-4 text-sm font-bold text-shein-dark rounded-3xl outline-none focus:ring-2 focus:ring-shein-blue/50 resize-none hide-scrollbar"
                                        placeholder="Enter product details..."
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-shein-blue text-white py-5 rounded-3xl font-black uppercase tracking-[2px] shadow-lg shadow-shein-blue/20 flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDataModal;
