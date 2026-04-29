import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Networks from './components/Networks';
import Footer from './components/Footer';
import Background3D from './components/Background3D';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <Background3D />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Networks />
      </main>
      
      <Footer />
    </div>
  );
}
