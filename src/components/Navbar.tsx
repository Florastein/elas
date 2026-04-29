import { Database, Search, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-[72px] px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="flex items-center gap-2 text-2xl font-extrabold text-primary tracking-tight">
        <Database className="w-6 h-6" />
        <span>SAAB<span className="text-text-main"> AFFORDABLE</span></span>
      </div>

      <div className="flex items-center gap-8">
        <a href="#" className="hidden md:block text-sm font-bold text-text-muted hover:text-primary transition-colors">How it works</a>
        <a href="#" className="hidden md:block text-sm font-bold text-text-muted hover:text-primary transition-colors">Help Center</a>
        <div className="h-6 w-[1px] bg-border mx-2 hidden md:block"></div>
        <button className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Sign In</button>
        <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20">
          Register
        </button>
      </div>
    </nav>
  );
}
