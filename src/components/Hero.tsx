import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Globe, MessageSquare, Phone, CreditCard, Wifi } from 'lucide-react';

const DATA_PLANS = [
  { label: '1GB', price: 5.50 },
  { label: '2GB', price: 11.00 },
  { label: '3GB', price: 16.50 },
  { label: '4GB', price: 22.00 },
  { label: '5GB', price: 26.00 },
  { label: '10GB', price: 50.00 },
  { label: '15GB', price: 74.00 },
  { label: '20GB', price: 88.00 },
  { label: '25GB', price: 110.00 },
  { label: '30GB', price: 133.00 },
  { label: '40GB', price: 170.00 },
  { label: '50GB', price: 210.00 },
];

export default function Hero() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedPlan = DATA_PLANS[selectedPlanIndex];

  return (
    <section className="px-12 py-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center max-w-[1440px] mx-auto">
      <div className="hero-content">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[3.5rem] leading-[1.1] font-extrabold mb-6 tracking-[-0.04em]"
        >
          Premium Data <br />
          <span className="text-primary text-blue-600">at Local Prices.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-text-muted leading-relaxed mb-8 max-w-[500px]"
        >
          Connect instantly with the most reliable data marketplace. High speed, low cost, 100% automated delivery to any network.
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex items-start gap-3">
            <div className="icon-box">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[0.95rem] font-bold mb-1">Instant Delivery</h4>
              <p className="text-[0.8rem] text-text-muted">Receive your data in less than 30 seconds.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="icon-box">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[0.95rem] font-bold mb-1">Secure Wallet</h4>
              <p className="text-[0.8rem] text-text-muted">Bank-grade encryption for all transactions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="icon-box">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[0.95rem] font-bold mb-1">Multi-Network</h4>
              <p className="text-[0.8rem] text-text-muted">All major providers supported globally.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="icon-box">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[0.95rem] font-bold mb-1">24/7 Support</h4>
              <p className="text-[0.8rem] text-text-muted">Human assistance whenever you need it.</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="card-sleek p-8"
      >
        <h3 className="text-xl font-bold mb-6">Quick Top-up</h3>
        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted mb-2">
              <Wifi className="w-4 h-4" />
              Select Network
            </label>
            <select className="w-full p-3 rounded-xl border border-border bg-bg text-text-main outline-none focus:ring-2 focus:ring-primary/20 transition-all">
              <option>MTN</option>
              <option>AirtelTigo</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted mb-2">
              <CreditCard className="w-4 h-4" />
              Data Plan
            </label>
            <select 
              value={selectedPlanIndex}
              onChange={(e) => setSelectedPlanIndex(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-border bg-bg text-text-main outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              {DATA_PLANS.map((plan, index) => (
                <option key={index} value={index}>
                  {plan.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted mb-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input type="text" placeholder="024 123 4567" className="w-full p-3 rounded-xl border border-border bg-bg text-text-main outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
          
          <div className="bg-primary-soft rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm font-medium text-primary">Amount to Pay</span>
            <span className="text-2xl font-extrabold text-primary">GHC {selectedPlan.price.toFixed(2)}</span>
          </div>

          <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
            Purchase Now
          </button>
        </div>
      </motion.div>
    </section>
  );
}
