import React, { useState } from 'react';
import { User, LogOut, Camera, Star, CreditCard, Ticket, Settings, MapPin, Headphones, ShieldCheck, ChevronRight, Package, Truck, MessageSquare, Wallet, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { currentUser, login, signup, logout, isAdmin } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegistering) {
                if (!name) throw new Error("Please enter your name");
                await signup(email, password, name);
            } else {
                await login(email, password);
            }
        } catch (err) {
            setError(err.message || 'Failed to authenticate');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="bg-white min-h-screen flex flex-col p-8 pt-16 relative">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 bg-shein-light rounded-[40px] flex items-center justify-center mb-6">
                        <User size={40} className="text-shein-blue/50" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-shein-dark">
                        {isRegistering ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                        {isRegistering ? 'Join GLO-MED today' : 'Sign in to continue'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-2xl text-[11px] font-bold text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    {isRegistering && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-gray-50 border-none p-4 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-shein-blue w-full outline-none"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-gray-50 border-none p-4 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-shein-blue w-full outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-gray-50 border-none p-4 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-shein-blue w-full outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-shein-blue text-white py-5 rounded-2xl font-black uppercase tracking-[2px] shadow-lg shadow-shein-blue/20 mt-4 disabled:opacity-50 flex justify-center items-center active:scale-95 transition-transform"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (isRegistering ? 'Register' : 'Sign In')}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-4 p-2"
                    >
                        {isRegistering ? 'ALREADY HAVE AN ACCOUNT? SIGN IN' : 'NEW TO GLO-MED? REGISTER'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-shein-light min-h-screen">
            {/* Profile Header */}
            <div className="bg-white px-6 pt-10 pb-8 rounded-b-[48px] shadow-sm relative">
                {isAdmin && (
                    <button
                        onClick={() => window.location.href = '#/admin-dashboard'}
                        className="absolute top-4 right-6 bg-shein-blue px-3 py-1.5 rounded-full text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-shein-blue/30 flex items-center gap-1 hover:bg-shein-dark active:scale-95 transition-all"
                    >
                        <ShieldCheck size={12} /> View Dashboard
                    </button>
                )}
                <div className="flex items-center gap-5 mb-8 mt-2">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-[32px] bg-shein-blue/10 flex items-center justify-center border-4 border-shein-light shadow-sm overflow-hidden">
                            <User size={32} className="text-shein-blue" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-black text-shein-dark uppercase tracking-tight truncate">
                            {currentUser.displayName || 'User Name'}
                        </h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            {currentUser.email}
                        </p>
                    </div>
                    <button onClick={logout} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors active:scale-90">
                        <LogOut size={20} />
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-shein-light p-4 rounded-3xl flex flex-col items-center">
                        <span className="text-lg font-black text-shein-blue">0</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Wishlist</span>
                    </div>
                    <div className="bg-shein-light p-4 rounded-3xl flex flex-col items-center">
                        <span className="text-lg font-black text-shein-blue">0</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Coupons</span>
                    </div>
                    <div className="bg-shein-light p-4 rounded-3xl flex flex-col items-center">
                        <span className="text-lg font-black text-shein-blue">0</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Credits</span>
                    </div>
                </div>
            </div>

            {/* My Orders */}
            <div className="px-4 mt-8">
                <div className="bg-white rounded-[40px] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[11px] font-black uppercase tracking-[2px] text-shein-dark">My Orders</h3>
                        <button className="text-[10px] font-black text-shein-blue uppercase tracking-widest flex items-center gap-1">
                            History <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-shein-blue/5">
                                <Wallet size={20} className="text-shein-dark/40 group-hover:text-shein-blue/60" />
                            </div>
                            <span className="text-[9px] font-black text-shein-dark/50 uppercase tracking-tighter">Unpaid</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-shein-blue/5">
                                <Package size={20} className="text-shein-dark/40 group-hover:text-shein-blue/60" />
                            </div>
                            <span className="text-[9px] font-black text-shein-dark/50 uppercase tracking-tighter">Processing</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-shein-blue/5">
                                <Truck size={20} className="text-shein-dark/40 group-hover:text-shein-blue/60" />
                            </div>
                            <span className="text-[9px] font-black text-shein-dark/50 uppercase tracking-tighter">Shipped</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-shein-blue/5">
                                <MessageSquare size={20} className="text-shein-dark/40 group-hover:text-shein-blue/60" />
                            </div>
                            <span className="text-[9px] font-black text-shein-dark/50 uppercase tracking-tighter">Review</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Menu */}
            <div className="px-4 mt-6 mb-32">
                <div className="bg-white rounded-[40px] overflow-hidden shadow-sm p-2">
                    <MenuItem icon={MapPin} label="Shipping Address" />
                    <MenuItem icon={Headphones} label="Support Center" />
                    <MenuItem icon={Ticket} label="My Points" />
                    <MenuItem icon={ShieldCheck} label="Security" color="text-shein-blue" />
                    <MenuItem icon={Settings} label="App Settings" last />
                </div>
            </div>
        </div>
    );
};

const MenuItem = ({ icon: Icon, label, last, color = "text-shein-dark" }) => (
    <div className={`p-5 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors ${!last ? 'border-b border-gray-50' : ''}`}>
        <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-2xl bg-gray-50 ${color === 'text-shein-blue' ? 'bg-shein-blue/5' : ''}`}>
                <Icon size={18} className={color === 'text-shein-blue' ? 'text-shein-blue' : 'text-shein-dark/70'} />
            </div>
            <span className={`text-[11px] font-black uppercase tracking-widest ${color}`}>{label}</span>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
    </div>
);

export default Profile;
