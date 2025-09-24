import bringit from '../assets/bringit.jpg';
import smartharvest from '../assets/smarharvest.jpg';

export interface Project {
  id: string;
  category: 'UI/UX' | 'Web Dev' | 'App';
  title: string;
  thumbnail: string;
  description: string;
  tech: string[];
  views: number;
  likes: number;
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
  },
  {
    id: 'p3',
    category: 'Web Dev',
    title: 'ShowTime - Ticket Booking',
    thumbnail: '../assets/ShowTIme.png',
    description: 'Full-stack web app with React.js, Node.js, and Razorpay payment integration.',
    tech: ['React.js', 'Node.js', 'Razorpay', 'Full-Stack'],
    views: 345,
    likes: 112,
  },
  {
    id: 'p4',
    category: 'Web Dev',
    title: 'Varad Academy - Education',
    thumbnail: '../assets/varadacademy.png',
    description: 'Responsive educational website with PHP, MySQL, and modern UI design.',
    tech: ['PHP', 'MySQL', 'Responsive Design', 'UI/UX'],
    views: 189,
    likes: 43,
  },
];