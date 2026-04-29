import { Database, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-2xl font-extrabold text-primary tracking-tight">
            <Database className="w-6 h-6" />
            <span>SAAB<span className="text-text-main"> AFFORDABLE</span></span>
          </div>
          <p className="text-text-muted leading-relaxed">
            Ghana's most reliable and affordable data marketplace. Instant delivery, 24/7 reliability.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-text-main mb-6">Quick Links</h4>
          <ul className="space-y-4 text-text-muted">
            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Data Plans</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-text-main mb-6">Contact Us</h4>
          <ul className="space-y-4 text-text-muted">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary" />
              support@saabaffordable.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary" />
              +233 (0) 24 000 0000
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary" />
              Accra, Ghana
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-text-main mb-6">Newsletter</h4>
          <p className="text-text-muted mb-6">Get latest offers and data updates.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email"
              className="bg-gray-50 border border-border rounded-lg px-4 py-2 w-full outline-none focus:border-primary transition-all"
            />
            <button className="bg-primary text-white p-2 rounded-lg hover:brightness-110 transition-all">
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-12 pt-10 border-t border-border flex flex-col md:row items-center justify-between gap-4 text-sm text-text-muted font-medium">
        <p>© 2026 SAAB AFFORDABLE. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
