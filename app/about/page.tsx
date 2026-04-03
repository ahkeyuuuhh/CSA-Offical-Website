'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import DarkVeil from '@/components/DarkVeil';
import ProfileCard from '@/components/ProfileCard';
import Masonry from '@/components/Masonry';
import { Award, Users, Zap, Target } from 'lucide-react';
import { usePageView } from '@/hooks/usePageView';

export default function About() {
  usePageView('about');
  
  const masonryItems = [
    {
      id: '1',
      img: '/assets/products-asset/business-card.jpg',
      url: '/products',
      height: 400
    },
    {
      id: '2',
      img: '/assets/products-asset/customized-stickers.jpg',
      url: '/products',
      height: 350
    },
    {
      id: '3',
      img: '/assets/products-asset/photocards.jpg',
      url: '/products',
      height: 500
    },
    {
      id: '4',
      img: '/assets/products-asset/Invitation-cards.jpg',
      url: '/products',
      height: 450
    },
    {
      id: '5',
      img: '/assets/products-asset/customized-pins.jpg',
      url: '/products',
      height: 380
    },
    {
      id: '6',
      img: '/assets/products-asset/magnetic-bookmarks.jpg',
      url: '/products',
      height: 420
    },
    {
      id: '7',
      img: '/assets/products-asset/Keychains.jpg',
      url: '/products',
      height: 400
    },
    {
      id: '8',
      img: '/assets/products-asset/Ref-magnets.jpg',
      url: '/products',
      height: 360
    },
    {
      id: '9',
      img: '/assets/products-asset/customized-box.png',
      url: '/products',
      height: 440
    },
    {
      id: '10',
      img: '/assets/products-asset/customized-loot-chip-bags.jpg',
      url: '/products',
      height: 390
    },
    {
      id: '11',
      img: '/assets/products-asset/customized-sintr-boards.jpg',
      url: '/products',
      height: 410
    },
    {
      id: '12',
      img: '/assets/products-asset/cute-couple-pins.jpg',
      url: '/products',
      height: 370
    }
  ];

  const team = [
    {
      name: 'Aki Zita',
      role: 'Editor / Developer',
      email: 'zitacristel@gmail.com',
      avatarUrl: '/team/aki.png',
      behindGlowColor: 'rgba(125, 190, 255, 0.2)',
      innerGradient: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    },
    {
      name: 'Stacy Lugares',
      role: 'Business Owner',
      email: 'cithruscaleb20@gmail.com',
      avatarUrl: '/team/stacy.png',
      behindGlowColor: 'rgba(233, 30, 99, 0.2)',
      innerGradient: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    },
    {
      name: 'Cheannaly Dearing',
      role: 'Social Media Manager',
      email: 'cheannalyjoyeusantos@gmail.com',
      avatarUrl: '/team/chea.png',
      behindGlowColor: 'rgba(82, 39, 255, 0.2)',
      innerGradient: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    },
  ];

  const values = [
    {
      Icon: Award,
      title: 'Quality First',
      description: 'We never compromise on the quality of our work',
    },
    {
      Icon: Users,
      title: 'Client Focused',
      description: 'Your satisfaction is our top priority',
    },
    {
      Icon: Zap,
      title: 'Innovation',
      description: 'Always exploring new techniques and technologies',
    },
    {
      Icon: Target,
      title: 'Precision',
      description: 'Attention to detail in every project',
    },
  ];

  return (
    <div className="relative bg-gray-950">
      {/* DarkVeil Background - Blue/Purple */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={250}
          noiseIntensity={0.06}
          scanlineIntensity={0}
          speed={0.25}
          scanlineFrequency={0}
          warpAmount={0.08}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-bold text-white mb-6">About CSA Print & Design</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Born from the shared ambition of three college students, we transform creative visions into reality through exceptional printing and design services.
            </p>
          </motion.div>

          {/* Story Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-white mb-8">Our Story</h2>
                <div className="space-y-6 text-gray-300 text-lg">
                  <p>
                    Founded by three ambitious friends, CSA Print & Design is the result of entrepreneurial spirit and professional investment. We saw an opportunity to bridge the gap between creative ideas and high-quality physical prints.
                  </p>
                  <p>
                    Starting with a single set of printing equipment, we have built a collaborative workflow that focuses on precision and client satisfaction. We believe that great design should be accessible and professionally executed.
                  </p>
                  <p>
                    Every project we handle is a testament to our commitment to growth, innovation, and the power of collaboration.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="scale-90 origin-center"
              >
                <Masonry
                  items={masonryItems}
                  ease="power3.out"
                  duration={0.6}
                  stagger={0.05}
                  animateFrom="bottom"
                  scaleOnHover
                  hoverScale={0.95}
                  blurToFocus
                  colorShiftOnHover={false}
                />
              </motion.div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <SectionTitle title="Our Values" subtitle="What drives us every day" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:border-purple-500 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <value.Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20">
            <SectionTitle title="Meet Our Team" subtitle="The talented people behind CSA" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 justify-items-center">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProfileCard
                    avatarUrl={member.avatarUrl}
                    miniAvatarUrl={member.avatarUrl}
                    name={member.name}
                    title={member.role}
                    handle={member.email}
                    status="Available"
                    contactText="Email"
                    showUserInfo={true}
                    enableTilt={true}
                    behindGlowEnabled={true}
                    behindGlowColor={member.behindGlowColor}
                    innerGradient={member.innerGradient}
                    onContactClick={() => window.location.href = `mailto:${member.email}`}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
