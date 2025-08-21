import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, BookOpen, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Calendar, FileText } from 'lucide-react-native';

const mockUser = {
  name: 'Marie Dupont',
  studentId: '2023001',
  year: 'L3 Informatique',
};

const mockNextClass = {
  subject: 'Programmation Web',
  room: 'Salle A204',
  time: '14:00 - 16:00',
  professor: 'Dr. Martin',
};

const mockAssignments = [
  { id: 1, title: 'Projet React Native', dueDate: '15 Jan', status: 'urgent', subject: 'Dev Mobile' },
  { id: 2, title: 'Rapport de stage', dueDate: '20 Jan', status: 'normal', subject: 'Stage' },
  { id: 3, title: 'Exercices SQL', dueDate: '25 Jan', status: 'completed', subject: 'BDD' },
];

const mockAnnouncements = [
  { id: 1, title: 'Fermeture exceptionnelle', time: '2h', priority: 'high' },
  { id: 2, title: 'Nouvelle ressource disponible', time: '5h', priority: 'normal' },
];

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <LinearGradient colors={['#005A9C', '#0066B3']} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Bonjour</Text>
              <Text style={styles.userName}>{mockUser.name}</Text>
              <Text style={styles.userInfo}>{mockUser.year} • {mockUser.studentId}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MD</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Next Class Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prochain cours</Text>
          <View style={styles.nextClassCard}>
            <View style={styles.nextClassHeader}>
              <Clock size={24} color="#005A9C" strokeWidth={2} />
              <Text style={styles.nextClassTime}>{mockNextClass.time}</Text>
            </View>
            <Text style={styles.nextClassSubject}>{mockNextClass.subject}</Text>
            <View style={styles.nextClassDetails}>
              <Text style={styles.nextClassRoom}>{mockNextClass.room}</Text>
              <Text style={styles.nextClassProfessor}>{mockNextClass.professor}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accès rapide</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Calendar size={32} color="#005A9C" strokeWidth={1.5} />
              <Text style={styles.quickActionText}>Emploi du temps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <FileText size={32} color="#005A9C" strokeWidth={1.5} />
              <Text style={styles.quickActionText}>Ressources</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Assignments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Devoirs à venir</Text>
          {mockAssignments.map((assignment) => (
            <View key={assignment.id} style={styles.assignmentCard}>
              <View style={styles.assignmentHeader}>
                <View style={styles.assignmentInfo}>
                  <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                  <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                </View>
                <View style={styles.assignmentStatus}>
                  {assignment.status === 'urgent' && (
                    <AlertCircle size={20} color="#DC3545" strokeWidth={2} />
                  )}
                  {assignment.status === 'completed' && (
                    <CheckCircle size={20} color="#28A745" strokeWidth={2} />
                  )}
                  {assignment.status === 'normal' && (
                    <Clock size={20} color="#F5A623" strokeWidth={2} />
                  )}
                  <Text style={[
                    styles.assignmentDue,
                    assignment.status === 'urgent' && styles.urgent,
                    assignment.status === 'completed' && styles.completed
                  ]}>
                    {assignment.dueDate}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Announcements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Annonces récentes</Text>
          {mockAnnouncements.map((announcement) => (
            <View key={announcement.id} style={styles.announcementCard}>
              <View style={styles.announcementContent}>
                <Text style={styles.announcementTitle}>{announcement.title}</Text>
                <Text style={styles.announcementTime}>Il y a {announcement.time}</Text>
              </View>
              <View style={[
                styles.priorityIndicator,
                announcement.priority === 'high' && styles.highPriority
              ]} />
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
  userInfo: {
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
  nextClassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  nextClassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextClassTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#005A9C',
    marginLeft: 8,
  },
  nextClassSubject: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
  },
  nextClassDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextClassRoom: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  nextClassProfessor: {
    fontSize: 16,
    color: '#6B7280',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginTop: 12,
    textAlign: 'center',
  },
  assignmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  assignmentSubject: {
    fontSize: 14,
    color: '#6B7280',
  },
  assignmentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  assignmentDue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  urgent: {
    color: '#DC3545',
  },
  completed: {
    color: '#28A745',
  },
  announcementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  announcementTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#F5A623',
  },
  highPriority: {
    backgroundColor: '#DC3545',
  },
});