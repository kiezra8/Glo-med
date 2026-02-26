import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import News from './pages/News';
import Chat from './pages/Chat';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    const [currentRoute, setCurrentRoute] = useState('home');

    // Simple hash-based router
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#/', '') || 'home';
            setCurrentRoute(hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial check

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleNavigate = (pageId) => {
        window.location.hash = `#/${pageId}`;
    };

    const renderPage = () => {
        switch (currentRoute) {
            case 'home': return <Home onNavigate={handleNavigate} />;
            case 'categories': return <Categories />;
            case 'chat': return <Chat />;
            case 'cart': return <Cart />;
            case 'profile': return <Profile />;
            case 'admin-dashboard': return <AdminDashboard />;
            default: return <Home onNavigate={handleNavigate} />;
        }
    };

    return (
        <Layout currentPage={currentRoute} onPageChange={handleNavigate}>
            {renderPage()}
        </Layout>
    );
}

export default App;
