import bringit from '../assets/bringit.jpg';
import smartharvest from '../assets/smarharvest.jpg';
import varadacademy from '../assets/varadacademy.png';
import ashtavinayak from '../assets/ashtavinayak.png';
import rudra from '../assets/rudra.png';
import shivdigital from '../assets/shiv1.png';

export interface Project {
  id: string;
  category: 'UI/UX' | 'Web Dev' | 'App';
  title: string;
  thumbnail: string;
  description: string;
  tech: string[];
  views: number;
  likes: number;
  href?: string;
  demoVideoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'p1',
    category: 'UI/UX',
    title: 'Bring It! - Quick Commerce App',
    thumbnail: bringit,
    description: 'Intuitive mobile app design with cart animations, location-based offers, and smooth order tracking.',
    tech: ['Figma', 'UI/UX Design', 'Prototyping'],
    views: 267,
    likes: 89,
    href: 'https://www.behance.net/gallery/12345678/Bring-It-Quick-Commerce-App',
    demoVideoUrl: 'https://www.youtube.com/watch?v=demo1',
  },
  {
    id: 'p2',
    category: 'UI/UX',
    title: 'SmartHarvest - Tax Platform',
    thumbnail: smartharvest,
    description: 'Clean, data-driven dashboard for automated tax-loss harvesting strategies.',
    tech: ['Figma', 'UI Design', 'Dashboard Design'],
    views: 198,
    likes: 67,
    href: 'https://www.behance.net/gallery/12345679/SmartHarvest-Tax-Platform',
    demoVideoUrl: 'https://www.youtube.com/watch?v=demo2',
  },
  {
    id: 'p3',
    category: 'Web Dev',
    title: 'Ashtavinayak Enterprises',
    thumbnail: ashtavinayak,
    description: 'Business website for Ashtavinayak Enterprises with modern design and responsive layout.',
    tech: ['React.js', 'Responsive Design', 'Modern UI'],
    views: 156,
    likes: 34,
    href: 'https://ashtavinayak.enterprises/',
    demoVideoUrl: 'https://www.youtube.com/watch?v=demo-ashtavinayak',
  },
  {
    id: 'p4',
    category: 'Web Dev',
    title: 'Shiv Digital Jwellery - Price Display',
    thumbnail: shivdigital,
    description: 'Dynamic price display system for Shiv Digital Jwellery with real-time updates.',
    tech: ['React.js', 'Express.js', 'MongoDB', 'VPS Hosting', 'Real-time Updates'],
    views: 203,
    likes: 78,
    href: 'https://shivdigital.net/login',
    demoVideoUrl: 'https://www.youtube.com/watch?v=demo-shiv-digital',
  },
  {
    id: 'p5',
    category: 'Web Dev',
    title: 'Rudrapalace Girls Hostel Kopargaon',
    thumbnail: rudra,
    description: 'Website for Rudrapalace Girls Hostel in Kopargaon with booking system and amenities showcase.',
    tech: ['PHP', 'React.js', 'MySQL', 'Booking System'],
    views: 178,
    likes: 52,
    href: 'https://rudrapalace.in/',
    demoVideoUrl: 'https://www.youtube.com/watch?v=demo-rudrapalace',
  },
  {
    id: 'p6',
    category: 'Web Dev',
    title: 'Varad Academy - Education',
    thumbnail: varadacademy,
    description: 'Responsive educational website with PHP, MySQL, and modern UI design.',
    tech: ['PHP', 'MySQL', 'Responsive Design', 'UI/UX'],
    views: 189,
    likes: 43,
    href: 'https://varadacademy.in/',
    demoVideoUrl: 'https://www.youtube.com/watch?v=demo4',
  },
];

export const latestProject = {
  title: 'Ashtavinayak Enterprises',
  description: 'A modern business website for Ashtavinayak Enterprises featuring responsive design, service showcase, and contact integration.',
  thumbnail: ashtavinayak,
  deployedUrl: 'https://ashtavinayak-enterprises.com/',
  tech: ['React.js', 'Responsive Design', 'Modern UI'],
  features: ['Modern UI design', 'Service portfolio', 'Contact forms', 'Mobile responsive']
};