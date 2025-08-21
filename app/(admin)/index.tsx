import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Users, BookOpen, Calendar, Settings, TrendingUp, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Clock, ChevronRight } from 'lucide-react-native';
import { authService } from '@/lib/auth';

const mockAdminStats = {
  totalUsers: 1247,
  activeStudents: 892,
  professors: 45,
  totalCourses: 156,
  activeAnnouncements: 12,
  systemHealth: 'good',
  recentActivity: [
    { id: 1, action: 'Nouvel utilisateur inscrit', user: 'Marie Dubois', time: '5 min' },
    { id: 2, action: 'Cours créé', course: 'Intelligence Artificielle', time: '1h' },
    { id: 3, action: 'Emploi du temps modifié', details: 'L3 Informatique', time: '2h' },
  ],
  alerts: [
    { id: 1, type: 'warning', message: 'Conflit d\'emploi du temps détecté', priority: 'medium' },
    { id: 2, type: 'info', message: 'Maintenance programmée ce weekend', priority: 'low' },
  ]
};

export default function AdminDashboard() {
  const router = useRouter();
  const user = authService.getCurrentUser();

  const navigateTo = (screen: string) => {
    router.push(`/(admin)/${screen}` as any);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle size={20} color="#F5A623" strokeWidth={2} />;
      case 'error': return <AlertCircle size={20} color="#DC3545" strokeWidth={2} />;
      default: return <CheckCircle size={20} color="#005A9C" strokeWidth={2} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <LinearGradient colors={['#005A9C', '#0066B3']} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Tableau de bord</Text>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userRole}>Administrateur</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* System Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques système</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Users size={24} color="#005A9C" strokeWidth={2} />
              <Text style={styles.statNumber}>{mockAdminStats.totalUsers}</Text>
              <Text style={styles.statLabel}>Utilisateurs totaux</Text>
            </View>
            <View style={styles.statCard}>
              <TrendingUp size={24} color="#28A745" strokeWidth={2} />
              <Text style={styles.statNumber}>{mockAdminStats.activeStudents}</Text>
              <Text style={styles.statLabel}>Étudiants actifs</Text>
            </View>
            <View style={styles.statCard}>
              <BookOpen size={24} color="#F5A623" strokeWidth={2} />
              <Text style={styles.statNumber}>{mockAdminStats.totalCourses}</Text>
              <Text style={styles.statLabel}>Cours</Text>
            </View>
            <View style={styles.statCard}>
              <CheckCircle size={24} color="#28A745" strokeWidth={2} />
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Disponibilité</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigateTo('users')}
            >
              <Users size={32} color="#005A9C" strokeWidth={1.5} />
              <Text style={styles.actionText}>Gestion des utilisateurs</Text>
              <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigateTo('courses-management')}
            >
              <BookOpen size={32} color="#005A9C" strokeWidth={1.5} />
              <Text style={styles.actionText}>Gestion des cours</Text>
              <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigateTo('schedule-management')}
            >
              <Calendar size={32} color="#005A9C" strokeWidth={1.5} />
              <Text style={styles.actionText}>Emploi du temps</Text>
              <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => navigateTo('settings')}
            >
              <Settings size={32} color="#005A9C" strokeWidth={1.5} />
              <Text style={styles.actionText}>Paramètres système</Text>
              <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* System Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alertes système</Text>
          {mockAdminStats.alerts.map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.alertContent}>
                {getAlertIcon(alert.type)}
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
              <View style={[
                styles.priorityBadge,
                alert.priority === 'high' && styles.highPriority,
                alert.priority === 'medium' && styles.mediumPriority,
                alert.priority === 'low' && styles.lowPriority,
              ]}>
                <Text style={styles.priorityText}>{alert.priority.toUpperCase()}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité récente</Text>
          {mockAdminStats.recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityDetails}>
                  {activity.user || activity.course || activity.details}
                </Text>
              </View>
              <View style={styles.activityTime}>
                <Clock size={14} color="#6B7280" strokeWidth={2} />
                <Text style={styles.activityTimeText}>Il y a {activity.time}</Text>
              </View>
            </View>
          ))}
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  quickActions: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
    marginLeft: 16,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  alertMessage: {
    fontSize: 14,
    color: '#212529',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  highPriority: {
    backgroundColor: '#FEE2E2',
  },
  mediumPriority: {
    backgroundColor: '#FEF3C7',
  },
  lowPriority: {
    backgroundColor: '#DBEAFE',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityTimeText: {
    fontSize: 12,
    color: '#6B7280',
  },
});