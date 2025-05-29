import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { useTheme } from '../../context/ThemeContext';

// Datos de ejemplo para notificaciones
const NOTIFICATIONS_DATA = [
  {
    id: '1',
    title: 'Cambio de horario',
    message: 'Tu solicitud de cambio de horario ha sido aprobada.',
    date: '29/05/2025',
    time: '10:30',
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'Nueva tarea asignada',
    message: 'Se te ha asignado una nueva tarea: "Revisión de inventario".',
    date: '29/05/2025',
    time: '09:15',
    read: false,
    type: 'info',
  },
  {
    id: '3',
    title: 'Recordatorio',
    message: 'Mañana tienes programada una capacitación de seguridad a las 10:00.',
    date: '29/05/2025',
    time: '08:00',
    read: true,
    type: 'info',
  },
  {
    id: '4',
    title: 'Cambio de tienda',
    message: 'Tu turno de mañana será en Tienda Norte en vez de Tienda Central.',
    date: '28/05/2025',
    time: '17:45',
    read: true,
    type: 'warning',
  },
  {
    id: '5',
    title: 'Solicitud rechazada',
    message: 'Tu solicitud de vacaciones para la semana del 15 al 22 de junio ha sido rechazada.',
    date: '28/05/2025',
    time: '14:20',
    read: true,
    type: 'error',
  },
];

// Agrupar notificaciones por fecha
const groupNotificationsByDate = (notifications) => {
  const grouped = {};
  
  notifications.forEach(notification => {
    const date = notification.date;
    
    if (!grouped[date]) {
      grouped[date] = [];
    }
    
    grouped[date].push(notification);
  });
  
  // Convertir a formato para SectionList
  const sections = Object.keys(grouped).map(date => {
    // Determinar si la fecha es "Hoy" o "Ayer"
    let title;
    if (date === '29/05/2025') {
      title = 'Hoy';
    } else if (date === '28/05/2025') {
      title = 'Ayer';
    } else {
      title = date;
    }
    
    return {
      title,
      data: grouped[date],
    };
  });
  
  // Ordenar secciones para que "Hoy" aparezca primero
  return sections.sort((a, b) => {
    if (a.title === 'Hoy') return -1;
    if (b.title === 'Hoy') return 1;
    if (a.title === 'Ayer') return -1;
    if (b.title === 'Ayer') return 1;
    return 0;
  });
};

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'unread', 'read'

  // Marcar notificación como leída
  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  // Filtrar notificaciones según filtro activo
  const getFilteredNotifications = () => {
    if (activeFilter === 'all') {
      return notifications;
    }
    
    return notifications.filter(notification => 
      activeFilter === 'unread' ? !notification.read : notification.read
    );
  };

  // Obtener ícono según tipo de notificación
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return {
          name: 'checkmark-circle-outline',
          color: theme.colors.success,
        };
      case 'warning':
        return {
          name: 'alert-circle-outline',
          color: theme.colors.warning,
        };
      case 'error':
        return {
          name: 'close-circle-outline',
          color: theme.colors.danger,
        };
      case 'info':
      default:
        return {
          name: 'information-circle-outline',
          color: theme.colors.primary,
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    filtersContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
    },
    filterButton: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      alignItems: 'center',
      borderBottomWidth: 2,
    },
    filterButtonActive: {
      borderBottomColor: theme.colors.primary,
    },
    filterButtonInactive: {
      borderBottomColor: 'transparent',
    },
    filterText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
    },
    filterTextActive: {
      color: theme.colors.primary,
    },
    filterTextInactive: {
      color: theme.colors.subtext,
    },
    sectionHeader: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    notificationCard: {
      marginBottom: theme.spacing.md,
    },
    notificationUnread: {
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    iconContainer: {
      marginRight: theme.spacing.sm,
    },
    contentContainer: {
      flex: 1,
    },
    notificationTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginBottom: 2,
    },
    notificationMessage: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    notificationFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.sm,
    },
    notificationTime: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
    },
    markAsReadButton: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary,
    },
    noNotificationsContainer: {
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    noNotificationsText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
      marginTop: theme.spacing.md,
    },
  });

  // Renderizar una notificación
  const renderNotification = ({ item }) => {
    const icon = getNotificationIcon(item.type);
    
    return (
      <Card 
        style={[
          styles.notificationCard, 
          !item.read && styles.notificationUnread
        ]}
      >
        <View style={styles.notificationHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon.name} size={24} color={icon.color} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
          </View>
        </View>
        
        <View style={styles.notificationFooter}>
          <Text style={styles.notificationTime}>
            {item.time} - {item.date === '29/05/2025' ? 'Hoy' : item.date === '28/05/2025' ? 'Ayer' : item.date}
          </Text>
          
          {!item.read && (
            <TouchableOpacity onPress={() => markAsRead(item.id)}>
              <Text style={styles.markAsReadButton}>
                Marcar como leído
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    );
  };

  // Renderizar cuando no hay notificaciones
  const renderEmptyState = () => (
    <View style={styles.noNotificationsContainer}>
      <Ionicons 
        name="notifications-off-outline" 
        size={60} 
        color={theme.colors.subtext} 
      />
      <Text style={styles.noNotificationsText}>
        {activeFilter === 'all' 
          ? 'No tienes notificaciones' 
          : activeFilter === 'unread' 
          ? 'No tienes notificaciones sin leer' 
          : 'No tienes notificaciones leídas'}
      </Text>
    </View>
  );

  // Obtener notificaciones filtradas
  const filteredNotifications = getFilteredNotifications();

  return (
    <Layout title="Notificaciones">
      <View style={styles.container}>
        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton, 
              activeFilter === 'all' ? styles.filterButtonActive : styles.filterButtonInactive
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[
              styles.filterText, 
              activeFilter === 'all' ? styles.filterTextActive : styles.filterTextInactive
            ]}>
              Todas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton, 
              activeFilter === 'unread' ? styles.filterButtonActive : styles.filterButtonInactive
            ]}
            onPress={() => setActiveFilter('unread')}
          >
            <Text style={[
              styles.filterText, 
              activeFilter === 'unread' ? styles.filterTextActive : styles.filterTextInactive
            ]}>
              Sin leer
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton, 
              activeFilter === 'read' ? styles.filterButtonActive : styles.filterButtonInactive
            ]}
            onPress={() => setActiveFilter('read')}
          >
            <Text style={[
              styles.filterText, 
              activeFilter === 'read' ? styles.filterTextActive : styles.filterTextInactive
            ]}>
              Leídas
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Lista de notificaciones */}
        {filteredNotifications.length > 0 ? (
          <FlatList
            data={filteredNotifications}
            keyExtractor={item => item.id}
            renderItem={renderNotification}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          renderEmptyState()
        )}
      </View>
    </Layout>
  );
}