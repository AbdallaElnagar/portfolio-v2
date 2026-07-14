// Portfolio Data - Easy to edit and maintain
export const personalInfo = {
  name: 'Abdalla Elnagar',
  role: 'Software Engineer',
  location: 'Cairo, Egypt',
  tagline:
    'Software Engineer specializing in building scalable web applications and clean backend architectures',
  bio: `Software Engineer specializing in building responsive web applications and scalable backend systems. With strong proficiency in React, Node.js, and SQL/NoSQL databases, I focus on writing clean, maintainable code and implementing efficient system architectures. Passionate about problem-solving and translating complex requirements into reliable, user-centric software solutions.`,
  email: 'abdalla.elnagar.dev@gmail.com',
  phone: '+20 101 435 2738',
  social: {
    github: 'https://github.com/AbdallaElnagar',
    linkedin:
      'https://www.linkedin.com/in/abdalla-elnager-bb867022a/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BspgXOwKmQBKFAzPnza9avQ%3D%3D',
    twitter: 'https://twitter.com/abdallaelnagar',
    portfolio: 'https://abdallaelnagar.dev',
  },
  resume: '/public/Abdalla_Elnagar_cv.pdf',
};

export const skills = [
  {
    category: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Bootstrap'],
  },
  {
    category: 'Backend',
    skills: [
      'Node.js',
      'Express.js',
      'REST API',
      'Authentication',
      'Authorization',
      'MongoDB',
      'Mongoose',
      'SQL',
    ],
  },
  {
    category: 'DevOps',
    skills: [
      'Linux',
      'Git',
      'Docker',
      'AWS',
      'CI/CD',
      'GitHub Actions',
      'Nginx',
      'Bash',
    ],
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'SQL Server'],
  },
];

export const projects = [
  {
    id: '1',
    title: 'OstaFinder – Service Marketplace Platform',
    shortDescription:
      'A MERN-stack service marketplace connecting clients with skilled local technicians and handymen.',
    longDescription: `Engineered a comprehensive service marketplace platform (OstaFinder) connecting clients with local technicians and handymen. Developed separate workflows and dashboards for clients, service providers (workers), and platform administrators. Built with a robust React frontend and a scalable Express/Node.js backend, the platform features a responsive design, advanced category filtering, Supabase storage integration, and an intelligent AI assistant utilizing the OpenAI API to guide user queries.`,
    image: '..//../public/images/OstaFinder.png',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    ],
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Supabase',
      'OpenAI API',
      'JWT',
      'REST API',
    ],
    category: 'Full Stack',
    featured: true,
    liveDemo: 'https://ostafinder.vercel.app/',
    github: 'https://github.com/Osta-Finder',
    frontendRepo: 'https://github.com/Osta-Finder/OstaFinder-User-Frontend',
    backendRepo: 'https://github.com/Osta-Finder/OstaFinder-Backend',
    features: [
      'Multi-role portal supporting Client, Worker, and Admin interfaces',
      'Interactive AI assistant powered by OpenAI to guide service requests',
      'Profile management and portfolio showcases for skilled technicians',
      'Real-time service request tracking and scheduling workflows',
      'Integrated media uploading and storage powered by Supabase',
      'Secure JWT authentication, Joi schema validation, and error-handling middlewares',
    ],
    badge: 'Graduation Project',
    challenges: [
      'Handling secure, role-based authorization rules and validation across multiple frontends (User vs. Admin dashboards) while managing heavy media uploads for technician portfolios.',
    ],
    solutions: [
      'Designed unified authentication middlewares and role checking guards on the Node.js backend. Integrated Supabase client-side chunked storage uploads with Joi-validated Multer pipelines to ensure lightweight, secure request payloads.',
    ],
  },
  {
    id: '2',
    title: 'Personal Portfolio Website',
    shortDescription:
      'Modern responsive portfolio with optimized performance and smooth animations',
    longDescription: `Built a modern responsive portfolio using modular React architecture and component-based design. Implemented lazy loading, code splitting, and performance optimization techniques to improve Core Web Vitals. Focused on smooth user experience with Framer Motion animations and responsive design across all devices.`,
    image: '..//../public/images/Portfolio.png',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    ],
    technologies: ['React', 'Bootstrap', 'Framer Motion', 'Vite', 'UI/UX'],
    category: 'Frontend',
    featured: true,
    liveDemo: 'https://abdallaelnagar.dev',
    github: 'https://github.com/abdallaelnagar/portfolio',
    frontendRepo: 'https://github.com/abdallaelnagar/portfolio',
    backendRepo: null,
    features: [
      'Modular React architecture',
      'Lazy loading and code splitting',
      'Optimized Core Web Vitals',
      'Smooth animations with Framer Motion',
      'Fully responsive design',
    ],
    badge: null,
    challenges: [
      'Achieving high SEO search visibility and keeping initial bundle size minimal with rich visual animations and glassmorphism styling.',
    ],
    solutions: [
      'Configured Vite code-splitting, asset lazy loading, and custom pre-rendering settings to optimize SEO crawler indexing.',
    ],
  },
  {
    id: '3',
    title: 'FitPower – AI-Driven Fitness Platform',
    shortDescription:
      'AI-powered fitness ecosystem with nutrition assistant and adaptive exercise library',
    longDescription: `Engineered a comprehensive fitness ecosystem featuring an AI-powered nutrition assistant and adaptive exercise library. Implemented personalized health tracking tools, dynamic filtering systems, and user goal analytics to enhance engagement and retention. Built a scalable architecture supporting modular expansion and real-time user interaction.`,
    image: '..//../public/images/FitPower.png',
    images: [
      '..//../public/images/FitPower.png',
      '..//../public/images/FitPower2.png',
    ],
    technologies: [
      'Angular',
      'Node.js',
      'Express',
      'MongoDB',
      'AI Integration',
      'REST API',
    ],
    category: 'Full Stack',
    featured: true,
    liveDemo: 'https://github.com/abdallaelnagar/fitpower',
    github: 'https://github.com/abdallaelnagar/fitpower',
    frontendRepo: null,
    backendRepo: null,
    features: [
      'AI-powered nutrition assistant',
      'Adaptive exercise library with dynamic filtering',
      'Personalized health tracking and goal analytics',
      'Scalable modular architecture',
      'Real-time user interaction system',
    ],
    badge: 'Academic Project',
    challenges: [
      'Integrating AI models for nutrition and workouts with low latency while handling real-time calorie tracking across multiple devices.',
    ],
    solutions: [
      'Leveraged serverless functions for asynchronous AI model processing and optimized MongoDB aggregation pipelines for fast user analytics.',
    ],
  },
  {
    id: '4',
    title: 'TripStore – E-Commerce Platform',
    shortDescription:
      'Scalable outdoor gear e-commerce with admin dashboard and real-time inventory',
    longDescription: `Developed a scalable outdoor gear e-commerce platform with comprehensive admin dashboard and dynamic catalog system. Implemented JWT authentication, reactive state management using RxJS, and optimized checkout flow. Enhanced system performance with RxJS streams and real-time inventory synchronization for seamless shopping experience.`,
    image: '..//../public/images/TripStore.png',
    images: [
      '..//../public/images/TripStore.png',
      '..//../public/images/TripStore2.png',
    ],
    technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'RxJS', 'JWT'],
    category: 'Full Stack',
    featured: true,
    liveDemo:
      'https://trip-stpre-4c8q5x757-abdallaelnagars-projects.vercel.app/',
    github: 'https://github.com/AbdallaElnagar/TripStpre',
    frontendRepo: null,
    backendRepo: null,
    features: [
      'Admin dashboard with analytics',
      'Dynamic catalog with advanced filtering',
      'JWT authentication and authorization',
      'Reactive state management with RxJS',
      'Real-time inventory synchronization',
    ],
    badge: 'ITI Project',
    challenges: [
      'Managing database race conditions in stock levels during high-traffic checkout scenarios.',
    ],
    solutions: [
      'Implemented database-level transaction locks and optimistic state updates on the frontend with RxJS streams for real-time validation.',
    ],
  },
  {
    id: '5',
    title: 'Online Examination System',
    shortDescription:
      'Complete exam platform with role-based access and auto-grading system',
    longDescription: `Developed a comprehensive online examination platform with role-based access control for students and instructors. Implemented timed exams with auto-grading system, analytics dashboard for performance tracking, and secure authentication. Added real-time monitoring capabilities for scalable academic usage across multiple institutions.`,
    image: '..//../public/images/Examination-System.png',
    images: ['..//../public/images/ExamSystem.png'],
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
      'Socket.io',
    ],
    category: 'Full Stack',
    featured: false,
    liveDemo: 'https://github.com/abdallaelnagar/exam-system',
    github: 'https://github.com/abdallaelnagar/exam-system',
    frontendRepo: null,
    backendRepo: null,
    features: [
      'Role-based access control (students/instructors)',
      'Timed exams with auto-grading',
      'Analytics dashboard for performance tracking',
      'Secure authentication system',
      'Real-time exam monitoring',
    ],
    badge: null,
    challenges: [
      'Ensuring cheat-proof timed exam sessions and preventing unauthorized browser interactions or tab switching.',
    ],
    solutions: [
      'Developed custom focus-loss detection hooks on the browser window and implemented real-time monitoring via secure, bi-directional Socket.io channels.',
    ],
  },
  // {
  //   id: '6',
  //   title: 'TaskFlow – Project Management System',
  //   shortDescription:
  //     'Trello-like Kanban board with real-time collaboration and team management',
  //   longDescription: `Built a comprehensive project management system inspired by Trello, featuring Kanban boards, task assignments, and team collaboration tools. Implemented real-time updates using WebSockets, role-based permissions for team hierarchy, and optimized database queries using Prisma ORM. Designed for scalability and efficient team workflow management.`,
  //   image:
  //     'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  //   images: [
  //     'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  //   ],
  //   technologies: [
  //     'Next.js',
  //     'Node.js',
  //     'PostgreSQL',
  //     'Prisma',
  //     'WebSockets',
  //     'TypeScript',
  //   ],
  //   category: 'Full Stack',
  //   featured: false,
  //   liveDemo: 'https://github.com/abdallaelnagar/taskflow',
  //   github: 'https://github.com/abdallaelnagar/taskflow',
  //   frontendRepo: null,
  //   backendRepo: null,
  //   features: [
  //     'Kanban board with drag-and-drop',
  //     'Real-time updates with WebSockets',
  //     'Role-based permissions system',
  //     'Optimized queries with Prisma ORM',
  //     'Team collaboration features',
  //   ],
  //   badge: null,
  //   challenges: [
  //     'Keeping boards synchronized in real-time across multiple active team members without state updates conflicting or dragging lagging.',
  //   ],
  //   solutions: [
  //     'Integrated WebSockets for instant state sync and built a collision-handling queue in the database backend using Prisma transactions.',
  //   ],
  // },
  // {
  //   id: '7',
  //   title: 'EduSync – Learning Management System',
  //   shortDescription:
  //     'Smart LMS with course management, video learning, and real-time chat',
  //   longDescription: `Created a comprehensive Learning Management System with course management, video learning modules, progress tracking, and real-time chat system. Implemented push notifications for course updates, scalable backend architecture for multi-user concurrency, and interactive learning tools. Designed to support educational institutions with seamless content delivery.`,
  //   image:
  //     'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
  //   images: [
  //     'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
  //   ],
  //   technologies: [
  //     'React',
  //     'Node.js',
  //     'Express',
  //     'MongoDB',
  //     'Socket.io',
  //     'Video Streaming',
  //   ],
  //   category: 'Full Stack',
  //   featured: false,
  //   liveDemo: 'https://github.com/abdallaelnagar/edusync',
  //   github: 'https://github.com/abdallaelnagar/edusync',
  //   frontendRepo: null,
  //   backendRepo: null,
  //   features: [
  //     'Course management and video learning',
  //     'Progress tracking and analytics',
  //     'Real-time chat with Socket.io',
  //     'Push notifications system',
  //     'Scalable multi-user architecture',
  //   ],
  //   badge: null,
  //   challenges: [
  //     'Delivering low-latency video streaming to thousands of concurrent users under variable network bandwidth conditions.',
  //   ],
  //   solutions: [
  //     'Utilized HLS adaptive bitrate streaming paired with CDN cloud caching to distribute load and optimize streaming playback quality.',
  //   ],
  // },
];

export const experience = [
  {
    id: '1',
    company: 'Information Technology Institute (ITI)',
    position: 'Software Engineering Trainee',
    location: 'Cairo, Egypt',
    startDate: '2026-01',
    endDate: '2026-06',
    current: false,
    description: `Participated in an intensive, professional 6-month Software Engineering specialization focusing on full-stack application architecture, robust database designs, and clean coding practices. Engineered multiple full-stack and scalable client-server applications.`,
    achievements: [
      'Engineered 4 production-grade full-stack web applications',
      'Designed scalable API architectures using Express.js, Node.js, and database systems (MongoDB/PostgreSQL)',
      'Collaborated on team projects using Git workflows and Agile methodologies',
      'Optimized application performance, reducing API response latency and bundle sizes',
      'Successfully resolved complex algorithmic challenges and technical system requirements',
    ],
    technologies: [
      'React',
      'Angular',
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'Git',
    ],
  },
  {
    id: '2',
    company: 'Personal Projects & Learning',
    position: 'Independent Software Developer',
    location: 'Cairo, Egypt',
    startDate: '2025-06',
    endDate: '2026-01',
    current: false,
    description: `Developed software projects using modern web technologies to build strong skills in JavaScript, asynchronous programming, and responsive layouts. Analyzed algorithmic complexities and designed clean UI modules for desktop and mobile clients.`,
    achievements: [
      'Designed and published multiple responsive web modules and interactive dashboards',
      'Integrated third-party REST APIs and client-side state management patterns',
      'Mastered JavaScript ES6+ features, closures, and asynchronous event-driven flows',
      'Practiced data structure implementation and algorithmic problem solving',
      'Built customized responsive UI layouts utilizing CSS Grid and Flexbox',
    ],
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'Git',
      'React Basics',
    ],
  },
  {
    id: '3',
    company: 'University Education',
    position: 'Bachelor of Science in Computer Science',
    location: 'Cairo, Egypt',
    startDate: '2021-09',
    endDate: '2025-06',
    current: false,
    description: `Completed bachelor's degree focusing on computer science fundamentals. Developed a strong command of programming paradigms, object-oriented design, algorithmic analysis, and software engineering methodologies.`,
    achievements: [
      'Completed coursework in Data Structures, Analysis of Algorithms, and OOP',
      'Developed core OOP software applications using C++ and Java',
      'Designed and implemented relational database schemas and SQL queries',
      'Built a comprehensive web-based graduation project demonstrating full-stack engineering skills',
    ],
    technologies: ['C++', 'Java', 'Data Structures', 'Algorithms', 'OOP'],
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    position: 'Senior Technical Lead & Instructor',
    company: 'Information Technology Institute',
    image: 'https://i.pravatar.cc/150?img=12',
    content: `Abdalla demonstrated exceptional dedication and technical aptitude during the Full Stack program. His architectures reflected a strong grasp of React, Node.js, and database modeling, and he consistently produced clean, well-documented code.`,
    rating: 5,
  },
  {
    id: '2',
    name: 'Sara Mohamed',
    position: 'Software Engineer',
    company: 'Project Collaborator',
    image: 'https://i.pravatar.cc/150?img=5',
    content: `Collaborating with Abdalla on project delivery was an excellent experience. He is a quick learner who writes clean, modular code, and his strong problem-solving skills were vital in resolving complex system issues.`,
    rating: 5,
  },
  {
    id: '3',
    name: 'Omar Khaled',
    position: 'Full Stack Developer',
    company: 'Project Collaborator',
    image: 'https://i.pravatar.cc/150?img=8',
    content: `Abdalla possesses a solid understanding of software engineering and full-stack development. He is a highly collaborative team player who excels at clarifying complex technical concepts and drives projects forward with high energy.`,
    rating: 5,
  },
];

export const stats = [
  { label: 'Full-Stack Focus', value: '100%' },
  { label: 'Projects Built', value: '6+' },
  { label: 'Technologies', value: '12+' },
  { label: 'Code Commits', value: '500+' },
];
