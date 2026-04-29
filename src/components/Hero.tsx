import { useState, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Globe, MessageSquare, Phone, CreditCard, Wifi } from 'lucide-react';

const DATA_PLANS: Record<string, { label: string; price: number }[]> = {
  MTN: [
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
  ],
  AirtelTigo: [
    { label: '2GB', price: 10.00 },
    { label: '3GB', price: 15.00 },
    { label: '4GB', price: 19.00 },
    { label: '5GB', price: 23.00 },
    { label: '6GB', price: 27.00 },
    { label: '7GB', price: 32.00 },
    { label: '8GB', price: 36.00 },
    { label: '10GB', price: 45.00 },
    { label: '15GB', price: 64.00 },
    { label: '20GB', price: 83.00 },
    { label: '30GB', price: 105.00 },
    { label: '40GB', price: 135.00 },
    { label: '50GB', price: 150.00 },
  ]
};

export default function Hero() {
  const [network, setNetwork] = useState('MTN');
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  
  const currentPlans = DATA_PLANS[network];
  const selectedPlan = currentPlans[selectedPlanIndex] || currentPlans[0];

  const validatePhone = (value: string) => {
    // Regex for Ghana: starts with 02 or 05, followed by 8 digits
    const ghanaPhoneRegex = /^(02|05)\d{8}$/;
    return ghanaPhoneRegex.test(value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, ''); // Remove spaces
    setPhoneNumber(value);
    if (isDirty) {
      setIsValidPhone(validatePhone(value));
    }
  };

  const handlePhoneBlur = () => {
    setIsDirty(true);
    setIsValidPhone(validatePhone(phoneNumber));
  };

  return (
    <section className="px-12 py-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center max-w-[1440px] mx-auto min-h-[calc(100vh-72px)]">
      <div className="hero-content">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[4rem] leading-[1.05] font-extrabold mb-6 tracking-[-0.05em] text-text-main"
        >
          Premium Data <br />
          <span className="text-primary">at Local Prices.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-text-muted leading-relaxed mb-12 max-w-[550px]"
        >
          Connect instantly with the most reliable data marketplace in Ghana. High speed, ultra-low cost, and 100% automated delivery.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mb-16"
        >
          <div className="flex items-start gap-5">
            <div className="icon-box">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[1.1rem] font-bold mb-1.5 text-text-main">Instant Delivery</h4>
              <p className="text-[0.9rem] text-text-muted leading-snug">Receive your data bundle in less than 30 seconds, guaranteed.</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="icon-box">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[1.1rem] font-bold mb-1.5 text-text-main">Secure Assets</h4>
              <p className="text-[0.9rem] text-text-muted leading-snug">Bank-grade encryption for every transaction and wallet balance.</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="icon-box">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[1.1rem] font-bold mb-1.5 text-text-main">Multi-Network</h4>
              <p className="text-[0.9rem] text-text-muted leading-snug">Supporting MTN, AirtelTigo, and Vodafone with 99.9% uptime.</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="icon-box">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[1.1rem] font-bold mb-1.5 text-text-main">Elite Support</h4>
              <p className="text-[0.9rem] text-text-muted leading-snug">Our dedicated team is available 24/7 to resolve any billing issues.</p>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-4 text-xs font-bold text-text-muted tracking-widest uppercase py-6 border-t border-black/[0.03]">
          <span className="shrink-0">Highly Rated by</span>
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
              <img key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" src={`https://picsum.photos/seed/${i + 10}/32/32`} alt="User" />
            ))}
          </div>
          <span className="ml-2 font-mono">+12k Active Users</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="card-sleek p-10 relative overflow-hidden group shadow-2xl"
      >
        <div className="liquid-bg" />
        <div className="crystal-border" />
        <div className="glass-shine" />
        
        <h3 className="text-2xl font-black mb-10 text-text-main flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary fill-primary/10" />
          Quick Top-up
        </h3>
        <div className="space-y-8">
          <div>
            <label className="flex items-center gap-2 text-[0.8rem] font-black text-text-muted mb-3 uppercase tracking-[0.15em]">
              Network Provider
            </label>
            <div className="relative group/select">
              <select 
                value={network}
                onChange={(e) => {
                  setNetwork(e.target.value);
                  setSelectedPlanIndex(0);
                }}
                className="w-full p-4.5 rounded-2xl border border-black/5 bg-white/[0.05] text-text-main outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer appearance-none"
              >
                <option value="MTN" className="bg-white">MTN Ghana</option>
                <option value="AirtelTigo" className="bg-white">AirtelTigo</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted opacity-50 group-hover/select:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-[0.8rem] font-black text-text-muted mb-3 uppercase tracking-[0.15em]">
              Data Subscription
            </label>
            <div className="relative group/select">
              <select 
                value={selectedPlanIndex}
                onChange={(e) => setSelectedPlanIndex(Number(e.target.value))}
                className="w-full p-4.5 rounded-2xl border border-black/5 bg-white/[0.05] text-text-main outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer appearance-none"
              >
                {currentPlans.map((plan, index) => (
                  <option key={index} value={index} className="bg-white">
                    {plan.label} High Speed Plan
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted opacity-50 group-hover/select:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-[0.8rem] font-black text-text-muted mb-3 uppercase tracking-[0.15em]">
              Recipient Number
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={phoneNumber}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder="e.g. 024 123 4567" 
                className={`w-full p-4.5 rounded-2xl border bg-white/[0.05] text-text-main outline-none focus:ring-4 transition-all placeholder:text-gray-300 font-bold ${!isValidPhone ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/5' : 'border-black/5 focus:border-primary/50 focus:ring-primary/5'}`} 
              />
              <Phone className={`absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${!isValidPhone ? 'text-red-500' : 'text-text-muted opacity-30'}`} />
            </div>
            {!isValidPhone && (
              <p className="text-red-600 text-[0.75rem] mt-2 font-bold bg-red-50 p-2 rounded-lg border border-red-100">Invalid format: Must start with 02 or 05 (10 digits).</p>
            )}
          </div>
          
          <div className="bg-white/[0.05] rounded-2xl p-6 border border-black/5 relative overflow-hidden">
            <div className="flex justify-between items-end relative z-10">
              <div className="space-y-1">
                <span className="block text-[0.7rem] font-black text-text-muted uppercase tracking-widest">Pricing Estimation</span>
                <span className="text-sm font-bold text-text-muted">GHC {selectedPlan.price.toFixed(2)} total</span>
              </div>
              <div className="text-right">
                <span className="block text-[0.7rem] font-black text-primary uppercase tracking-widest mb-1">Total Payable</span>
                <span className="text-3xl font-black text-text-main">₵{selectedPlan.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            disabled={!isValidPhone || phoneNumber === ''}
            className={`w-full py-5 text-white rounded-2xl font-black text-xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 group/btn ${(!isValidPhone || phoneNumber === '') ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-primary hover:brightness-110 shadow-primary/30'}`}
          >
            Authorize Purchase
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
