import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

// Datos de ejemplo para las tareas
const TASKS = [
  { id: '1', description: 'Revisión de inventario', completed: false },
  { id: '2', description: 'Atención de clientes en tienda', completed: false },
  { id: '3', description: 'Limpieza del área de trabajo', completed: false },
  { id: '4', description: 'Actualización de precios', completed: true },
];

export default function HomeScreen() {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [tasks, setTasks] = useState(TASKS);

  // Información simulada del usuario
  const user = {
    name: 'Juan Pérez',
    schedule: {
      start: '8:00',
      end: '17:00',
      store: 'Tienda Central',
    },
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Obtener hora actual formateada
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Calcular si el empleado debe marcar entrada o salida
  const getAttendanceStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 8) return 'entrada';
    if (hour >= 17) return 'salida';
    return 'colación';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.cardBackground,
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    welcomeText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    userName: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text,
    },
    content: {
      padding: theme.spacing.md,
    },
    sectionTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    scheduleInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
    },
    scheduleText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    scheduleTime: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    storeText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
      marginTop: theme.spacing.xs,
    },
    quickActionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: theme.spacing.sm,
    },
    actionButton: {
      width: '48%',
      marginBottom: theme.spacing.md,
    },
    actionButtonContent: {
      alignItems: 'center',
      padding: theme.spacing.md,
    },
    actionButtonIcon: {
      marginBottom: theme.spacing.sm,
    },
    actionButtonText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text,
      textAlign: 'center',
    },
    taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    taskCheckbox: {
      marginRight: theme.spacing.sm,
    },
    taskText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      flex: 1,
    },
    taskCompleted: {
      textDecorationLine: 'line-through',
      color: theme.colors.subtext,
    },
    themeToggle: {
      position: 'absolute',
      top: theme.spacing.lg,
      right: theme.spacing.lg,
      padding: theme.spacing.xs,
      borderRadius: theme.borderRadius.pill,
      backgroundColor: theme.colors.cardBackground,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      zIndex: 10,
    },
    noTasks: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
      paddingVertical: theme.spacing.lg,
    },
  });

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.taskItem} 
      onPress={() => toggleTaskStatus(item.id)}
    >
      <Ionicons 
        name={item.completed ? "checkbox-outline" : "square-outline"} 
        size={24} 
        color={item.completed ? theme.colors.success : theme.colors.text} 
        style={styles.taskCheckbox}
      />
      <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <TouchableOpacity 
        style={styles.themeToggle} 
        onPress={toggleTheme}
      >
        <Ionicons 
          name={isDarkMode ? "sunny-outline" : "moon-outline"} 
          size={24} 
          color={theme.colors.text} 
        />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido/a!</Text>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      <View style={styles.content}>
        <Card
          title="Horario actual"
          subtitle={`En ${user.schedule.store}`}
        >
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleText}>Entrada:</Text>
            <Text style={styles.scheduleTime}>{user.schedule.start}</Text>
          </View>
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleText}>Salida:</Text>
            <Text style={styles.scheduleTime}>{user.schedule.end}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Acciones rápidas</Text>

        <View style={styles.quickActionsContainer}>
          <Card
            style={styles.actionButton}
            onPress={() => navigation.navigate('ChangeStore')}
          >
            <View style={styles.actionButtonContent}>
              <Ionicons
                name="storefront-outline"
                size={30}
                color={theme.colors.primary}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Cambio de tienda</Text>
            </View>
          </Card>

          <Card
            style={styles.actionButton}
            onPress={() => navigation.navigate('Attendance')}
          >
            <View style={styles.actionButtonContent}>
              <Ionicons
                name="time-outline"
                size={30}
                color={theme.colors.primary}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Marcar {getAttendanceStatus()}</Text>
            </View>
          </Card>

          <Card
            style={styles.actionButton}
            onPress={() => navigation.navigate('DeliveryReception')}
          >
            <View style={styles.actionButtonContent}>
              <Ionicons
                name="cube-outline"
                size={30}
                color={theme.colors.primary}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Recepción de despacho</Text>
            </View>
          </Card>

          <Card
            style={styles.actionButton}
            onPress={() => navigation.navigate('Schedule')}
          >
            <View style={styles.actionButtonContent}>
              <Ionicons
                name="calendar-outline"
                size={30}
                color={theme.colors.primary}
                style={styles.actionButtonIcon}
              />
              <Text style={styles.actionButtonText}>Ver horario completo</Text>
            </View>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Tareas del día</Text>

        {tasks.length > 0 ? (
          <Card>
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={renderTaskItem}
              scrollEnabled={false}
            />
            <Button
              title="Ver todas las tareas"
              variant="text"
              onPress={() => navigation.navigate('Tasks')}
              style={{ marginTop: theme.spacing.md }}
            />
          </Card>
        ) : (
          <Card>
            <Text style={styles.noTasks}>No hay tareas pendientes para hoy</Text>
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
}