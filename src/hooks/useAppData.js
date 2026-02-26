import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

// Module-level cache to prevent redundant fetches across different components
let cachedCategories = null;
let cachedNewsPosts = null;
let fetchPromise = null;

export const useAppData = () => {
    const [categories, setCategories] = useState(cachedCategories || []);
    const [newsPosts, setNewsPosts] = useState(cachedNewsPosts || []);
    const [loading, setLoading] = useState(!cachedCategories);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If data is already cached, just return immediately
        if (cachedCategories && cachedNewsPosts) {
            setCategories(cachedCategories);
            setNewsPosts(cachedNewsPosts);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            // If another component already started the fetch, wait for it
            if (fetchPromise) {
                try {
                    await fetchPromise;
                    setCategories(cachedCategories);
                    setNewsPosts(cachedNewsPosts);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
                return;
            }

            // Otherwise, start the fetch and store the promise so others can wait on it
            fetchPromise = (async () => {
                try {
                    // Fetch Categories
                    const catQuery = query(collection(db, 'categories'));
                    const catSnapshot = await getDocs(catQuery);
                    const cats = catSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                    // Fetch Subcategories
                    const subQuery = query(collection(db, 'subcategories'));
                    const subSnapshot = await getDocs(subQuery);
                    const subs = subSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                    // Fetch Products
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

                    // Fetch News
                    const newsQuery = query(collection(db, 'news'), orderBy('timestamp', 'desc'));
                    const newsSnapshot = await getDocs(newsQuery);
                    const news = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                    // Save to module cache
                    cachedCategories = detailedCategories;
                    cachedNewsPosts = news;

                    return true;
                } catch (err) {
                    console.error("Error fetching app data:", err);
                    throw err;
                }
            })();

            try {
                await fetchPromise;
                setCategories(cachedCategories);
                setNewsPosts(cachedNewsPosts);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
                fetchPromise = null; // Reset promise so a clear/refresh could work later
            }
        };

        fetchData();
    }, []);

    // Provide a way to manually force a refetch if needed (e.g., after admin edit)
    const refetch = () => {
        cachedCategories = null;
        cachedNewsPosts = null;
        setLoading(true);
        // Next mount or dependency trigger would fetch again. 
        // For right now, a simple window.location.reload() in Admin calls already suffices.
    };

    return { categories, newsPosts, loading, error, refetch };
};
