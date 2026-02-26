import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import News from './pages/News';
import Chat from './pages/Chat';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <Home />;
            case 'categories': return <Categories />;
            case 'chat': return <Chat />;
            case 'cart': return <Cart />;
            case 'profile': return <Profile />;
            default: return <Home />;
        }
    };

    return (
        <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
            {renderPage()}
        </Layout>
    );
}

export default App;
