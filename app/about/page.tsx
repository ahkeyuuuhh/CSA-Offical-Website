'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import Footer from '@/components/Footer';
import { Award, Users, Zap, Target } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'With 15 years in the printing industry, Sarah leads CSA with vision and passion.',
      color: 'cyan',
    },
    {
      name: 'Michael Chen',
      role: 'Creative Director',
      bio: 'Award-winning designer bringing creative excellence to every project.',
      color: 'magenta',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Production Manager',
      bio: 'Ensures quality and timely delivery on all printing projects.',
      color: 'yellow',
    },
    {
      name: 'David Kim',
      role: 'Sales Director',
      bio: 'Dedicated to understanding and meeting client needs.',
      color: 'cyan',
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
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About CSA Print & Design</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over a decade, we've been helping businesses bring their creative visions to life
            through exceptional printing and design services.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2010, CSA Print & Design started with a simple mission: to provide
                  high-quality printing services with exceptional customer care.
                </p>
                <p>
                  What began as a small print shop has grown into a full-service design and
                  printing company, serving hundreds of satisfied clients across the region.
                </p>
                <p>
                  Today, we combine traditional craftsmanship with cutting-edge technology to
                  deliver results that exceed expectations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-video bg-gradient-to-br from-[var(--color-cyan)] via-[var(--color-magenta)] to-[var(--color-yellow)] rounded-xl shadow-lg"
            />
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
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--color-cyan)] to-[var(--color-magenta)] rounded-full flex items-center justify-center">
                  <value.Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <SectionTitle title="Meet Our Team" subtitle="The talented people behind CSA" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group"
              >
                {/* Avatar placeholder */}
                <div
                  className={`aspect-square bg-gradient-to-br ${
                    member.color === 'cyan'
                      ? 'from-[var(--color-cyan)] to-blue-500'
                      : member.color === 'magenta'
                      ? 'from-[var(--color-magenta)] to-pink-500'
                      : 'from-[var(--color-yellow)] to-orange-500'
                  }`}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[var(--color-magenta)] mb-3 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '10+', label: 'Years Experience' },
              { number: '500+', label: 'Happy Clients' },
              { number: '5000+', label: 'Projects Completed' },
              { number: '100%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-md"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-magenta)] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
