'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Baraa Alsalameh',
    role: 'Electrical Engineering Student & Filmmaker',
    image: '/team/john.jpg',
    description: 'KAUSFF #1 Best Documentary Award.'
  },
  {
    name: 'Taynam Alzamel',
    role: 'Software Engineering & Artificial Intelligence Student',
    image: '/team/jane.jpg',
    description: ' Sachem Hackathon #1 Winner'
  },
  {
    name: 'Mudassir Khalidi',
    role: 'Software Engineering Student',
    image: '/team/mike.jpg',
    description: 'SDAIA Hackathon #1 Winner.'
  },
  {
    name: 'Aljohara Aljubair',
    role: 'Software Engineering & Artificial Intelligence Student',
    image: '/team/sarah.jpg',
    description: ' SARI competition winner.'
  }
];

export default function Team() {
  const teamRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize card refs array
    cardRefs.current = cardRefs.current.slice(0, teamMembers.length);

    // Create entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: teamRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    // Initial state - cards hidden
    tl.set(cardRefs.current, {
      opacity: 0,
      y: 100,
      scale: 0.8
    });

    // Animate cards in one by one
    tl.to(cardRefs.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power3.out'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={teamRef} className="py-20 bg-[#001f3f]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Meet Our Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              ref={el => {
                if (el) cardRefs.current[index] = el;
              }}
              className="group p-6 bg-white/10 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:ring-2 hover:ring-white hover:ring-offset-4 hover:ring-offset-[#001f3f]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001f3f]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                <p className="text-gray-300 mb-4">{member.role}</p>
                <p className="text-gray-300">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 