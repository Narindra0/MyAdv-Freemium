import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  LogOut, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users
} from 'lucide-react-native';
import { authService } from '@/lib/auth';
import { useRouter } from 'expo-router';

export default function ProfessorProfile() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const router = useRouter();
  const user = authService.getCurrentUser();

  const mockProfessorProfile = {
    name: user?.name || 'Dr. Jean Martin',
    email: user?.email || 'jean.martin@univ-example.fr',
    phone: '+33 1 23 45 67 89',
    office: 'Bureau 204, Bâtiment Sciences',
    department: 'Département Informatique',
    university: user?.university || 'Université de Technologie',
    specialization: 'Développement Web & Mobile',
    experience: '8 ans d\'enseignement',
    courses: ['Programmation Web', 'Base de Données', 'Projet Tuteuré'],
    totalStudents: 85,
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive', 
          onPress: async () => {
            await authService.logout();
            router.replace('/login');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <LinearGradient colors={['#005A9C', '#0066B3']} style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {mockProfessorProfile.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Settings size={18} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{mockProfessorProfile.name}</Text>
          <Text style={styles.profileRole}>Professeur</Text>
          <Text style={styles.profileDepartment}>{mockProfessorProfile.department}</Text>
        </LinearGradient>

        {/* Teaching Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques d'enseignement</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <BookOpen size={24} color="#005A9C" strokeWidth={2} />
              <Text style={styles.statNumber}>{mockProfessorProfile.courses.length}</Text>
              <Text style={styles.statLabel}>Cours enseignés</Text>
            </View>
            <View style={styles.statCard}>
              <Users size={24} color="#28A745" strokeWidth={2} />
              <Text style={styles.statNumber}>{mockProfessorProfile.totalStudents}</Text>
              <Text style={styles.statLabel}>Étudiants</Text>
            </View>
            <View style={styles.statCard}>
              <Calendar size={24} color="#F5A623" strokeWidth={2} />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Années d'exp.</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations professionnelles</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Mail size={20} color="#005A9C" strokeWidth={2} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{mockProfessorProfile.email}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Phone size={20} color="#005A9C" strokeWidth={2} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Téléphone</Text>
                <Text style={styles.infoValue}>{mockProfessorProfile.phone}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <MapPin size={20} color="#005A9C" strokeWidth={2} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Bureau</Text>
                <Text style={styles.infoValue}>{mockProfessorProfile.office}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <BookOpen size={20} color="#005A9C" strokeWidth={2} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Spécialisation</Text>
                <Text style={styles.infoValue}>{mockProfessorProfile.specialization}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Courses Taught */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cours enseignés</Text>
          <View style={styles.coursesContainer}>
            {mockProfessorProfile.courses.map((course, index) => (
              <View key={index} style={styles.courseChip}>
                <Text style={styles.courseChipText}>{course}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Bell size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.settingLabel}>Notifications push</Text>
              </View>
              <TouchableOpacity
                style={[styles.switch, notificationsEnabled && styles.switchActive]}
                onPress={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <View style={[styles.switchThumb, notificationsEnabled && styles.switchThumbActive]} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Mail size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.settingLabel}>Notifications email</Text>
              </View>
              <TouchableOpacity
                style={[styles.switch, emailNotifications && styles.switchActive]}
                onPress={() => setEmailNotifications(!emailNotifications)}
              >
                <View style={[styles.switchThumb, emailNotifications && styles.switchThumbActive]} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                {isDarkMode ? (
                  <Moon size={20} color="#6B7280" strokeWidth={2} />
                ) : (
                  <Sun size={20} color="#6B7280" strokeWidth={2} />
                )}
                <Text style={styles.settingLabel}>Mode sombre</Text>
              </View>
              <TouchableOpacity
                style={[styles.switch, isDarkMode && styles.switchActive]}
                onPress={() => setIsDarkMode(!isDarkMode)}
              >
                <View style={[styles.switchThumb, isDarkMode && styles.switchThumbActive]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <Settings size={20} color="#6B7280" strokeWidth={2} />
            <Text style={styles.actionButtonText}>Paramètres avancés</Text>
            <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#DC3545" strokeWidth={2} />
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 8,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  profileDepartment: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  coursesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseChip: {
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#005A9C',
  },
  courseChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#005A9C',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchActive: {
    backgroundColor: '#005A9C',
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    flex: 1,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC3545',
  },
});