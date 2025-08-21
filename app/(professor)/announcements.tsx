import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Bell, Users, Clock, CreditCard as Edit, Trash2 } from 'lucide-react-native';

const mockProfessorAnnouncements = [
  {
    id: 1,
    title: 'Nouvelle ressource disponible en Programmation Web',
    content: 'Un nouveau tutoriel sur les hooks React est maintenant disponible dans la section ressources du cours.',
    course: 'Programmation Web',
    targetAudience: 'L3 Informatique - Groupe A',
    publishDate: '14 Jan 2025',
    publishTime: '16:45',
    status: 'published',
    views: 23
  },
  {
    id: 2,
    title: 'Rappel : TP Base de Données',
    content: 'N\'oubliez pas d\'apporter votre ordinateur portable pour le TP de demain sur les requêtes SQL avancées.',
    course: 'Base de Données',
    targetAudience: 'L3 Informatique - Groupe B',
    publishDate: '13 Jan 2025',
    publishTime: '18:30',
    status: 'published',
    views: 28
  },
  {
    id: 3,
    title: 'Report du cours de vendredi',
    content: 'Le cours de vendredi 17 janvier est reporté au lundi 20 janvier à la même heure.',
    course: 'Programmation Web',
    targetAudience: 'L3 Informatique - Groupe A',
    publishDate: '12 Jan 2025',
    publishTime: '14:20',
    status: 'draft',
    views: 0
  },
];

export default function ProfessorAnnouncements() {
  const [selectedTab, setSelectedTab] = useState<'published' | 'draft'>('published');

  const handleCreateAnnouncement = () => {
    Alert.alert(
      'Créer une annonce',
      'Fonctionnalité à implémenter avec un formulaire complet',
      [{ text: 'OK' }]
    );
  };

  const handleEditAnnouncement = (id: number) => {
    Alert.alert(
      'Modifier l\'annonce',
      'Fonctionnalité à implémenter',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteAnnouncement = (id: number) => {
    Alert.alert(
      'Supprimer l\'annonce',
      'Êtes-vous sûr de vouloir supprimer cette annonce ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive' }
      ]
    );
  };

  const filteredAnnouncements = mockProfessorAnnouncements.filter(announcement => 
    announcement.status === selectedTab
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Mes Annonces</Text>
            <Text style={styles.headerSubtitle}>Publiez des annonces pour vos étudiants</Text>
          </View>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateAnnouncement}>
            <Plus size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'published' && styles.activeTab]}
            onPress={() => setSelectedTab('published')}
          >
            <Text style={[styles.tabText, selectedTab === 'published' && styles.activeTabText]}>
              Publiées
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'draft' && styles.activeTab]}
            onPress={() => setSelectedTab('draft')}
          >
            <Text style={[styles.tabText, selectedTab === 'draft' && styles.activeTabText]}>
              Brouillons
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredAnnouncements.map((announcement) => (
          <View key={announcement.id} style={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <View style={styles.statusIndicator}>
                <Bell size={16} color={announcement.status === 'published' ? '#28A745' : '#F5A623'} strokeWidth={2} />
                <Text style={[
                  styles.statusText,
                  { color: announcement.status === 'published' ? '#28A745' : '#F5A623' }
                ]}>
                  {announcement.status === 'published' ? 'PUBLIÉE' : 'BROUILLON'}
                </Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditAnnouncement(announcement.id)}
                >
                  <Edit size={16} color="#6B7280" strokeWidth={2} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteAnnouncement(announcement.id)}
                >
                  <Trash2 size={16} color="#DC3545" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.announcementTitle}>{announcement.title}</Text>
            <Text style={styles.announcementContent}>{announcement.content}</Text>

            <View style={styles.announcementMeta}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Cours:</Text>
                <Text style={styles.metaValue}>{announcement.course}</Text>
              </View>
              <View style={styles.metaRow}>
                <Users size={14} color="#6B7280" strokeWidth={2} />
                <Text style={styles.metaValue}>{announcement.targetAudience}</Text>
              </View>
              <View style={styles.metaRow}>
                <Clock size={14} color="#6B7280" strokeWidth={2} />
                <Text style={styles.metaValue}>
                  {announcement.publishDate} à {announcement.publishTime}
                </Text>
              </View>
              {announcement.status === 'published' && (
                <View style={styles.metaRow}>
                  <Text style={styles.viewsText}>{announcement.views} vues</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {filteredAnnouncements.length === 0 && (
          <View style={styles.emptyState}>
            <Bell size={64} color="#E5E7EB" strokeWidth={1} />
            <Text style={styles.emptyStateTitle}>
              {selectedTab === 'published' ? 'Aucune annonce publiée' : 'Aucun brouillon'}
            </Text>
            <Text style={styles.emptyStateText}>
              {selectedTab === 'published' 
                ? 'Créez votre première annonce pour informer vos étudiants'
                : 'Vos brouillons d\'annonces apparaîtront ici'
              }
            </Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={handleCreateAnnouncement}>
              <Plus size={16} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.emptyStateButtonText}>Créer une annonce</Text>
            </TouchableOpacity>
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
  announcementCard: {
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
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 24,
  },
  announcementContent: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  announcementMeta: {
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  metaValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  viewsText: {
    fontSize: 12,
    color: '#28A745',
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