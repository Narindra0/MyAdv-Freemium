export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'professor' | 'admin';
  year?: string;
  university: string;
}

// Mock users for testing
const mockUsers: AuthUser[] = [
  {
    id: '2023001',
    name: 'Marie Dupont',
    email: 'marie.dupont@univ-example.fr',
    role: 'student',
    year: 'L3 Informatique',
    university: 'Université de Technologie',
  },
  {
    id: 'prof001',
    name: 'Dr. Jean Martin',
    email: 'jean.martin@univ-example.fr',
    role: 'professor',
    university: 'Université de Technologie',
  },
  {
    id: 'admin001',
    name: 'Sophie Administrateur',
    email: 'sophie.admin@univ-example.fr',
    role: 'admin',
    university: 'Université de Technologie',
  },
];

// Mock credentials for testing
const mockCredentials = [
  { email: 'marie.dupont@univ-example.fr', password: 'student123' },
  { email: 'jean.martin@univ-example.fr', password: 'prof123' },
  { email: 'sophie.admin@univ-example.fr', password: 'admin123' },
];

let currentUser: AuthUser | null = null;

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const credential = mockCredentials.find(
      cred => cred.email === email && cred.password === password
    );
    
    if (!credential) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    currentUser = user;
    return user;
  },

  async logout(): Promise<void> {
    currentUser = null;
  },

  getCurrentUser(): AuthUser | null {
    return currentUser;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};