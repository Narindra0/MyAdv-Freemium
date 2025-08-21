import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Users } from 'lucide-react-native';

const mockAssignments = [
  {
    id: 1,
    title: 'Projet React Native',
    course: 'Programmation Web',
    dueDate: '25 Jan 2025',
    status: 'active',
    submitted: 18,
    total: 25,
    description: 'Développer une application mobile complète avec React Native'
  },
  {
    id: 2,
    title: 'Exercices SQL',
    course: 'Base de Données',
    dueDate: '20 Jan 2025',
    status: 'active',
    submitted: 22,
    total: 30,
    description: 'Série d\'exercices sur les requêtes SQL avancées'
  },
  {
    id: 3,
    title: 'Rapport de stage',
    course: 'Stage',
    dueDate: '15 Jan 2025',
    status: 'completed',
    submitted: 28,
    total: 28,
    description: 'Rapport détaillé sur l\'expérience de stage'
  },
];

export default function ProfessorAssignments() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'completed'>('active');

  const handleCreateAssignment = () => {
    Alert.alert(
      'Créer un devoir',
      'Fonctionnalité à implémenter avec un formulaire complet',
      [{ text: 'OK' }]
    );
  };

  const getStatusIcon = (status: string, submitted: number, total: number) => {
    if (status === 'completed') {
      return <CheckCircle size={20} color="#28A745" strokeWidth={2} />;
    }
    if (submitted < total * 0.5) {
      return <AlertCircle size={20} color="#DC3545" strokeWidth={2} />;
    }
    return <Clock size={20} color="#F5A623" strokeWidth={2} />;
  };

  const getStatusColor = (status: string, submitted: number, total: number) => {
    if (status === 'completed') return '#28A745';
    if (submitted < total * 0.5) return '#DC3545';
    return '#F5A623';
  };

  const filteredAssignments = mockAssignments.filter(assignment => 
    selectedTab === 'active' ? assignment.status === 'active' : assignment.status === 'completed'
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Gestion des Devoirs</Text>
            <Text style={styles.headerSubtitle}>Créez et suivez les devoirs</Text>
          </View>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateAssignment}>
            <Plus size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'active' && styles.activeTab]}
            onPress={() => setSelectedTab('active')}
          >
            <Text style={[styles.tabText, selectedTab === 'active' && styles.activeTabText]}>
              En cours
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'completed' && styles.activeTab]}
            onPress={() => setSelectedTab('completed')}
          >
            <Text style={[styles.tabText, selectedTab === 'completed' && styles.activeTabText]}>
              Terminés
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredAssignments.map((assignment) => (
          <TouchableOpacity key={assignment.id} style={styles.assignmentCard}>
            <View style={styles.assignmentHeader}>
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={styles.assignmentCourse}>{assignment.course}</Text>
              </View>
              <View style={styles.statusContainer}>
                {getStatusIcon(assignment.status, assignment.submitted, assignment.total)}
              </View>
            </View>

            <Text style={styles.assignmentDescription}>{assignment.description}</Text>

            <View style={styles.assignmentFooter}>
              <View style={styles.submissionStats}>
                <Users size={16} color="#6B7280" strokeWidth={2} />
                <Text style={styles.submissionText}>
                  {assignment.submitted}/{assignment.total} rendus
                </Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${(assignment.submitted / assignment.total) * 100}%`,
                        backgroundColor: getStatusColor(assignment.status, assignment.submitted, assignment.total)
                      }
                    ]} 
                  />
                </View>
              </View>
              <Text style={styles.dueDate}>Échéance: {assignment.dueDate}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {filteredAssignments.length === 0 && (
          <View style={styles.emptyState}>
            <Clock size={64} color="#E5E7EB" strokeWidth={1} />
            <Text style={styles.emptyStateTitle}>
              {selectedTab === 'active' ? 'Aucun devoir en cours' : 'Aucun devoir terminé'}
            </Text>
            <Text style={styles.emptyStateText}>
              {selectedTab === 'active' 
                ? 'Créez votre premier devoir pour commencer'
                : 'Les devoirs terminés apparaîtront ici'
              }
            </Text>
            {selectedTab === 'active' && (
              <TouchableOpacity style={styles.emptyStateButton} onPress={handleCreateAssignment}>
                <Plus size={16} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.emptyStateButtonText}>Créer un devoir</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  createButton: {
    backgroundColor: '#005A9C',
    borderRadius: 12,
    padding: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#005A9C',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  assignmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  assignmentCourse: {
    fontSize: 14,
    color: '#005A9C',
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'center',
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  assignmentFooter: {
    gap: 12,
  },
  submissionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submissionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginLeft: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  dueDate: {
    fontSize: 14,
    color: '#DC3545',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
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