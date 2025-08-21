import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, MapPin, User } from 'lucide-react-native';

interface CourseCardProps {
  subject: string;
  time: string;
  room: string;
  professor: string;
  type: 'cours' | 'td' | 'tp' | 'projet';
  onPress?: () => void;
}

export function CourseCard({ subject, time, room, professor, type, onPress }: CourseCardProps) {
  const getTypeColor = (courseType: string) => {
    switch (courseType) {
      case 'cours': return '#005A9C';
      case 'td': return '#28A745';
      case 'tp': return '#F5A623';
      case 'projet': return '#DC3545';
      default: return '#6B7280';
    }
  };

  const getTypeLabel = (courseType: string) => {
    switch (courseType) {
      case 'cours': return 'Cours';
      case 'td': return 'TD';
      case 'tp': return 'TP';
      case 'projet': return 'Projet';
      default: return courseType;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(type) }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subject}>{subject}</Text>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(type) }]}>
            <Text style={styles.typeBadgeText}>{getTypeLabel(type)}</Text>
          </View>
        </View>
        
        <View style={styles.timeContainer}>
          <Clock size={16} color="#005A9C" strokeWidth={2} />
          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapPin size={14} color="#6B7280" strokeWidth={2} />
            <Text style={styles.detailText}>{room}</Text>
          </View>
          <View style={styles.detailItem}>
            <User size={14} color="#6B7280" strokeWidth={2} />
            <Text style={styles.detailText}>{professor}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  subject: {
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#005A9C',
  },
  details: {
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
});