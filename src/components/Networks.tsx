import { motion } from 'motion/react';

export default function Networks() {
  const networks = [
    { name: 'MTN Ghana', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png' },
    { name: 'AirtelTigo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/AirtelTigo_logo.png/1200px-AirtelTigo_logo.png' },
    { name: 'Vodafone', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Vodafone_Logo_2017.png/1200px-Vodafone_Logo_2017.png' },
    { name: 'Glo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Glo_logo.svg/1024px-Glo_logo.svg.png' },
  ];

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-[1440px] mx-auto px-12">
        <p className="text-center text-sm font-bold text-text-muted uppercase tracking-[0.2em] mb-12">
          Supporting Major Networks
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {networks.map((net) => (
            <div key={net.name} className="flex items-center gap-3">
              <img 
                src={net.logo} 
                alt={net.name}
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-mono text-xs font-bold">{net.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
