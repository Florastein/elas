import { motion } from 'motion/react';

export default function Navbar() {
  const handleAuthClick = () => {
    alert("Authentication feature is currently under development. Please use the Quick Top-up form for now!");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-base font-semibold tracking-tight text-text-main">
          saab<span className="text-text-muted">affordable</span>
        </span>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-text-muted hover:text-text-main transition-colors">Solutions</a>
            <a href="#" className="text-sm text-text-muted hover:text-text-main transition-colors">Pricing</a>
          </div>
          <div className="h-4 w-px bg-border hidden md:block" />
          <button
            onClick={handleAuthClick}
            className="text-sm text-text-muted hover:text-text-main transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={handleAuthClick}
            className="btn-primary text-sm py-2 px-4"
          >
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
