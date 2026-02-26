import React from 'react';
import { MessageCircle, Phone, ArrowUpRight, ShieldCheck, HeartPulse } from 'lucide-react';

const Chat = () => {
    // Hidden phone number to prevent scraping but available to the system
    const supportNumber = '256756721820';

    const handleWhatsApp = () => {
        const message = encodeURIComponent("Hello! I'm interested in ordering medical supplies from GLO-MED.");
        window.open(`https://wa.me/${supportNumber}?text=${message}`, '_blank');
    };

    const handleCall = () => {
        window.location.href = `tel:+${supportNumber}`;
    };

    return (
        <div className="bg-shein-light min-h-screen flex flex-col pt-8 px-6 text-center">

            <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                <div className="w-24 h-24 bg-white shadow-xl shadow-shein-blue/5 rounded-[40px] flex items-center justify-center mb-8 relative">
                    <HeartPulse size={40} className="text-shein-blue" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-shein-green rounded-full flex items-center justify-center border-4 border-white">
                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                    </div>
                </div>

                <h1 className="text-2xl font-black uppercase tracking-tighter text-shein-dark mb-3">
                    We're Here to Help
                </h1>
                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed px-4 max-w-sm">
                    Connect with our medical supply experts instantly for orders, quotes, and support.
                </p>

                <div className="w-full max-w-sm space-y-4 mt-12">
                    <button
                        onClick={handleWhatsApp}
                        className="w-full bg-[#25D366] text-white p-5 rounded-3xl flex items-center justify-between group active:scale-95 transition-all shadow-lg shadow-[#25D366]/20"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                <MessageCircle size={24} className="text-white fill-white" />
                            </div>
                            <div className="text-left">
                                <div className="text-[13px] font-black uppercase tracking-widest leading-tight">Chat on WhatsApp</div>
                                <div className="text-[9px] font-bold text-white/80 uppercase tracking-[2px] mt-0.5">Fastest Response</div>
                            </div>
                        </div>
                        <ArrowUpRight size={20} className="text-white/50 group-hover:text-white transition-colors" />
                    </button>

                    <button
                        onClick={handleCall}
                        className="w-full bg-white text-shein-dark p-5 rounded-3xl flex items-center justify-between group active:scale-95 transition-all shadow-sm border border-gray-100 hover:border-shein-blue/30"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-shein-blue/10 transition-colors">
                                <Phone size={24} className="text-shein-dark group-hover:text-shein-blue transition-colors" />
                            </div>
                            <div className="text-left">
                                <div className="text-[13px] font-black uppercase tracking-widest leading-tight">Call Support</div>
                                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] mt-0.5">Available 24/7</div>
                            </div>
                        </div>
                        <ArrowUpRight size={20} className="text-gray-300 group-hover:text-shein-blue transition-colors" />
                    </button>
                </div>
            </div>

            <div className="pb-24 flex items-center justify-center gap-2 opacity-60">
                <ShieldCheck size={16} className="text-shein-blue" />
                <span className="text-[9px] font-black uppercase tracking-[3px] text-gray-500">Secure Medical Network</span>
            </div>
        </div>
    );
};

export default Chat;
