import React from 'react';
import { useAppData } from '../hooks/useAppData';
import { User, MessageSquare, Heart, Share2, Play } from 'lucide-react';

const News = () => {
    const { newsPosts, loading } = useAppData();

    return (
        <div className="bg-shein-light min-h-screen">
            <div className="px-4 py-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <h2 className="text-xs font-black uppercase tracking-widest text-shein-blue">Health Hub</h2>
                <div className="flex items-center gap-1.5 bg-shein-blue/10 px-3 py-1.5 rounded-full">
                    <Sparkles size={12} className="text-shein-blue" />
                    <span className="text-[9px] font-black text-shein-blue uppercase tracking-widest">Community</span>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse shadow-sm">
                            <div className="h-48 bg-gray-100" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                                <div className="h-3 bg-gray-100 rounded w-full" />
                                <div className="h-3 bg-gray-100 rounded w-1/2" />
                            </div>
                        </div>
                    ))
                ) : (
                    newsPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-[32px] overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.04)] group active:scale-[0.99] transition-all">
                            {/* Post Header */}
                            <div className="flex items-center gap-3 p-4">
                                <div className="w-10 h-10 rounded-full bg-shein-blue/5 flex items-center justify-center border border-shein-blue/10">
                                    <User size={20} className="text-shein-blue" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-shein-dark text-[11px] uppercase tracking-tighter">Glo-Med Official</h3>
                                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-tighter">
                                        {post.time || '1 day ago'} • {post.views || '1.2k'} views
                                    </p>
                                </div>
                                <button className="p-2 text-gray-300 hover:text-shein-blue">
                                    <Share2 size={18} />
                                </button>
                            </div>

                            {/* Post Content */}
                            <div className="px-4 pb-3">
                                <h4 className="font-black text-[13px] text-shein-dark mb-1.5 leading-tight">{post.title}</h4>
                                <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-relaxed tracking-tight">
                                    {post.description}
                                </p>
                            </div>

                            {/* Post Media */}
                            <div className="relative aspect-video bg-gray-50 mx-2 mb-2 rounded-[24px] overflow-hidden">
                                <img src={post.image} className="w-full h-full object-cover" alt="" />
                                {post.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center pl-1 shadow-2xl">
                                            <Play size={20} className="text-shein-blue fill-current" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Post Interactions */}
                            <div className="flex items-center gap-8 px-6 py-4 border-t border-gray-50">
                                <button className="flex items-center gap-2 text-gray-400 hover:text-shein-blue transition-colors group/btn">
                                    <Heart size={18} className="group-hover/btn:fill-shein-blue" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#B0B0B0]">Like</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-shein-blue transition-colors">
                                    <MessageSquare size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#B0B0B0]">Talk</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const Sparkles = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
);

export default News;
