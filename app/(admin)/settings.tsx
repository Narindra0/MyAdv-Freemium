import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  University, 
  Palette, 
  Bell, 
  Shield, 
  Database,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { authService } from '@/lib/auth';

const mockSystemSettings = {
  universityName: 'Université de Technologie',
  academicYear: '2024-2025',
  currentSemester: 'Semestre 5',
  systemVersion: '2.1.0',
  lastBackup: '14 Jan 2025, 03:00',
  totalStorage: '2.4 GB',
  usedStorage: '1.8 GB',
};

export default function AdminSettings() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive', 
          onPress: async () => {
            await authService.logout();
            router.replace('/login');
          }
        },
      ]
    );
  };

  const handleBackup = () => {
    Alert.alert(
      'Sauvegarde système',
      'Lancer une sauvegarde complète du système ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Sauvegarder', onPress: () => console.log('Backup started') }
      ]
    );
  };

  const handleRestore = () => {
    Alert.alert(
      'Restauration système',
      'Cette action va restaurer le système à partir de la dernière sauvegarde. Continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Restaurer', style: 'destructive', onPress: () => console.log('Restore started') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#005A9C" strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Paramètres Système</Text>
          <Text style={styles.headerSubtitle}>Configuration générale</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* System Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations système</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <University size={20} color="#005A9C" strokeWidth={2} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Université</Text>
                <Text style={styles.infoValue}>{mockSystemSettings.universityName}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Année académique:</Text>
              <Text style={styles.infoValue}>{mockSystemSettings.academicYear}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Semestre actuel:</Text>
              <Text style={styles.infoValue}>{mockSystemSettings.currentSemester}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Version système:</Text>
              <Text style={styles.infoValue}>{mockSystemSettings.systemVersion}</Text>
            </View>
          </View>
        </View>

        {/* System Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuration</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Palette size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.settingLabel}>Thème et apparence</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Bell size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.settingLabel}>Notifications système</Text>
              </View>
              <TouchableOpacity
                style={[styles.switch, notificationsEnabled && styles.switchActive]}
                onPress={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <View style={[styles.switchThumb, notificationsEnabled && styles.switchThumbActive]} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Shield size={20} color="#6B7280" strokeWidth={2} />
                <Text style={styles.settingLabel}>Mode maintenance</Text>
              </View>
              <TouchableOpacity
                style={[styles.switch, maintenanceMode && styles.switchActive]}
                onPress={() => setMaintenanceMode(!maintenanceMode)}
              >
                <View style={[styles.switchThumb, maintenanceMode && styles.switchThumbActive]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gestion des données</Text>
          <View style={styles.dataCard}>
            <View style={styles.storageInfo}>
              <Database size={24} color="#005A9C" strokeWidth={2} />
              <View style={styles.storageDetails}>
                <Text style={styles.storageLabel}>Stockage utilisé</Text>
                <Text style={styles.storageValue}>
                  {mockSystemSettings.usedStorage} / {mockSystemSettings.totalStorage}
                </Text>
                <View style={styles.storageBar}>
                  <View style={[styles.storageProgress, { width: '75%' }]} />
                </View>
              </View>
            </View>
            
            <Text style={styles.lastBackupText}>
              Dernière sauvegarde: {mockSystemSettings.lastBackup}
            </Text>

            <View style={styles.dataActions}>
              <TouchableOpacity style={styles.dataActionButton} onPress={handleBackup}>
                <Download size={16} color="#005A9C" strokeWidth={2} />
                <Text style={styles.dataActionText}>Sauvegarder</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dataActionButton} onPress={handleRestore}>
                <Upload size={16} color="#005A9C" strokeWidth={2} />
                <Text style={styles.dataActionText}>Restaurer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dataActionButton}>
                <RefreshCw size={16} color="#005A9C" strokeWidth={2} />
                <Text style={styles.dataActionText}>Synchroniser</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* System Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <SettingsIcon size={20} color="#6B7280" strokeWidth={2} />
            <Text style={styles.actionButtonText}>Paramètres avancés</Text>
            <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#DC3545" strokeWidth={2} />
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
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
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchActive: {
    backgroundColor: '#005A9C',
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  dataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  storageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storageDetails: {
    flex: 1,
    marginLeft: 16,
  },
  storageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  storageValue: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  storageBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  storageProgress: {
    height: '100%',
    backgroundColor: '#005A9C',
    borderRadius: 3,
  },
  lastBackupText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  dataActions: {
    flexDirection: 'row',
    gap: 12,
  },
  dataActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    paddingVertical: 12,
  },
  dataActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#005A9C',
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    flex: 1,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC3545',
  },
});