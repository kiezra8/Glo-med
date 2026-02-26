import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, ArrowLeft, Calendar, Filter, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
    const { isAdmin } = useAuth();
    const [timeRange, setTimeRange] = useState('week'); // 'week' | 'month'

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
                <ShieldAlert size={48} className="text-red-500 mb-4" />
                <h2 className="text-xl font-black uppercase tracking-widest text-shein-dark">Access Denied</h2>
                <p className="text-gray-500 mt-2 text-sm">You do not have administrative privileges to view financial data.</p>
                <button
                    onClick={() => window.location.href = '#/profile'}
                    className="mt-8 bg-shein-dark text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs"
                >
                    Return to Profile
                </button>
            </div>
        );
    }

    // Mock Data simulating Firebase aggregates
    const weeklyData = [
        { name: 'Mon', revenue: 450000, orders: 12 },
        { name: 'Tue', revenue: 520000, orders: 15 },
        { name: 'Wed', revenue: 380000, orders: 9 },
        { name: 'Thu', revenue: 650000, orders: 22 },
        { name: 'Fri', revenue: 890000, orders: 35 },
        { name: 'Sat', revenue: 1200000, orders: 48 },
        { name: 'Sun', revenue: 950000, orders: 38 },
    ];

    const monthlyData = [
        { name: 'Week 1', revenue: 2100000, orders: 85 },
        { name: 'Week 2', revenue: 3400000, orders: 125 },
        { name: 'Week 3', revenue: 2800000, orders: 95 },
        { name: 'Week 4', revenue: 5040000, orders: 179 },
    ];

    const currentData = timeRange === 'week' ? weeklyData : monthlyData;

    // Derived Metrics
    const totalRevenue = currentData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalOrders = currentData.reduce((acc, curr) => acc + curr.orders, 0);
    const avgOrderValue = Math.round(totalRevenue / totalOrders);

    // Hardcoded delta for demonstration of visual balance progress vs decline
    const revenueProgress = timeRange === 'week' ? 18.5 : 42.3;
    const isRevenueUp = revenueProgress > 0;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-gray-100 flex flex-col gap-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{label}</p>
                    <p className="text-xs font-black text-shein-blue">
                        UGX {payload[0].value.toLocaleString()}
                    </p>
                    {payload[1] && (
                        <p className="text-[10px] font-bold text-gray-400">
                            {payload[1].value} Orders
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-shein-light min-h-screen pb-24">
            {/* Header */}
            <div className="bg-shein-dark text-white px-4 py-6 rounded-b-[32px] shadow-lg sticky top-0 z-20">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => window.location.href = '#/profile'}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-sm font-black uppercase tracking-[3px]">Financial Dashboard</h1>
                    <div className="w-8" /> {/* Spacer */}
                </div>

                {/* Primary Metric */}
                <div className="flex flex-col items-center text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1.5">
                        <DollarSign size={12} /> Total Cash Flow
                    </span>
                    <h2 className="text-4xl font-black tracking-tighter mb-3">
                        <span className="text-lg opacity-50 mr-1">UGX</span>
                        {totalRevenue.toLocaleString()}
                    </h2>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isRevenueUp ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-red-500/20 text-red-500'
                        }`}>
                        {isRevenueUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {Math.abs(revenueProgress)}% vs last {timeRange}
                    </div>
                </div>
            </div>

            <div className="px-4 mt-[-16px] relative z-20">
                {/* Secondary Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-4 rounded-[24px] shadow-sm flex flex-col items-start relative overflow-hidden group">
                        <div className="w-8 h-8 rounded-full bg-shein-blue/10 flex items-center justify-center text-shein-blue mb-3">
                            <ShoppingBag size={14} />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Orders</span>
                        <span className="text-xl font-black text-shein-dark">{totalOrders}</span>
                        <div className="absolute -bottom-2 -right-2 text-shein-light group-hover:scale-110 transition-transform">
                            <ShoppingBag size={64} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-[24px] shadow-sm flex flex-col items-start relative overflow-hidden group">
                        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-3">
                            <TrendingUp size={14} />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Avg Order Value</span>
                        <span className="text-xl font-black text-shein-dark">
                            <span className="text-[10px] text-gray-400 mr-1">UGX</span>
                            {avgOrderValue.toLocaleString()}
                        </span>
                        <div className="absolute -bottom-2 -right-2 text-shein-light group-hover:scale-110 transition-transform">
                            <TrendingUp size={64} />
                        </div>
                    </div>
                </div>

                {/* Main Chart Section */}
                <div className="bg-white rounded-[32px] p-5 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-shein-dark">Revenue Trend</h3>
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest">Progress over time</p>
                        </div>
                        <div className="flex bg-shein-light p-1 rounded-full border border-gray-50">
                            <button
                                onClick={() => setTimeRange('week')}
                                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${timeRange === 'week' ? 'bg-white text-shein-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setTimeRange('month')}
                                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${timeRange === 'month' ? 'bg-white text-shein-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Month
                            </button>
                        </div>
                    </div>

                    <div className="h-[240px] w-full ml-[-20px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#222222" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#222222" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A0AEC0', fontSize: 10, fontWeight: 800, fontFamily: 'custom-font' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A0AEC0', fontSize: 10, fontWeight: 800, fontFamily: 'custom-font' }}
                                    tickFormatter={(val) => `UGX ${(val / 1000)}k`}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '3 3' }} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#222222"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Volume Bar Chart */}
                <div className="bg-white rounded-[32px] p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-shein-dark">Order Volume</h3>
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest">Daily breakdown</p>
                        </div>
                    </div>

                    <div className="h-[180px] w-full ml-[-20px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={currentData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A0AEC0', fontSize: 10, fontWeight: 800, fontFamily: 'custom-font' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A0AEC0', fontSize: 10, fontWeight: 800, fontFamily: 'custom-font' }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8f9fa' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="orders" fill="#222222" radius={[4, 4, 0, 0]} barSize={timeRange === 'month' ? 32 : 16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
