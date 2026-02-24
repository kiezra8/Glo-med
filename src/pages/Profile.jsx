import React from 'react';
import { User, LogOut, Camera, Star, CreditCard, Ticket, Settings, MapPin, Headphones, ShieldCheck, ChevronRight, Package, Truck, MessageSquare, Wallet } from 'lucide-react';

const Profile = () => {
    const currentUser = null; // Will eventually use an Auth Context

    if (!currentUser) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-shein-light rounded-[40px] flex items-center justify-center mb-8 relative">
                    <User size={40} className="text-gray-200" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-shein-blue rounded-2xl flex items-center justify-center border-4 border-white">
                        <Plus size={16} className="text-white" />
                    </div>
                </div>
                <h2 className="text-lg font-black uppercase tracking-tighter text-shein-dark mb-2">Welcome to GLO-MED</h2>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-10 opacity-70">
                    Sign in for a personalized experience
                </p>
                <button className="w-full bg-shein-blue text-white py-5 rounded-full font-black uppercase tracking-[2px] shadow-2xl shadow-shein-blue/20">
                    Sign In / Register
                </button>
            </div>
        );
    }

    return (
        <div className="bg-shein-light min-h-screen">
            {/* Profile Header */}
            <div className="bg-white px-6 pt-10 pb-8 rounded-b-[48px] shadow-sm">
                <div className="flex items-center gap-5 mb-8">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-[32px] bg-shein-blue/10 flex items-center justify-center border-4 border-shein-light overflow-hidden">
                            <User size={32} className="text-shein-blue" />
                        </div>
                        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-2xl shadow-lg flex items-center justify-center text-shein-blue border border-gray-100">
                            <Camera size={14} />
                        </button>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-black text-shein-dark uppercase tracking-tight truncate">User Name</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Free Member • 0 Points</p>
                    </div>
                    <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors">
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

const Plus = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export default Profile;
