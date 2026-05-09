import { motion } from 'motion/react';

export default function Networks() {
  const networks = [
    { name: 'MTN Ghana', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png' },
    { name: 'AirtelTigo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/AirtelTigo_logo.png/1200px-AirtelTigo_logo.png' },
    { name: 'Vodafone', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Vodafone_Logo_2017.png/1200px-Vodafone_Logo_2017.png' },
    { name: 'Glo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Glo_logo.svg/1024px-Glo_logo.svg.png' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/[0.02]" />
      <div className="max-w-[1440px] mx-auto px-12 relative z-10">
        <p className="text-center text-[0.7rem] font-black text-text-muted uppercase tracking-[0.3em] mb-16">
          Global Connectivity Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale hover:opacity-100 transition-all duration-700">
          {networks.map((net) => (
            <div key={net.name} className="flex items-center gap-4 group cursor-pointer">
              <img 
                src={net.logo} 
                alt={net.name}
                className="h-10 w-auto object-contain transition-transform group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <span className="text-[0.6rem] font-black tracking-widest text-text-muted group-hover:text-text-main uppercase">{net.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
