import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, BookOpen, FileText, Bell, Users, Plus } from 'lucide-react-native';
import { authService } from '@/lib/auth';

const mockProfessorData = {
  todayClasses: [
    { id: 1, subject: 'Programmation Web', time: '08:00-10:00', room: 'B205', students: 25 },
    { id: 2, subject: 'Base de Données', time: '14:00-16:00', room: 'C301', students: 30 },
  ],
  pendingAssignments: 12,
  totalStudents: 85,
  recentActivity: [
    { id: 1, action: 'Nouveau devoir créé', course: 'Programmation Web', time: '2h' },
    { id: 2, action: 'Document ajouté', course: 'Base de Données', time: '4h' },
  ],
};

export default function ProfessorDashboard() {
  const user = authService.getCurrentUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <LinearGradient colors={['#005A9C', '#0066B3']} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Bonjour</Text>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userRole}>Professeur</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'P'}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aperçu du jour</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Clock size={24} color="#005A9C" strokeWidth={2} />
              <Text style={styles.statNumber}>{mockProfessorData.todayClasses.length}</Text>
              <Text style={styles.statLabel}>Cours aujourd'hui</Text>
            </View>
            <View style={styles.statCard}>
              <FileText size={24} color="#F5A623" strokeWidth={2} />
              <Text style={styles.statNumber}>{mockProfessorData.pendingAssignments}</Text>
              <Text style={styles.statLabel}>Devoirs en cours</Text>
            </View>
            <View style={styles.statCard}>
              <Users size={24} color="#28A745" strokeWidth={2} />
              <Text style={styles.statNumber}>{mockProfessorData.totalStudents}</Text>
              <Text style={styles.statLabel}>Étudiants</Text>
            </View>
          </View>
        </View>

        {/* Today's Classes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cours d'aujourd'hui</Text>
          {mockProfessorData.todayClasses.map((classe) => (
            <View key={classe.id} style={styles.classCard}>
              <View style={styles.classHeader}>
                <Text style={styles.classSubject}>{classe.subject}</Text>
                <Text style={styles.classTime}>{classe.time}</Text>
              </View>
              <View style={styles.classDetails}>
                <Text style={styles.classRoom}>Salle {classe.room}</Text>
                <Text style={styles.classStudents}>{classe.students} étudiants</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <Plus size={24} color="#005A9C" strokeWidth={2} />
              <Text style={styles.actionText}>Ajouter un document</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <FileText size={24} color="#005A9C" strokeWidth={2} />
              <Text style={styles.actionText}>Créer un devoir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Bell size={24} color="#005A9C" strokeWidth={2} />
              <Text style={styles.actionText}>Publier une annonce</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité récente</Text>
          {mockProfessorData.recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityCourse}>{activity.course}</Text>
              </View>
              <Text style={styles.activityTime}>Il y a {activity.time}</Text>
            </View>
          ))}
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classSubject: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  classTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#005A9C',
  },
  classDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classRoom: {
    fontSize: 14,
    color: '#6B7280',
  },
  classStudents: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
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
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212529',
    marginTop: 8,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  activityCourse: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});