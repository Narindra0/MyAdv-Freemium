import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, BookOpen, Users, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const mockCourses = [
  {
    id: 1,
    name: 'Programmation Web',
    code: 'INFO301',
    professor: 'Dr. Jean Martin',
    students: 25,
    semester: 'S5',
    credits: 6,
    status: 'active'
  },
  {
    id: 2,
    name: 'Base de Données',
    code: 'INFO302',
    professor: 'Dr. Sophie Leroy',
    students: 30,
    semester: 'S5',
    credits: 4,
    status: 'active'
  },
  {
    id: 3,
    name: 'Algorithmes Avancés',
    code: 'INFO303',
    professor: 'Dr. Pierre Bernard',
    students: 22,
    semester: 'S5',
    credits: 5,
    status: 'active'
  },
  {
    id: 4,
    name: 'Réseaux Informatiques',
    code: 'INFO304',
    professor: 'Dr. Marie Petit',
    students: 28,
    semester: 'S5',
    credits: 4,
    status: 'draft'
  },
];

const mockDepartments = [
  { id: 1, name: 'Informatique', courses: 12, professors: 8 },
  { id: 2, name: 'Mathématiques', courses: 8, professors: 6 },
  { id: 3, name: 'Physique', courses: 10, professors: 7 },
];

export default function CoursesManagement() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'courses' | 'departments'>('courses');

  const handleCreateCourse = () => {
    Alert.alert(
      'Créer un cours',
      'Fonctionnalité à implémenter avec un formulaire complet',
      [{ text: 'OK' }]
    );
  };

  const handleEditCourse = (courseId: number) => {
    Alert.alert(
      'Modifier le cours',
      'Fonctionnalité à implémenter',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteCourse = (courseId: number) => {
    Alert.alert(
      'Supprimer le cours',
      'Êtes-vous sûr de vouloir supprimer ce cours ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive' }
      ]
    );
  };

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
            <Text style={styles.headerTitle}>Gestion des Cours</Text>
            <Text style={styles.headerSubtitle}>Organisez les cours et filières</Text>
          </View>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateCourse}>
            <Plus size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'courses' && styles.activeTab]}
            onPress={() => setSelectedTab('courses')}
          >
            <Text style={[styles.tabText, selectedTab === 'courses' && styles.activeTabText]}>
              Cours
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'departments' && styles.activeTab]}
            onPress={() => setSelectedTab('departments')}
          >
            <Text style={[styles.tabText, selectedTab === 'departments' && styles.activeTabText]}>
              Départements
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'courses' ? (
          // Courses List
          <>
            {mockCourses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                <View style={styles.courseHeader}>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.courseCode}>{course.code}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    course.status === 'active' ? styles.activeStatus : styles.draftStatus
                  ]}>
                    <Text style={[
                      styles.statusText,
                      course.status === 'active' ? styles.activeStatusText : styles.draftStatusText
                    ]}>
                      {course.status === 'active' ? 'ACTIF' : 'BROUILLON'}
                    </Text>
                  </View>
                </View>

                <View style={styles.courseDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Professeur:</Text>
                    <Text style={styles.detailValue}>{course.professor}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Users size={16} color="#6B7280" strokeWidth={2} />
                    <Text style={styles.detailValue}>{course.students} étudiants</Text>
                    <Text style={styles.detailValue}>• {course.credits} crédits</Text>
                    <Text style={styles.detailValue}>• {course.semester}</Text>
                  </View>
                </View>

                <View style={styles.courseActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditCourse(course.id)}
                  >
                    <Edit size={16} color="#005A9C" strokeWidth={2} />
                    <Text style={styles.actionButtonText}>Modifier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 size={16} color="#DC3545" strokeWidth={2} />
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : (
          // Departments List
          <>
            {mockDepartments.map((department) => (
              <View key={department.id} style={styles.departmentCard}>
                <View style={styles.departmentHeader}>
                  <BookOpen size={32} color="#005A9C" strokeWidth={1.5} />
                  <View style={styles.departmentInfo}>
                    <Text style={styles.departmentName}>{department.name}</Text>
                    <Text style={styles.departmentStats}>
                      {department.courses} cours • {department.professors} professeurs
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.departmentAction}>
                  <Text style={styles.departmentActionText}>Gérer</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  courseCard: {
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
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  courseCode: {
    fontSize: 14,
    color: '#005A9C',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: '#F0FDF4',
  },
  draftStatus: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  activeStatusText: {
    color: '#28A745',
  },
  draftStatusText: {
    color: '#F5A623',
  },
  courseDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  courseActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F0F8FF',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#005A9C',
  },
  deleteButtonText: {
    color: '#DC3545',
  },
  departmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  departmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  departmentInfo: {
    marginLeft: 16,
    flex: 1,
  },
  departmentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  departmentStats: {
    fontSize: 14,
    color: '#6B7280',
  },
  departmentAction: {
    backgroundColor: '#005A9C',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  departmentActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});