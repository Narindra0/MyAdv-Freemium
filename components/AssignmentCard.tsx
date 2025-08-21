import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';

interface AssignmentCardProps {
  title: string;
  subject: string;
  dueDate: string;
  status: 'urgent' | 'normal' | 'completed';
  onPress?: () => void;
}

export function AssignmentCard({ title, subject, dueDate, status, onPress }: AssignmentCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'urgent':
        return <AlertCircle size={20} color="#DC3545" strokeWidth={2} />;
      case 'completed':
        return <CheckCircle size={20} color="#28A745" strokeWidth={2} />;
      default:
        return <Clock size={20} color="#F5A623" strokeWidth={2} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'urgent': return '#DC3545';
      case 'completed': return '#28A745';
      default: return '#F5A623';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.statusContainer}>
            {getStatusIcon()}
          </View>
        </View>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={[styles.dueDate, { color: getStatusColor() }]}>
          Échéance: {dueDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
    marginRight: 12,
  },
  statusContainer: {
    alignItems: 'center',
  },
  subject: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  dueDate: {
    fontSize: 14,
    fontWeight: '500',
  },
});