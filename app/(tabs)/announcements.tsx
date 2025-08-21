import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleAlert as AlertCircle, Info, CircleCheck as CheckCircle, Clock, User } from 'lucide-react-native';

const mockAnnouncements = [
  {
    id: 1,
    title: 'Fermeture exceptionnelle de la bibliothèque',
    content: 'La bibliothèque universitaire sera fermée exceptionnellement le vendredi 18 janvier pour maintenance des systèmes informatiques.',
    author: 'Administration',
    date: '15 Jan 2025',
    time: '14:30',
    priority: 'high',
    type: 'admin'
  },
  {
    id: 2,
    title: 'Nouvelle ressource disponible en Programmation Web',
    content: 'Un nouveau tutoriel sur les hooks React est maintenant disponible dans la section ressources du cours.',
    author: 'Dr. Martin',
    date: '14 Jan 2025',
    time: '16:45',
    priority: 'normal',
    type: 'professor'
  },
  {
    id: 3,
    title: 'Rappel : Date limite projet Base de Données',
    content: 'N\'oubliez pas que la date limite pour rendre votre projet de base de données est fixée au 25 janvier à 23h59.',
    author: 'Dr. Leroy',
    date: '13 Jan 2025',
    time: '09:15',
    priority: 'urgent',
    type: 'professor'
  },
  {
    id: 4,
    title: 'Calendrier des examens disponible',
    content: 'Le planning des examens finaux du semestre 5 est maintenant consultable sur votre espace étudiant.',
    author: 'Scolarité',
    date: '12 Jan 2025',
    time: '11:20',
    priority: 'normal',
    type: 'admin'
  },
  {
    id: 5,
    title: 'Conférence : IA et Éthique',
    content: 'Participation libre à la conférence sur l\'intelligence artificielle et l\'éthique qui aura lieu le 30 janvier en amphithéâtre A.',
    author: 'Bureau des étudiants',
    date: '11 Jan 2025',
    time: '18:00',
    priority: 'info',
    type: 'student'
  }
];

export default function Announcements() {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle size={20} color="#DC3545" strokeWidth={2} />;
      case 'high':
        return <AlertCircle size={20} color="#F5A623" strokeWidth={2} />;
      case 'info':
        return <Info size={20} color="#005A9C" strokeWidth={2} />;
      default:
        return <CheckCircle size={20} color="#28A745" strokeWidth={2} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#DC3545';
      case 'high':
        return '#F5A623';
      case 'info':
        return '#005A9C';
      default:
        return '#28A745';
    }
  };

  const getAuthorIcon = (type: string) => {
    switch (type) {
      case 'admin':
        return '🏛️';
      case 'professor':
        return '👨‍🏫';
      case 'student':
        return '👥';
      default:
        return '📢';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Annonces</Text>
        <Text style={styles.headerSubtitle}>Dernières informations</Text>
      </View>

      <ScrollView style={styles.content}>
        {mockAnnouncements.map((announcement) => (
          <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
            <View style={[
              styles.priorityBorder,
              { backgroundColor: getPriorityColor(announcement.priority) }
            ]} />
            
            <View style={styles.announcementContent}>
              <View style={styles.announcementHeader}>
                <View style={styles.priorityContainer}>
                  {getPriorityIcon(announcement.priority)}
                  <Text style={[
                    styles.priorityText,
                    { color: getPriorityColor(announcement.priority) }
                  ]}>
                    {announcement.priority.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Clock size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.timeText}>{announcement.time}</Text>
                </View>
              </View>

              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementText}>{announcement.content}</Text>

              <View style={styles.announcementFooter}>
                <View style={styles.authorContainer}>
                  <Text style={styles.authorEmoji}>{getAuthorIcon(announcement.type)}</Text>
                  <User size={16} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.authorText}>{announcement.author}</Text>
                </View>
                <Text style={styles.dateText}>{announcement.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  announcementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  priorityBorder: {
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  announcementContent: {
    flex: 1,
    padding: 20,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 24,
  },
  announcementText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorEmoji: {
    fontSize: 16,
  },
  authorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});