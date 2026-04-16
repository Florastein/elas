import { Database, Search, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-[72px] px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="flex items-center gap-2 text-2xl font-extrabold text-primary tracking-tight">
        <Database className="w-6 h-6" />
        <span>SAAB<span className="text-text-main"> AFFORDABLE</span></span>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10">
          Sign In
        </button>
      </div>
    </nav>
  );
}
