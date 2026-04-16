import { Database, Search, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-[72px] px-12 flex items-center justify-between bg-white border-b border-border sticky top-0 z-50">
      <div className="flex items-center gap-2 text-2xl font-extrabold text-primary tracking-tight">
        <Database className="w-6 h-6" />
        <span>Swift<span className="text-text-main">Data</span></span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Services</a>
        <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Pricing</a>
        <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">API Docs</a>
        <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Reseller</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="btn-primary">Sign In</button>
      </div>
    </nav>
  );
}
