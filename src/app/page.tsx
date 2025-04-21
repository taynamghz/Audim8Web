import Hero from './components/Hero';
import Problem from './components/Problem';
import HowItWorks from './components/HowItWorks';
import Team from './components/Team';
import TryDemo from './components/TryDemo';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <HowItWorks />
      <Team />
      <TryDemo />
      <Footer />
    </main>
  );
}
