import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { useTheme } from '../../context/ThemeContext';

// Datos de ejemplo para el historial
const HISTORY_DATA = [
  {
    date: new Date(2025, 4, 26), // Lunes 26 Mayo
    entries: [
      { id: '1', type: 'entrada', time: '08:00', location: 'Tienda Central' },
      { id: '2', type: 'colacion', time: '13:00', location: 'Tienda Central' },
      { id: '3', type: 'colacion_fin', time: '14:00', location: 'Tienda Central' },
      { id: '4', type: 'salida', time: '17:00', location: 'Tienda Central' }
    ],
    hoursWorked: 8
  },
  {
    date: new Date(2025, 4, 27), // Martes 27 Mayo
    entries: [
      { id: '5', type: 'entrada', time: '08:00', location: 'Tienda Central' },
      { id: '6', type: 'colacion', time: '13:00', location: 'Tienda Central' },
      { id: '7', type: 'colacion_fin', time: '14:00', location: 'Tienda Central' },
      { id: '8', type: 'salida', time: '17:00', location: 'Tienda Central' }
    ],
    hoursWorked: 8
  },
  {
    date: new Date(2025, 4, 28), // Miércoles 28 Mayo
    entries: [
      { id: '9', type: 'entrada', time: '08:00', location: 'Tienda Central' },
      { id: '10', type: 'colacion', time: '13:00', location: 'Tienda Central' },
      { id: '11', type: 'colacion_fin', time: '14:00', location: 'Tienda Central' },
      { id: '12', type: 'salida', time: '17:00', location: 'Tienda Central' }
    ],
    hoursWorked: 8
  },
  {
    date: new Date(2025, 4, 29), // Jueves 29 Mayo - Hoy
    entries: [
      { id: '13', type: 'entrada', time: '08:00', location: 'Tienda Central' }
    ],
    hoursWorked: null // Día en curso
  },
  // Los días siguientes no tienen registros aún
];

export default function HistoryScreen() {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 29)); // 29 de Mayo como día actual
  const [weekHistoryData, setWeekHistoryData] = useState(HISTORY_DATA);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generar fechas para la semana actual
  const getCurrentWeekDates = () => {
    const startOfTheWeek = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Lunes como inicio de semana
    const weekDates = [];
    
    // Generar arreglo con los 7 días de la semana
    for (let i = 0; i < 7; i++) {
      const date = addDays(startOfTheWeek, i);
      const dateData = weekHistoryData.find(item => 
        isSameDay(new Date(item.date), date)
      );
      
      weekDates.push({
        date,
        formattedDay: format(date, 'EEE', { locale: es }).substring(0, 3),
        formattedDate: format(date, 'd'),
        hasEntries: !!dateData,
        hoursWorked: dateData?.hoursWorked
      });
    }
    
    return weekDates;
  };

  // Calcular total de horas trabajadas en la semana
  const calculateTotalHoursThisWeek = () => {
    const totalHours = weekHistoryData.reduce((total, day) => {
      return total + (day.hoursWorked || 0);
    }, 0);
    
    return totalHours;
  };

  // Obtener los registros del día seleccionado
  const getSelectedDayEntries = () => {
    const dayData = weekHistoryData.find(item => 
      isSameDay(new Date(item.date), selectedDate)
    );
    
    return dayData ? dayData.entries : [];
  };

  // Simular la actualización de datos
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulamos la carga de datos
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Obtener el texto para el tipo de registro
  const getEntryTypeText = (type) => {
    switch(type) {
      case 'entrada': return 'Entrada';
      case 'salida': return 'Salida';
      case 'colacion': return 'Inicio colación';
      case 'colacion_fin': return 'Fin colación';
      default: return 'Registro';
    }
  };

  // Obtener el ícono para el tipo de registro
  const getEntryTypeIcon = (type) => {
    switch(type) {
      case 'entrada': return 'log-in-outline';
      case 'salida': return 'log-out-outline';
      case 'colacion': return 'cafe-outline';
      case 'colacion_fin': return 'time-outline';
      default: return 'time-outline';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    dateSelector: {
      marginBottom: theme.spacing.md,
    },
    weekContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dayButton: {
      width: 40,
      height: 70,
      alignItems: 'center',
      borderRadius: theme.borderRadius.medium,
      justifyContent: 'center',
      padding: theme.spacing.xs,
    },
    dayButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    dayButtonWithData: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    dayTextContainer: {
      alignItems: 'center',
    },
    dayText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.xs,
      marginBottom: 4,
      textTransform: 'capitalize',
    },
    dayTextActive: {
      color: '#FFFFFF',
    },
    dateText: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
    },
    dateTextActive: {
      color: '#FFFFFF',
    },
    hoursIndicator: {
      position: 'absolute',
      bottom: -4,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.cardBackground,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    hoursText: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.primary,
    },
    summaryCard: {
      marginBottom: theme.spacing.lg,
    },
    summaryTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    summaryLabel: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    summaryValue: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
    },
    selectedDateTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    entryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    entryIcon: {
      marginRight: theme.spacing.sm,
      width: 30,
      alignItems: 'center',
    },
    entryContent: {
      flex: 1,
    },
    entryType: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    entryLocation: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
    },
    entryTime: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
    },
    noEntriesContainer: {
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    noEntriesText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
    },
    refreshButtonContainer: {
      alignItems: 'flex-end',
      marginBottom: theme.spacing.md,
    },
  });

  // Renderizar un día en el selector de fechas
  const renderDayButton = (day) => {
    const isSelected = isSameDay(day.date, selectedDate);
    const isToday = isSameDay(day.date, new Date(2025, 4, 29)); // simular día actual
    
    return (
      <TouchableOpacity
        key={day.formattedDate}
        style={[
          styles.dayButton,
          isSelected ? styles.dayButtonActive : null,
          !isSelected && day.hasEntries ? styles.dayButtonWithData : null,
        ]}
        onPress={() => setSelectedDate(day.date)}
      >
        <View style={styles.dayTextContainer}>
          <Text style={[
            styles.dayText,
            isSelected ? styles.dayTextActive : null
          ]}>
            {day.formattedDay}
          </Text>
          <Text style={[
            styles.dateText,
            isSelected ? styles.dayTextActive : null,
            isToday ? { color: isSelected ? '#FFFFFF' : theme.colors.primary } : null
          ]}>
            {day.formattedDate}
          </Text>
        </View>
        {day.hoursWorked && (
          <View style={styles.hoursIndicator}>
            <Text style={styles.hoursText}>{day.hoursWorked}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Renderizar un elemento de registro de entrada/salida
  const renderEntryItem = ({ item }) => (
    <View style={styles.entryItem}>
      <View style={styles.entryIcon}>
        <Ionicons 
          name={getEntryTypeIcon(item.type)} 
          size={24} 
          color={theme.colors.primary} 
        />
      </View>
      <View style={styles.entryContent}>
        <Text style={styles.entryType}>{getEntryTypeText(item.type)}</Text>
        <Text style={styles.entryLocation}>{item.location}</Text>
      </View>
      <Text style={styles.entryTime}>{item.time}</Text>
    </View>
  );

  const weekDates = getCurrentWeekDates();
  const dayEntries = getSelectedDayEntries();
  const totalWeekHours = calculateTotalHoursThisWeek();
  const selectedDayFormatted = format(selectedDate, 'EEEE d MMMM, yyyy', { locale: es });
  
  // Capitalizar la primera letra del día de la semana
  const formattedDisplayDate = selectedDayFormatted.charAt(0).toUpperCase() + selectedDayFormatted.slice(1);

  return (
    <Layout title="Historial">
      <View style={styles.container}>
        {/* Selector de fechas para la semana */}
        <Card style={styles.dateSelector}>
          <View style={styles.weekContainer}>
            {weekDates.map(day => renderDayButton(day))}
          </View>
        </Card>

        {/* Botón de recarga */}
        <View style={styles.refreshButtonContainer}>
          <TouchableOpacity onPress={handleRefresh} disabled={isRefreshing}>
            <Ionicons 
              name={isRefreshing ? "reload" : "reload-outline"} 
              size={24} 
              color={theme.colors.primary}
              style={{
                ...(isRefreshing && {
                  transform: [{ rotate: '45deg' }]
                })
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Resumen de horas */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen de la semana</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Horas registradas</Text>
            <Text style={styles.summaryValue}>{totalWeekHours} horas</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Horas programadas</Text>
            <Text style={styles.summaryValue}>40 horas</Text>
          </View>
          <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.summaryLabel}>Diferencia</Text>
            <Text style={styles.summaryValue}>
              {totalWeekHours - 40 >= 0 ? '+' : ''}{totalWeekHours - 40} horas
            </Text>
          </View>
        </Card>

        {/* Registros del día seleccionado */}
        <Text style={styles.selectedDateTitle}>
          {formattedDisplayDate}
        </Text>

        <Card>
          {dayEntries.length > 0 ? (
            <FlatList
              data={dayEntries}
              keyExtractor={(item) => item.id}
              renderItem={renderEntryItem}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.noEntriesContainer}>
              <Ionicons 
                name="calendar-outline" 
                size={40} 
                color={theme.colors.subtext}
              />
              <Text style={styles.noEntriesText}>
                No hay registros para este día
              </Text>
            </View>
          )}
        </Card>
      </View>
    </Layout>
  );
}