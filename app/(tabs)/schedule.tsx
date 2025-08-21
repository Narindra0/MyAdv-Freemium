import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, MapPin, User } from 'lucide-react-native';

const mockSchedule = {
  'Lundi': [
    { id: 1, subject: 'Mathématiques', time: '08:00-10:00', room: 'A101', professor: 'Dr. Dubois', type: 'cours' },
    { id: 2, subject: 'Programmation Web', time: '14:00-16:00', room: 'B205', professor: 'Dr. Martin', type: 'tp' },
  ],
  'Mardi': [
    { id: 3, subject: 'Base de Données', time: '10:00-12:00', room: 'C301', professor: 'Dr. Leroy', type: 'cours' },
    { id: 4, subject: 'Algorithmes', time: '14:00-17:00', room: 'A102', professor: 'Dr. Bernard', type: 'td' },
  ],
  'Mercredi': [
    { id: 5, subject: 'Réseaux', time: '09:00-11:00', room: 'B204', professor: 'Dr. Petit', type: 'cours' },
  ],
  'Jeudi': [
    { id: 6, subject: 'Projet Tuteuré', time: '08:00-12:00', room: 'Lab 1', professor: 'Dr. Martin', type: 'projet' },
    { id: 7, subject: 'Anglais', time: '14:00-15:30', room: 'D101', professor: 'Ms. Smith', type: 'td' },
  ],
  'Vendredi': [
    { id: 8, subject: 'Sécurité Informatique', time: '10:00-12:00', room: 'A201', professor: 'Dr. Moreau', type: 'cours' },
  ],
};

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState('Lundi');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cours': return '#005A9C';
      case 'td': return '#28A745';
      case 'tp': return '#F5A623';
      case 'projet': return '#DC3545';
      default: return '#6B7280';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cours': return 'Cours';
      case 'td': return 'TD';
      case 'tp': return 'TP';
      case 'projet': return 'Projet';
      default: return type;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.navButton}>
            <ChevronLeft size={24} color="#005A9C" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Emploi du temps</Text>
          <TouchableOpacity style={styles.navButton}>
            <ChevronRight size={24} color="#005A9C" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        {/* Day Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.daySelector}
        >
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.selectedDayButton
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.dayContent}>
          {mockSchedule[selectedDay as keyof typeof mockSchedule]?.length ? (
            mockSchedule[selectedDay as keyof typeof mockSchedule].map((classe) => (
              <View key={classe.id} style={styles.classCard}>
                <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(classe.type) }]} />
                <View style={styles.classContent}>
                  <View style={styles.classHeader}>
                    <Text style={styles.classSubject}>{classe.subject}</Text>
                    <View style={[styles.typeBadge, { backgroundColor: getTypeColor(classe.type) }]}>
                      <Text style={styles.typeBadgeText}>{getTypeLabel(classe.type)}</Text>
                    </View>
                  </View>
                  <Text style={styles.classTime}>{classe.time}</Text>
                  <View style={styles.classDetails}>
                    <View style={styles.detailItem}>
                      <MapPin size={16} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.detailText}>{classe.room}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <User size={16} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.detailText}>{classe.professor}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Aucun cours prévu pour {selectedDay}</Text>
            </View>
          )}
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
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
  },
  daySelector: {
    flexDirection: 'row',
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedDayButton: {
    backgroundColor: '#005A9C',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedDayButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  dayContent: {
    padding: 20,
  },
  classCard: {
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
  typeIndicator: {
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  classContent: {
    flex: 1,
    padding: 20,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  classSubject: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    flex: 1,
    marginRight: 12,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  classTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#005A9C',
    marginBottom: 12,
  },
  classDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});