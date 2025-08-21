import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Search, Filter, MoveVertical as MoreVertical, UserCheck, UserX } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const mockUsers = [
  {
    id: '2023001',
    name: 'Marie Dupont',
    email: 'marie.dupont@univ-example.fr',
    role: 'student',
    status: 'active',
    year: 'L3 Informatique',
    lastLogin: '2 heures'
  },
  {
    id: 'prof001',
    name: 'Dr. Jean Martin',
    email: 'jean.martin@univ-example.fr',
    role: 'professor',
    status: 'active',
    department: 'Informatique',
    lastLogin: '1 jour'
  },
  {
    id: '2023002',
    name: 'Pierre Durand',
    email: 'pierre.durand@univ-example.fr',
    role: 'student',
    status: 'inactive',
    year: 'L2 Mathématiques',
    lastLogin: '1 semaine'
  },
  {
    id: 'prof002',
    name: 'Dr. Sophie Leroy',
    email: 'sophie.leroy@univ-example.fr',
    role: 'professor',
    status: 'active',
    department: 'Mathématiques',
    lastLogin: '3 heures'
  },
];

export default function UsersManagement() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'student' | 'professor'>('all');

  const handleCreateUser = () => {
    Alert.alert(
      'Créer un utilisateur',
      'Fonctionnalité à implémenter avec un formulaire complet',
      [{ text: 'OK' }]
    );
  };

  const handleUserAction = (userId: string, action: string) => {
    Alert.alert(
      `${action} utilisateur`,
      `Êtes-vous sûr de vouloir ${action.toLowerCase()} cet utilisateur ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', style: 'destructive' }
      ]
    );
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'Étudiant';
      case 'professor': return 'Professeur';
      case 'admin': return 'Administrateur';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return '#005A9C';
      case 'professor': return '#28A745';
      case 'admin': return '#DC3545';
      default: return '#6B7280';
    }
  };

  const filteredUsers = mockUsers.filter(user => 
    selectedFilter === 'all' || user.role === selectedFilter
  );

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
            <Text style={styles.headerTitle}>Gestion des Utilisateurs</Text>
            <Text style={styles.headerSubtitle}>{filteredUsers.length} utilisateurs</Text>
          </View>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
            <Plus size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.activeFilter]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>
              Tous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'student' && styles.activeFilter]}
            onPress={() => setSelectedFilter('student')}
          >
            <Text style={[styles.filterText, selectedFilter === 'student' && styles.activeFilterText]}>
              Étudiants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'professor' && styles.activeFilter]}
            onPress={() => setSelectedFilter('professor')}
          >
            <Text style={[styles.filterText, selectedFilter === 'professor' && styles.activeFilterText]}>
              Professeurs
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <View style={styles.userHeader}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                    <Text style={styles.roleBadgeText}>{getRoleLabel(user.role)}</Text>
                  </View>
                </View>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userMeta}>
                  {user.role === 'student' ? user.year : user.department} • 
                  Dernière connexion: {user.lastLogin}
                </Text>
              </View>
            </View>
            
            <View style={styles.userActions}>
              <View style={[
                styles.statusIndicator,
                user.status === 'active' ? styles.activeStatus : styles.inactiveStatus
              ]}>
                {user.status === 'active' ? (
                  <UserCheck size={16} color="#28A745" strokeWidth={2} />
                ) : (
                  <UserX size={16} color="#DC3545" strokeWidth={2} />
                )}
              </View>
              <TouchableOpacity 
                style={styles.moreButton}
                onPress={() => Alert.alert('Actions', 'Menu d\'actions à implémenter')}
              >
                <MoreVertical size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
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
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilter: {
    backgroundColor: '#005A9C',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#005A9C',
  },
  userDetails: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginRight: 8,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userMeta: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    padding: 6,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: '#F0FDF4',
  },
  inactiveStatus: {
    backgroundColor: '#FEF2F2',
  },
  moreButton: {
    padding: 8,
  },
});