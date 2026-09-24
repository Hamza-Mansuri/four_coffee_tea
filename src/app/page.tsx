import Hero from '@/components/home/Hero';
import WhyGomzi from '@/components/home/WhyGomzi';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ParallaxBanner from '@/components/home/ParallaxBanner';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';

export default function Home() {
  return (
    <div>
      <Hero />
      <WhyGomzi />
      <FeaturedProducts />
      <ParallaxBanner />
      <Testimonials />
      <FAQ />
    </div>
  );
}
