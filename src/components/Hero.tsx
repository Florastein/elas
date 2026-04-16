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
          className="text-xl text-text-muted leading-relaxed mb-10 max-w-[550px]"
        >
          Connect instantly with the most reliable data marketplace. High speed, low cost, 100% automated delivery to any network.
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="icon-box">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-[1rem] font-bold mb-1 text-text-main">Instant Delivery</h4>
              <p className="text-[0.85rem] text-text-muted">Receive your data in less than 30 seconds.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="icon-box">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-[1rem] font-bold mb-1 text-text-main">Secure Wallet</h4>
              <p className="text-[0.85rem] text-text-muted">Bank-grade encryption for all transactions.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="icon-box">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-[1rem] font-bold mb-1 text-text-main">Multi-Network</h4>
              <p className="text-[0.85rem] text-text-muted">MTN and AirtelTigo supported globally.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="icon-box">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-[1rem] font-bold mb-1 text-text-main">24/7 Support</h4>
              <p className="text-[0.85rem] text-text-muted">Human assistance whenever you need it.</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="card-sleek p-8 relative overflow-hidden group shadow-2xl"
      >
        <div className="liquid-bg" />
        <div className="glass-shine" />
        
        <h3 className="text-xl font-bold mb-8 text-text-main flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary fill-primary/10" />
          Quick Top-up
        </h3>
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-text-muted mb-3 uppercase tracking-wider">
              <Wifi className="w-4 h-4" />
              Select Network
            </label>
            <select 
              value={network}
              onChange={(e) => {
                setNetwork(e.target.value);
                setSelectedPlanIndex(0);
              }}
              className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-text-main outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-white/20 backdrop-blur-sm"
            >
              <option value="MTN">MTN</option>
              <option value="AirtelTigo">AirtelTigo</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-text-muted mb-3 uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              Data Plan
            </label>
            <select 
              value={selectedPlanIndex}
              onChange={(e) => setSelectedPlanIndex(Number(e.target.value))}
              className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-text-main outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-white/20 backdrop-blur-sm"
            >
              {currentPlans.map((plan, index) => (
                <option key={index} value={index}>
                  {plan.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-text-muted mb-3 uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input 
              type="text" 
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              placeholder="024 123 4567" 
              className={`w-full p-4 rounded-xl border bg-white/10 text-text-main outline-none focus:ring-1 transition-all hover:bg-white/20 placeholder:text-gray-400 backdrop-blur-sm ${!isValidPhone ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : 'border-white/20 focus:border-primary/50 focus:ring-primary/50'}`} 
            />
            {!isValidPhone && (
              <p className="text-red-500 text-[0.75rem] mt-1 font-medium">Please enter a valid Ghana phone number (starts with 02 or 05, 10 digits total).</p>
            )}
          </div>
          
          <div className="bg-primary/10 rounded-xl p-5 border border-primary/10 relative overflow-hidden backdrop-blur-md">
            <div className="flex justify-between items-center relative z-10">
              <span className="text-sm font-bold text-text-muted uppercase tracking-wider">Amount to Pay</span>
              <span className="text-2xl font-black text-primary">GHC {selectedPlan.price.toFixed(2)}</span>
            </div>
          </div>

          <button 
            disabled={!isValidPhone || phoneNumber === ''}
            className={`w-full py-4 text-white rounded-xl font-black text-lg transition-all shadow-lg active:scale-[0.98] ${(!isValidPhone || phoneNumber === '') ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-primary hover:brightness-110 shadow-primary/20'}`}
          >
            Purchase Now
          </button>
        </div>
      </motion.div>
    </section>
  );
}
