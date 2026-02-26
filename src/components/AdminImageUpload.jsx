import React, { useState, useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const AdminImageUpload = ({ collectionName, documentId, className }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            // 1. Upload to Cloudinary
            const imageUrl = await uploadToCloudinary(file, 'glo-med-admin');

            // 2. Update Firestore Document with new image URL
            const docRef = doc(db, collectionName, documentId);
            await updateDoc(docRef, { image: imageUrl });

            // 3. Force reload to show changes (since app uses getDocs currently)
            window.location.reload();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image. Please try again.');
            setUploading(false);
        }
    };

    return (
        <div className={`absolute z-10 ${className}`}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    fileInputRef.current?.click();
                }}
                disabled={uploading}
                className="w-8 h-8 md:w-10 md:h-10 bg-shein-blue/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center border-2 border-white text-white hover:scale-110 transition-transform active:scale-90"
            >
                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
            </button>
        </div>
    );
};

export default AdminImageUpload;
