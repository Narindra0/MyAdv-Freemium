export const mockUser = {
  id: '2023001',
  name: 'Marie Dupont',
  email: 'marie.dupont@univ-example.fr',
  role: 'student',
  year: 'L3 Informatique',
  university: 'Université de Technologie',
};

export const mockSchedule = {
  'Lundi': [
    {
      id: 1,
      subject: 'Mathématiques',
      time: '08:00-10:00',
      room: 'A101',
      professor: 'Dr. Dubois',
      type: 'cours' as const
    },
    {
      id: 2,
      subject: 'Programmation Web',
      time: '14:00-16:00',
      room: 'B205',
      professor: 'Dr. Martin',
      type: 'tp' as const
    },
  ],
  'Mardi': [
    {
      id: 3,
      subject: 'Base de Données',
      time: '10:00-12:00',
      room: 'C301',
      professor: 'Dr. Leroy',
      type: 'cours' as const
    },
    {
      id: 4,
      subject: 'Algorithmes',
      time: '14:00-17:00',
      room: 'A102',
      professor: 'Dr. Bernard',
      type: 'td' as const
    },
  ],
  'Mercredi': [
    {
      id: 5,
      subject: 'Réseaux',
      time: '09:00-11:00',
      room: 'B204',
      professor: 'Dr. Petit',
      type: 'cours' as const
    },
  ],
  'Jeudi': [
    {
      id: 6,
      subject: 'Projet Tuteuré',
      time: '08:00-12:00',
      room: 'Lab 1',
      professor: 'Dr. Martin',
      type: 'projet' as const
    },
    {
      id: 7,
      subject: 'Anglais',
      time: '14:00-15:30',
      room: 'D101',
      professor: 'Ms. Smith',
      type: 'td' as const
    },
  ],
  'Vendredi': [
    {
      id: 8,
      subject: 'Sécurité Informatique',
      time: '10:00-12:00',
      room: 'A201',
      professor: 'Dr. Moreau',
      type: 'cours' as const
    },
  ],
};

export const mockCourses = [
  {
    id: 1,
    name: 'Programmation Web',
    professor: 'Dr. Martin',
    semester: 'S5',
    resources: [
      { id: 1, title: 'Introduction à React', type: 'pdf', size: '2.5 MB', date: '10 Jan' },
      { id: 2, title: 'TP1 - Composants React', type: 'pdf', size: '1.8 MB', date: '12 Jan' },
      { id: 3, title: 'Slides - Hooks React', type: 'pptx', size: '4.2 MB', date: '15 Jan' },
    ]
  },
  {
    id: 2,
    name: 'Base de Données',
    professor: 'Dr. Leroy',
    semester: 'S5',
    resources: [
      { id: 4, title: 'Modèle relationnel', type: 'pdf', size: '3.1 MB', date: '08 Jan' },
      { id: 5, title: 'Exercices SQL', type: 'docx', size: '1.2 MB', date: '11 Jan' },
    ]
  },
];

export const mockAssignments = [
  {
    id: 1,
    title: 'Projet React Native',
    subject: 'Dev Mobile',
    dueDate: '15 Jan',
    status: 'urgent' as const,
    description: 'Développer une application mobile complète avec React Native'
  },
  {
    id: 2,
    title: 'Rapport de stage',
    subject: 'Stage',
    dueDate: '20 Jan',
    status: 'normal' as const,
    description: 'Rédiger un rapport détaillé sur l\'expérience de stage'
  },
];

export const mockAnnouncements = [
  {
    id: 1,
    title: 'Fermeture exceptionnelle',
    content: 'La bibliothèque sera fermée le 18 janvier pour maintenance.',
    author: 'Administration',
    date: '15 Jan 2025',
    time: '14:30',
    priority: 'high' as const,
    type: 'admin' as const
  },
  {
    id: 2,
    title: 'Nouvelle ressource disponible',
    content: 'Un nouveau tutoriel sur React est disponible.',
    author: 'Dr. Martin',
    date: '14 Jan 2025',
    time: '16:45',
    priority: 'normal' as const,
    type: 'professor' as const
  },
];