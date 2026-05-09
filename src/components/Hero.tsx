import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Phone, Mail, CheckCircle2, Loader2, ChevronDown } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { payWithPaystack } from '../lib/paystack';
import confetti from 'canvas-confetti';

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
  const [email, setEmail] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const { addOrder } = useOrders();

  const currentPlans = DATA_PLANS[network];
  const selectedPlan = currentPlans[selectedPlanIndex] || currentPlans[0];

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\s+/g, '');
    return /^(02|05)\d{8}$/.test(cleaned);
  };

  const FALLBACK_EMAIL = 'vandalsavage111@gmail.com';

  const validateEmail = (value: string) => {
    if (value.trim() === '') return true; // optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d\s]/g, '');
    const cleaned = value.replace(/\s+/g, '');
    if (cleaned.length <= 10) {
      let formatted = '';
      if (cleaned.length > 0) formatted += cleaned.substring(0, 3);
      if (cleaned.length > 3) formatted += ' ' + cleaned.substring(3, 6);
      if (cleaned.length > 6) formatted += ' ' + cleaned.substring(6, 10);
      setPhoneNumber(formatted);
      if (isDirty) setIsValidPhone(validatePhone(formatted));
    }
  };

  const handlePhoneBlur = () => {
    setIsDirty(true);
    setIsValidPhone(validatePhone(phoneNumber));
  };

  const handleEmailBlur = () => {
    if (email.trim() !== '') {
      setIsEmailDirty(true);
      setIsValidEmail(validateEmail(email));
    }
  };

  const isFormValid = validatePhone(phoneNumber) && validateEmail(email) && !isSubmitting;

  const handleSubmit = () => {
    if (!isFormValid) return;
    setIsSubmitting(true);

    const resolvedEmail = email.trim() || FALLBACK_EMAIL;

    payWithPaystack({
      email: resolvedEmail,
      amountInCedis: selectedPlan.price,
      onSuccess: async (ref) => {
        setPaymentRef(ref);

        await addOrder({
          network,
          plan: selectedPlan.label,
          price: selectedPlan.price,
          phoneNumber,
          email: resolvedEmail,
          paymentRef: ref,
        });

        setIsSubmitting(false);
        setIsSuccess(true);
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#111', '#888', '#ddd'],
        });
      },
      onClose: () => {
        setIsSubmitting(false);
      },
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setPhoneNumber('');
    setEmail('');
    setIsDirty(false);
    setIsEmailDirty(false);
    setPaymentRef('');
  };

  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <p className="text-sm text-text-muted mb-4">Ghana's data marketplace</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Affordable data,<br />delivered instantly.
        </h1>
        <p className="text-text-muted text-lg max-w-md mx-auto leading-relaxed">
          Top up your mobile data in seconds. Best prices, no hassle.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-lg mx-auto"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="card space-y-6"
            >
              {/* Network selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-medium text-text-muted">Network</label>
                <div className="grid grid-cols-2 gap-3">
                  {['MTN', 'AirtelTigo'].map(p => (
                    <button
                      key={p}
                      onClick={() => { setNetwork(p); setSelectedPlanIndex(0); }}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        network === p
                          ? 'bg-accent text-white'
                          : 'bg-surface border border-border text-text-muted hover:border-text-muted'
                      }`}
                    >
                      {p === 'MTN' ? 'MTN Ghana' : 'AirtelTigo'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-medium text-text-muted">Data plan</label>
                <div className="relative">
                  <select
                    value={selectedPlanIndex}
                    onChange={(e) => setSelectedPlanIndex(Number(e.target.value))}
                    className="w-full py-3 px-4 pr-10 rounded-xl border border-border bg-surface text-text-main text-sm outline-none focus:border-text-muted transition-colors appearance-none cursor-pointer"
                  >
                    {currentPlans.map((plan, index) => (
                      <option key={index} value={index}>
                        {plan.label} — ₵{plan.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                </div>
              </div>

              {/* Phone input */}
              <div className="space-y-2.5">
                <label className="text-xs font-medium text-text-muted">Phone number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    placeholder="024 123 4567"
                    className={`w-full py-3 px-4 rounded-xl border bg-surface text-text-main text-sm outline-none transition-colors placeholder:text-text-muted/40 ${
                      !isValidPhone && isDirty
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-border focus:border-text-muted'
                    }`}
                  />
                  <Phone className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    !isValidPhone && isDirty ? 'text-red-400' : 'text-text-muted/30'
                  }`} />
                </div>
                {!isValidPhone && isDirty && (
                  <p className="text-xs text-red-400">Enter a valid Ghana number (e.g. 024 123 4567)</p>
                )}
              </div>

              {/* Email input */}
              <div className="space-y-2.5">
                <label className="text-xs font-medium text-text-muted">Email <span className="text-text-muted/40">(optional)</span></label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (isEmailDirty) setIsValidEmail(validateEmail(e.target.value)); }}
                    onBlur={handleEmailBlur}
                    placeholder="you@example.com"
                    className={`w-full py-3 px-4 rounded-xl border bg-surface text-text-main text-sm outline-none transition-colors placeholder:text-text-muted/40 ${
                      !isValidEmail && isEmailDirty
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-border focus:border-text-muted'
                    }`}
                  />
                  <Mail className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    !isValidEmail && isEmailDirty ? 'text-red-400' : 'text-text-muted/30'
                  }`} />
                </div>
                {!isValidEmail && isEmailDirty && (
                  <p className="text-xs text-red-400">Enter a valid email address</p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between py-4 px-5 rounded-xl bg-surface border border-border">
                <span className="text-xs font-medium text-text-muted">Total</span>
                <span className="text-2xl font-semibold text-text-main tabular-nums">
                  ₵{selectedPlan.price.toFixed(2)}
                </span>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`btn-primary w-full flex items-center justify-center gap-2.5 text-sm ${
                  !isFormValid ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Pay ₵{selectedPlan.price.toFixed(2)}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-2">Payment successful!</h3>
              <p className="text-text-muted text-sm mb-2 max-w-xs leading-relaxed">
                Your {selectedPlan.label} bundle for <span className="text-text-main font-medium">{phoneNumber}</span> is being processed.
              </p>
              <p className="text-xs text-text-muted/60 font-mono mb-8">
                Ref: {paymentRef}
              </p>
              <button onClick={handleReset} className="btn-secondary text-sm">
                New purchase
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
