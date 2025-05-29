import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useTheme } from '../../context/ThemeContext';

// Datos de ejemplo para las tareas
const TASKS = [
  { id: '1', description: 'Revisión de inventario', completed: true },
  { id: '2', description: 'Atención de clientes en tienda', completed: true },
  { id: '3', description: 'Limpieza del área de trabajo', completed: false },
  { id: '4', description: 'Actualización de precios', completed: true },
];

export default function CompletedShiftScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  // Información simulada del turno
  const shift = {
    date: '29 de mayo de 2025',
    store: 'Tienda Central',
    startTime: '08:00',
    endTime: '17:00',
    hoursWorked: '9 horas',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    headerIcon: {
      marginBottom: theme.spacing.md,
    },
    headerTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    headerSubtitle: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
    },
    sectionTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    shiftInfoContainer: {
      marginBottom: theme.spacing.md,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    infoLabel: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    infoValue: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
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
    buttonsContainer: {
      marginTop: theme.spacing.xl,
    },
    actionButton: {
      marginBottom: theme.spacing.md,
    },
    disabledButtonContainer: {
      opacity: 0.5,
    },
  });

  // Renderizar un elemento de tarea
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Ionicons 
        name={item.completed ? "checkmark-circle" : "close-circle"} 
        size={24} 
        color={item.completed ? theme.colors.success : theme.colors.danger} 
        style={styles.taskCheckbox}
      />
      <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
        {item.description}
      </Text>
    </View>
  );

  // Calcular estadísticas de tareas
  const completedTasks = TASKS.filter(task => task.completed).length;
  const totalTasks = TASKS.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Layout
      title="Turno finalizado"
      showBackButton={false}
    >
      <View style={styles.container}>
        <Card>
          <View style={styles.headerContainer}>
            <Ionicons 
              name="checkmark-circle-outline"
              size={80}
              color={theme.colors.success}
              style={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>¡Tu turno ha finalizado!</Text>
            <Text style={styles.headerSubtitle}>
              Has completado {completedTasks} de {totalTasks} tareas ({completionPercentage}%)
            </Text>
          </View>

          <View style={styles.shiftInfoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha:</Text>
              <Text style={styles.infoValue}>{shift.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tienda:</Text>
              <Text style={styles.infoValue}>{shift.store}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hora entrada:</Text>
              <Text style={styles.infoValue}>{shift.startTime}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hora salida:</Text>
              <Text style={styles.infoValue}>{shift.endTime}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Horas trabajadas:</Text>
              <Text style={styles.infoValue}>{shift.hoursWorked}</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Tareas del día</Text>
        <Card>
          <FlatList
            data={TASKS}
            keyExtractor={item => item.id}
            renderItem={renderTaskItem}
            scrollEnabled={false}
          />
        </Card>

        <View style={styles.buttonsContainer}>
          <Button
            title="Ver historial"
            onPress={() => navigation.navigate('History')}
            style={styles.actionButton}
            fullWidth={true}
          />
          
          <Button
            title="Realizar solicitud"
            onPress={() => navigation.navigate('Requests')}
            style={styles.actionButton}
            fullWidth={true}
          />

          {/* Botones desactivados */}
          <View style={styles.disabledButtonContainer}>
            <Button
              title="Marcar entrada/salida"
              disabled={true}
              style={styles.actionButton}
              fullWidth={true}
            />

            <Button
              title="Cambio de tienda"
              disabled={true}
              style={styles.actionButton}
              fullWidth={true}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}