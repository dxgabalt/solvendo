import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SectionList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useTheme } from '../../context/ThemeContext';

// Datos de ejemplo para las tareas
const TASKS_DATA = [
  {
    title: 'Hoy (29/05/2025)',
    data: [
      { id: '1', description: 'Revisión de inventario', completed: false, priority: 'high' },
      { id: '2', description: 'Atención de clientes en tienda', completed: false, priority: 'medium' },
      { id: '3', description: 'Limpieza del área de trabajo', completed: false, priority: 'low' },
      { id: '4', description: 'Actualización de precios', completed: true, priority: 'medium' },
    ]
  },
  {
    title: 'Mañana (30/05/2025)',
    data: [
      { id: '5', description: 'Recepción de mercadería', completed: false, priority: 'high' },
      { id: '6', description: 'Capacitación de seguridad', completed: false, priority: 'high' },
    ]
  },
  {
    title: 'Próxima semana',
    data: [
      { id: '7', description: 'Inventario general', completed: false, priority: 'high' },
      { id: '8', description: 'Preparar informe mensual', completed: false, priority: 'medium' },
      { id: '9', description: 'Reunión de equipo', completed: false, priority: 'medium' },
    ]
  },
  {
    title: 'Completadas',
    data: [
      { id: '10', description: 'Revisión de stock', completed: true, priority: 'medium' },
      { id: '11', description: 'Ordenar almacén', completed: true, priority: 'low' },
      { id: '12', description: 'Llamar a proveedor', completed: true, priority: 'high' },
    ]
  },
];

export default function TasksScreen() {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState(TASKS_DATA);
  const [filterType, setFilterType] = useState('all'); // 'all', 'pending', 'completed'

  const toggleTaskStatus = (sectionIndex, taskId) => {
    const updatedTasks = [...tasks];
    
    // Encontrar la tarea en la sección correspondiente
    const taskIndex = updatedTasks[sectionIndex].data.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      // Cambiar el estado de la tarea
      updatedTasks[sectionIndex].data[taskIndex].completed = !updatedTasks[sectionIndex].data[taskIndex].completed;
      
      setTasks(updatedTasks);
    }
  };

  // Filtrar tareas según el tipo seleccionado
  const getFilteredTasks = () => {
    if (filterType === 'all') {
      return tasks;
    }
    
    return tasks.map(section => ({
      ...section,
      data: section.data.filter(task => 
        filterType === 'completed' ? task.completed : !task.completed
      )
    })).filter(section => section.data.length > 0);
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
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.pill,
      marginRight: theme.spacing.sm,
    },
    filterButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    filterButtonInactive: {
      backgroundColor: theme.colors.cardBackground,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filterText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.sm,
    },
    filterTextActive: {
      color: '#FFFFFF',
    },
    filterTextInactive: {
      color: theme.colors.text,
    },
    sectionHeader: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    noTasksContainer: {
      padding: theme.spacing.xl,
      alignItems: 'center',
    },
    noTasksText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
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
    taskContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
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
    priorityIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: theme.spacing.sm,
    },
    priorityHigh: {
      backgroundColor: theme.colors.danger,
    },
    priorityMedium: {
      backgroundColor: theme.colors.warning,
    },
    priorityLow: {
      backgroundColor: theme.colors.success,
    },
  });

  // Renderizar el indicador de prioridad
  const renderPriorityIndicator = (priority) => {
    let priorityStyle = styles.priorityLow;
    
    if (priority === 'high') {
      priorityStyle = styles.priorityHigh;
    } else if (priority === 'medium') {
      priorityStyle = styles.priorityMedium;
    }
    
    return <View style={[styles.priorityIndicator, priorityStyle]} />;
  };

  // Renderizar un elemento de tarea
  const renderTaskItem = ({ item, section, index }) => {
    // Encontrar el índice de la sección
    const sectionIndex = tasks.findIndex(s => s.title === section.title);
    
    return (
      <TouchableOpacity 
        style={styles.taskItem} 
        onPress={() => toggleTaskStatus(sectionIndex, item.id)}
      >
        <Ionicons 
          name={item.completed ? "checkbox-outline" : "square-outline"} 
          size={24} 
          color={item.completed ? theme.colors.success : theme.colors.text} 
          style={styles.taskCheckbox}
        />
        <View style={styles.taskContent}>
          {renderPriorityIndicator(item.priority)}
          <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Renderizar el encabezado de cada sección
  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  // Renderizar el componente cuando no hay tareas
  const renderEmptyList = () => (
    <Card>
      <View style={styles.noTasksContainer}>
        <Ionicons 
          name="checkmark-done-circle-outline" 
          size={60} 
          color={theme.colors.subtext} 
        />
        <Text style={styles.noTasksText}>
          {filterType === 'completed' 
            ? 'No hay tareas completadas' 
            : filterType === 'pending'
            ? 'No hay tareas pendientes'
            : 'No hay tareas asignadas'}
        </Text>
      </View>
    </Card>
  );

  const filteredTasks = getFilteredTasks();

  return (
    <Layout title="Tareas">
      <View style={styles.container}>
        {/* Filtros de tareas */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton, 
              filterType === 'all' ? styles.filterButtonActive : styles.filterButtonInactive
            ]}
            onPress={() => setFilterType('all')}
          >
            <Text style={[
              styles.filterText, 
              filterType === 'all' ? styles.filterTextActive : styles.filterTextInactive
            ]}>
              Todas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton, 
              filterType === 'pending' ? styles.filterButtonActive : styles.filterButtonInactive
            ]}
            onPress={() => setFilterType('pending')}
          >
            <Text style={[
              styles.filterText, 
              filterType === 'pending' ? styles.filterTextActive : styles.filterTextInactive
            ]}>
              Pendientes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton, 
              filterType === 'completed' ? styles.filterButtonActive : styles.filterButtonInactive
            ]}
            onPress={() => setFilterType('completed')}
          >
            <Text style={[
              styles.filterText, 
              filterType === 'completed' ? styles.filterTextActive : styles.filterTextInactive
            ]}>
              Completadas
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Lista de tareas */}
        {filteredTasks.length > 0 ? (
          <SectionList
            sections={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={renderTaskItem}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
          />
        ) : (
          renderEmptyList()
        )}
      </View>
    </Layout>
  );
}