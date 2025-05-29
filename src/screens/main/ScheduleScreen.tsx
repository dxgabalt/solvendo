import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { useTheme } from '../../context/ThemeContext';

// Datos de ejemplo para el horario semanal
const SCHEDULE_DATA = [
  {
    id: '1',
    day: 'Lunes',
    date: '27/05/2025',
    start: '08:00',
    end: '17:00',
    location: 'Tienda Central',
    isNightShift: false,
  },
  {
    id: '2',
    day: 'Martes',
    date: '28/05/2025',
    start: '08:00',
    end: '17:00',
    location: 'Tienda Central',
    isNightShift: false,
  },
  {
    id: '3',
    day: 'Miércoles',
    date: '29/05/2025',
    start: '08:00',
    end: '17:00',
    location: 'Tienda Central',
    isNightShift: false,
  },
  {
    id: '4',
    day: 'Jueves',
    date: '30/05/2025',
    start: '13:00',
    end: '22:00',
    location: 'Tienda Norte',
    isNightShift: true,
  },
  {
    id: '5',
    day: 'Viernes',
    date: '31/05/2025',
    start: '13:00',
    end: '22:00',
    location: 'Tienda Norte',
    isNightShift: true,
  },
  {
    id: '6',
    day: 'Sábado',
    date: '01/06/2025',
    start: '09:00',
    end: '14:00',
    location: 'Tienda Central',
    isNightShift: false,
  },
  {
    id: '7',
    day: 'Domingo',
    date: '02/06/2025',
    start: '',
    end: '',
    location: '',
    isNightShift: false,
    dayOff: true,
  },
];

export default function ScheduleScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerCard: {
      marginBottom: theme.spacing.lg,
    },
    headerTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    headerSubtitle: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
    },
    totalHours: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
      marginTop: theme.spacing.sm,
    },
    scheduleCard: {
      marginBottom: theme.spacing.md,
      padding: theme.spacing.md,
      flexDirection: 'row',
    },
    dayInfo: {
      width: 70,
    },
    dayName: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginBottom: 4,
    },
    dayDate: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
    },
    scheduleDetails: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    scheduleTime: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    timeText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
    },
    locationText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
      marginLeft: theme.spacing.md + 2, // Alinear con el texto de horario
    },
    dayOff: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.success,
      marginLeft: theme.spacing.sm,
    },
    currentDay: {
      backgroundColor: `${theme.colors.primary}10`,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
    },
  });

  // Calcular el total de horas programadas para la semana
  const calculateTotalHours = () => {
    let totalMinutes = 0;
    
    SCHEDULE_DATA.forEach(day => {
      if (!day.dayOff && day.start && day.end) {
        const startParts = day.start.split(':');
        const endParts = day.end.split(':');
        
        const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
        const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
        
        totalMinutes += (endMinutes - startMinutes);
      }
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours} horas${minutes > 0 ? ` ${minutes} minutos` : ''}`;
  };

  // Verificar si un día es el actual
  const isCurrentDay = (dayData) => {
    // En una app real, compararíamos con la fecha actual
    // Aquí simulamos que el día actual es el miércoles (29/05/2025)
    return dayData.date === '29/05/2025';
  };

  const renderScheduleItem = ({ item }) => (
    <Card 
      style={[
        styles.scheduleCard, 
        isCurrentDay(item) && styles.currentDay
      ]}
      elevated={isCurrentDay(item)}
    >
      <View style={styles.dayInfo}>
        <Text style={styles.dayName}>{item.day}</Text>
        <Text style={styles.dayDate}>{item.date}</Text>
      </View>
      <View style={styles.scheduleDetails}>
        {item.dayOff ? (
          <View style={styles.scheduleTime}>
            <Ionicons name="home-outline" size={18} color={theme.colors.success} />
            <Text style={styles.dayOff}>Día libre</Text>
          </View>
        ) : (
          <>
            <View style={styles.scheduleTime}>
              <Ionicons 
                name={item.isNightShift ? "moon-outline" : "sunny-outline"} 
                size={18} 
                color={item.isNightShift ? theme.colors.subtext : theme.colors.warning} 
              />
              <Text style={styles.timeText}>
                {item.start} - {item.end}
              </Text>
            </View>
            {item.location && (
              <Text style={styles.locationText}>{item.location}</Text>
            )}
          </>
        )}
      </View>
    </Card>
  );

  return (
    <Layout title="Mi horario">
      <View style={styles.container}>
        <Card style={styles.headerCard}>
          <Text style={styles.headerTitle}>Horario semanal</Text>
          <Text style={styles.headerSubtitle}>
            27 de mayo al 02 de junio, 2025
          </Text>
          <Text style={styles.totalHours}>
            Total: {calculateTotalHours()}
          </Text>
        </Card>

        <FlatList
          data={SCHEDULE_DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderScheduleItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
}