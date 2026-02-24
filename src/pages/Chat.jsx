import React from 'react';
import { Send, User, ChevronLeft, MoreVertical, Camera } from 'lucide-react';

const Chat = () => {
    return (
        <div className="flex flex-col h-full bg-[#F5F5F5]">
            {/* Top Bar */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-shein-blue/5 flex items-center justify-center border border-shein-blue/10">
                            <User size={20} className="text-shein-blue" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-shein-green rounded-full border-2 border-white" />
                    </div>
                    <div>
                        <h3 className="font-black text-shein-dark text-[11px] uppercase tracking-tighter">Support Expert</h3>
                        <p className="text-[9px] text-shein-green font-black uppercase tracking-tighter">Always Online</p>
                    </div>
                </div>
                <button className="p-2 text-gray-400">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
                <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-gray-50">
                        <p className="text-[11px] text-shein-dark font-medium leading-relaxed">
                            Hello! Welcome to GLO-MED Support. How can we help you today?
                        </p>
                        <span className="text-[8px] text-gray-300 font-black uppercase mt-1 block">08:00 AM</span>
                    </div>
                </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-gray-100 pb-20">
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-shein-blue/10 transition-all">
                    <button className="text-gray-400">
                        <Camera size={20} />
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none p-2 text-xs focus:ring-0 text-shein-dark font-medium"
                    />
                    <button className="bg-shein-blue text-white p-2 rounded-full shadow-lg shadow-shein-blue/20 active:scale-90 transition-transform">
                        <Send size={16} fill="white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
