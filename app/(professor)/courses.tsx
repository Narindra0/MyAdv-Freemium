import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Upload, FileText, Users, CreditCard as Edit } from 'lucide-react-native';

const mockProfessorCourses = [
  {
    id: 1,
    name: 'Programmation Web',
    code: 'INFO301',
    students: 25,
    resources: [
      { id: 1, title: 'Introduction à React', type: 'pdf', uploadDate: '10 Jan' },
      { id: 2, title: 'TP1 - Composants React', type: 'pdf', uploadDate: '12 Jan' },
    ]
  },
  {
    id: 2,
    name: 'Base de Données',
    code: 'INFO302',
    students: 30,
    resources: [
      { id: 3, title: 'Modèle relationnel', type: 'pdf', uploadDate: '08 Jan' },
      { id: 4, title: 'Exercices SQL', type: 'docx', uploadDate: '11 Jan' },
    ]
  },
];

export default function ProfessorCourses() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const handleAddResource = (courseId: number) => {
    Alert.alert(
      'Ajouter une ressource',
      'Fonctionnalité à implémenter avec un vrai système de fichiers',
      [{ text: 'OK' }]
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'pptx': return '📊';
      default: return '📁';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestion des Cours</Text>
        <Text style={styles.headerSubtitle}>Gérez vos cours et ressources</Text>
      </View>

      <ScrollView style={styles.content}>
        {mockProfessorCourses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <TouchableOpacity
              style={styles.courseHeader}
              onPress={() => setSelectedCourse(
                selectedCourse === course.id ? null : course.id
              )}
            >
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseCode}>{course.code}</Text>
                <View style={styles.courseStats}>
                  <Users size={16} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.courseStudents}>{course.students} étudiants</Text>
                  <Text style={styles.resourceCount}>
                    {course.resources.length} ressource(s)
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddResource(course.id)}
              >
                <Plus size={20} color="#005A9C" strokeWidth={2} />
              </TouchableOpacity>
            </TouchableOpacity>

            {selectedCourse === course.id && (
              <View style={styles.resourcesList}>
                <View style={styles.resourcesHeader}>
                  <Text style={styles.resourcesTitle}>Ressources</Text>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => handleAddResource(course.id)}
                  >
                    <Upload size={16} color="#FFFFFF" strokeWidth={2} />
                    <Text style={styles.uploadButtonText}>Ajouter</Text>
                  </TouchableOpacity>
                </View>

                {course.resources.map((resource) => (
                  <View key={resource.id} style={styles.resourceItem}>
                    <View style={styles.resourceIcon}>
                      <Text style={styles.fileEmoji}>{getFileIcon(resource.type)}</Text>
                    </View>
                    <View style={styles.resourceInfo}>
                      <Text style={styles.resourceTitle}>{resource.title}</Text>
                      <Text style={styles.resourceDate}>Ajouté le {resource.uploadDate}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                      <Edit size={16} color="#6B7280" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                ))}

                {course.resources.length === 0 && (
                  <View style={styles.emptyState}>
                    <FileText size={48} color="#E5E7EB" strokeWidth={1} />
                    <Text style={styles.emptyStateText}>Aucune ressource ajoutée</Text>
                    <TouchableOpacity
                      style={styles.emptyStateButton}
                      onPress={() => handleAddResource(course.id)}
                    >
                      <Text style={styles.emptyStateButtonText}>Ajouter la première ressource</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
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
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  courseCode: {
    fontSize: 16,
    color: '#005A9C',
    fontWeight: '500',
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseStudents: {
    fontSize: 14,
    color: '#6B7280',
  },
  resourceCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 12,
  },
  resourcesList: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resourcesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  uploadButton: {
    backgroundColor: '#005A9C',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileEmoji: {
    fontSize: 20,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  resourceDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  editButton: {
    padding: 8,
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
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});