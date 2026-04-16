import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Background3D from './components/Background3D';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Background3D />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center relative z-10">
        <Hero />
      </main>
    </div>
  );
}
