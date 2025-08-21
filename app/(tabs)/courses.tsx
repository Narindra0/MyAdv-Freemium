import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, FileText, Download, Clock } from 'lucide-react-native';

const mockCourses = [
  {
    id: 1,
    name: 'Programmation Web',
    professor: 'Dr. Martin',
    semester: 'S5',
    resources: [
      { id: 1, title: 'Introduction à React', type: 'pdf', size: '2.5 MB', date: '10 Jan' },
      { id: 2, title: 'TP1 - Composants React', type: 'pdf', size: '1.8 MB', date: '12 Jan' },
      { id: 3, title: 'Slides - Hooks React', type: 'pptx', size: '4.2 MB', date: '15 Jan' },
    ]
  },
  {
    id: 2,
    name: 'Base de Données',
    professor: 'Dr. Leroy',
    semester: 'S5',
    resources: [
      { id: 4, title: 'Modèle relationnel', type: 'pdf', size: '3.1 MB', date: '08 Jan' },
      { id: 5, title: 'Exercices SQL', type: 'docx', size: '1.2 MB', date: '11 Jan' },
    ]
  },
  {
    id: 3,
    name: 'Algorithmes',
    professor: 'Dr. Bernard',
    semester: 'S5',
    resources: [
      { id: 6, title: 'Complexité algorithmique', type: 'pdf', size: '2.9 MB', date: '09 Jan' },
      { id: 7, title: 'TD - Arbres binaires', type: 'pdf', size: '1.5 MB', date: '13 Jan' },
    ]
  },
  {
    id: 4,
    name: 'Réseaux',
    professor: 'Dr. Petit',
    semester: 'S5',
    resources: [
      { id: 8, title: 'Protocoles TCP/IP', type: 'pdf', size: '4.8 MB', date: '07 Jan' },
    ]
  },
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'docx':
        return '📝';
      case 'pptx':
        return '📊';
      default:
        return '📁';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Cours</Text>
        <Text style={styles.headerSubtitle}>Semestre 5 • 2024-2025</Text>
      </View>

      <ScrollView style={styles.content}>
        {mockCourses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <TouchableOpacity
              style={styles.courseHeader}
              onPress={() => setSelectedCourse(
                selectedCourse === course.id ? null : course.id
              )}
            >
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseProfessor}>{course.professor}</Text>
                <Text style={styles.courseDetails}>
                  {course.semester} • {course.resources.length} ressource(s)
                </Text>
              </View>
              <ChevronRight
                size={24}
                color="#6B7280"
                strokeWidth={2}
                style={[
                  styles.chevron,
                  selectedCourse === course.id && styles.chevronRotated
                ]}
              />
            </TouchableOpacity>

            {selectedCourse === course.id && (
              <View style={styles.resourcesList}>
                <Text style={styles.resourcesTitle}>Ressources disponibles</Text>
                {course.resources.map((resource) => (
                  <TouchableOpacity key={resource.id} style={styles.resourceItem}>
                    <View style={styles.resourceIcon}>
                      <Text style={styles.fileEmoji}>{getFileIcon(resource.type)}</Text>
                    </View>
                    <View style={styles.resourceInfo}>
                      <Text style={styles.resourceTitle}>{resource.title}</Text>
                      <View style={styles.resourceMeta}>
                        <Clock size={14} color="#6B7280" strokeWidth={2} />
                        <Text style={styles.resourceDate}>{resource.date}</Text>
                        <Text style={styles.resourceSize}>{resource.size}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download size={20} color="#005A9C" strokeWidth={2} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
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
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 6,
  },
  courseProfessor: {
    fontSize: 16,
    color: '#005A9C',
    fontWeight: '500',
    marginBottom: 4,
  },
  courseDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  resourcesList: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resourcesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginTop: 16,
    marginBottom: 12,
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
  resourceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resourceDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  resourceSize: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  downloadButton: {
    padding: 8,
  },
});