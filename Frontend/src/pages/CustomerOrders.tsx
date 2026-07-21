import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersByCustomer } from '../lib/api/orders';
import { Order } from '../lib/api/types';
import { Badge } from '../components/ui/Badge';
import { Award, ArrowRight } from 'lucide-react';

export const CustomerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrdersByCustomer();
    setOrders(data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="font-display text-3xl font-bold text-[#3F0F17]">My Acquisition History</h1>

      <div className="space-y-6">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={ord.image} alt={ord.productTitle} className="w-20 h-24 object-cover rounded border border-[#C9A227]" />
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#8A7A68]">{ord.id} • {ord.date}</span>
                <h3 className="font-display font-bold text-base text-[#3F0F17]">{ord.productTitle}</h3>
                <p className="text-xs text-[#8A7A68]">Artisan Weaver: {ord.weaverName}</p>
                <span className="font-display font-bold text-sm text-[#6B1E28] block">
                  ₹{ord.price.toLocaleString('en-IN')} (₹{ord.weaverPayout.toLocaleString('en-IN')} Direct Artisan Share)
                </span>
              </div>
            </div>

            <div className="space-y-2 text-right">
              <Badge variant="verified">Status: {ord.status}</Badge>
              <Link to={`/passport/${ord.qrId}`} className="block text-xs font-bold text-[#6B1E28] hover:underline flex items-center gap-1 justify-end">
                <Award className="w-4 h-4 text-[#C9A227]" /> View GI Passport →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
