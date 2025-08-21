export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'professor' | 'admin';
  year?: string;
  university: string;
}

export interface Course {
  id: number;
  name: string;
  professor: string;
  semester: string;
  resources: CourseResource[];
}

export interface CourseResource {
  id: number;
  title: string;
  type: 'pdf' | 'docx' | 'pptx' | 'xlsx';
  size: string;
  date: string;
}

export interface ScheduleItem {
  id: number;
  subject: string;
  time: string;
  room: string;
  professor: string;
  type: 'cours' | 'td' | 'tp' | 'projet';
}

export interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'urgent' | 'normal' | 'completed';
  description: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  time: string;
  priority: 'urgent' | 'high' | 'normal' | 'info';
  type: 'admin' | 'professor' | 'student';
}