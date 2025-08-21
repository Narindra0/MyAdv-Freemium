import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Plus, TriangleAlert as AlertTriangle, Clock, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const mockScheduleData = {
  conflicts: [
    {
      id: 1,
      type: 'room_conflict',
      message: 'Conflit de salle A101 le Lundi 14:00-16:00',
      courses: ['Programmation Web', 'Base de Données'],
      severity: 'high'
    },
    {
      id: 2,
      type: 'professor_conflict',
      message: 'Dr. Martin a deux cours simultanés le Mardi 10:00-12:00',
      courses: ['Algorithmes', 'Projet Tuteuré'],
      severity: 'medium'
    }
  ],
  weeklySchedule: [
    {
      day: 'Lundi',
      slots: [
        { time: '08:00-10:00', course: 'Mathématiques', room: 'A101', professor: 'Dr. Dubois', group: 'L3 Info A' },
        { time: '10:00-12:00', course: 'Programmation Web', room: 'B205', professor: 'Dr. Martin', group: 'L3 Info A' },
        { time: '14:00-16:00', course: 'Base de Données', room: 'C301', professor: 'Dr. Leroy', group: 'L3 Info B' },
      ]
    },
    {
      day: 'Mardi',
      slots: [
        { time: '08:00-10:00', course: 'Algorithmes', room: 'A102', professor: 'Dr. Bernard', group: 'L3 Info A' },
        { time: '10:00-12:00', course: 'Réseaux', room: 'B204', professor: 'Dr. Petit', group: 'L3 Info B' },
        { time: '14:00-16:00', course: 'Projet Tuteuré', room: 'Lab 1', professor: 'Dr. Martin', group: 'L3 Info A' },
      ]
    }
  ]
};

export default function ScheduleManagement() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState('Lundi');

  const handleAddSlot = () => {
    Alert.alert(
      'Ajouter un créneau',
      'Fonctionnalité à implémenter avec un formulaire complet',
      [{ text: 'OK' }]
    );
  };

  const handleResolveConflict = (conflictId: number) => {
    Alert.alert(
      'Résoudre le conflit',
      'Fonctionnalité à implémenter pour résoudre automatiquement ou manuellement',
      [{ text: 'OK' }]
    );
  };

  const getConflictIcon = (severity: string) => {
    return <AlertTriangle size={20} color={severity === 'high' ? '#DC3545' : '#F5A623'} strokeWidth={2} />;
  };

  const selectedDayData = mockScheduleData.weeklySchedule.find(d => d.day === selectedDay);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#005A9C" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Emploi du Temps Global</Text>
            <Text style={styles.headerSubtitle}>Gérez les plannings et résolvez les conflits</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddSlot}>
            <Plus size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Conflicts Section */}
        {mockScheduleData.conflicts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conflits détectés</Text>
            {mockScheduleData.conflicts.map((conflict) => (
              <View key={conflict.id} style={styles.conflictCard}>
                <View style={styles.conflictHeader}>
                  {getConflictIcon(conflict.severity)}
                  <Text style={styles.conflictMessage}>{conflict.message}</Text>
                </View>
                <View style={styles.conflictCourses}>
                  {conflict.courses.map((course, index) => (
                    <View key={index} style={styles.courseTag}>
                      <Text style={styles.courseTagText}>{course}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.resolveButton}
                  onPress={() => handleResolveConflict(conflict.id)}
                >
                  <Text style={styles.resolveButtonText}>Résoudre</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Day Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planning hebdomadaire</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
            {mockScheduleData.weeklySchedule.map((dayData) => (
              <TouchableOpacity
                key={dayData.day}
                style={[
                  styles.dayButton,
                  selectedDay === dayData.day && styles.selectedDayButton
                ]}
                onPress={() => setSelectedDay(dayData.day)}
              >
                <Text style={[
                  styles.dayButtonText,
                  selectedDay === dayData.day && styles.selectedDayButtonText
                ]}>
                  {dayData.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Schedule Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{selectedDay}</Text>
          {selectedDayData?.slots.map((slot, index) => (
            <View key={index} style={styles.slotCard}>
              <View style={styles.slotHeader}>
                <View style={styles.timeContainer}>
                  <Clock size={16} color="#005A9C" strokeWidth={2} />
                  <Text style={styles.slotTime}>{slot.time}</Text>
                </View>
                <TouchableOpacity style={styles.editSlotButton}>
                  <Text style={styles.editSlotButtonText}>Modifier</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.slotCourse}>{slot.course}</Text>
              
              <View style={styles.slotDetails}>
                <View style={styles.slotDetailItem}>
                  <MapPin size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.slotDetailText}>{slot.room}</Text>
                </View>
                <View style={styles.slotDetailItem}>
                  <Text style={styles.slotDetailText}>{slot.professor}</Text>
                </View>
                <View style={styles.slotDetailItem}>
                  <Text style={styles.slotDetailText}>{slot.group}</Text>
                </View>
              </View>
            </View>
          ))}

          {(!selectedDayData?.slots || selectedDayData.slots.length === 0) && (
            <View style={styles.emptyState}>
              <Calendar size={48} color="#E5E7EB" strokeWidth={1} />
              <Text style={styles.emptyStateText}>Aucun cours programmé pour {selectedDay}</Text>
              <TouchableOpacity style={styles.emptyStateButton} onPress={handleAddSlot}>
                <Plus size={16} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.emptyStateButtonText}>Ajouter un créneau</Text>
              </TouchableOpacity>
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  addButton: {
    backgroundColor: '#005A9C',
    borderRadius: 12,
    padding: 12,
  },
  content: {
    flex: 1,
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
  conflictCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#DC3545',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  conflictHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  conflictMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  conflictCourses: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  courseTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  courseTagText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  resolveButton: {
    backgroundColor: '#005A9C',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  resolveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  daySelector: {
    flexDirection: 'row',
    marginBottom: 16,
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
  slotCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  slotTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#005A9C',
  },
  editSlotButton: {
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editSlotButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#005A9C',
  },
  slotCourse: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
  },
  slotDetails: {
    gap: 4,
  },
  slotDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  slotDetailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: '#005A9C',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});