import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs, onSnapshot } from 'firebase/firestore';

export const useAppData = () => {
    const [categories, setCategories] = useState([]);
    const [newsPosts, setNewsPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories
                const catQuery = query(collection(db, 'categories'));
                const catSnapshot = await getDocs(catQuery);
                const cats = catSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Fetch Subcategories
                const subQuery = query(collection(db, 'subcategories'));
                const subSnapshot = await getDocs(subQuery);
                const subs = subSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Fetch Products (Initially just for trending)
                const prodQuery = query(collection(db, 'products'));
                const prodSnapshot = await getDocs(prodQuery);
                const prods = prodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Link them up
                const detailedCategories = cats.map(cat => ({
                    ...cat,
                    subcategories: subs.filter(s => s.category_id === cat.id).map(sub => ({
                        ...sub,
                        products: prods.filter(p => p.subcategory_id === sub.id)
                    }))
                }));

                setCategories(detailedCategories);

                // Fetch News
                const newsQuery = query(collection(db, 'news'), orderBy('timestamp', 'desc'));
                const newsSnapshot = await getDocs(newsQuery);
                setNewsPosts(newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                setLoading(false);
            } catch (err) {
                console.error("Error fetching app data:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { categories, newsPosts, loading, error };
};
