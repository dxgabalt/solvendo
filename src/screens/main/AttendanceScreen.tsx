import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useTheme } from '../../context/ThemeContext';

// Datos de ejemplo para las tiendas
const STORES = [
  { id: '1', name: 'Tienda Central' },
  { id: '2', name: 'Tienda Norte' },
  { id: '3', name: 'Tienda Sur' },
  { id: '4', name: 'Tienda Este' },
];

export default function AttendanceScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [selectedStore, setSelectedStore] = useState(STORES[0].id);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Determinar el tipo de registro (entrada, salida, colación)
  const [registrationType, setRegistrationType] = useState('entrada');

  useEffect(() => {
    // Actualizar fecha y hora actual
    updateDateTime();
    
    // Actualizar la hora cada segundo
    const intervalId = setInterval(updateDateTime, 1000);
    
    // Determinar tipo de registro según la hora
    const hour = new Date().getHours();
    if (hour < 12) {
      setRegistrationType('entrada');
    } else if (hour >= 17) {
      setRegistrationType('salida');
    } else {
      setRegistrationType('colación');
    }

    return () => clearInterval(intervalId);
  }, []);

  const updateDateTime = () => {
    const now = new Date();
    
    // Formatear fecha: día de la semana, día de mes de año
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatted = now.toLocaleDateString('es-ES', options);
    setCurrentDate(dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1));
    
    // Formatear hora: HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  };

  const handleMarkAttendance = () => {
    setIsLoading(true);
    
    // Simulamos el registro de asistencia
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Después de un tiempo, navegar de vuelta a la pantalla principal
      setTimeout(() => {
        navigation.navigate('MainTabs');
      }, 2000);
    }, 1500);
  };

  // Obtener el texto del botón según el tipo de registro
  const getButtonText = () => {
    switch (registrationType) {
      case 'entrada':
        return 'Marcar entrada';
      case 'salida':
        return 'Marcar salida';
      case 'colación':
        return 'Marcar colación';
      default:
        return 'Marcar asistencia';
    }
  };

  // Obtener el texto del título según el tipo de registro
  const getTitleText = () => {
    switch (registrationType) {
      case 'entrada':
        return 'Marcar entrada';
      case 'salida':
        return 'Marcar salida';
      case 'colación':
        return 'Marcar colación';
      default:
        return 'Marcar asistencia';
    }
  };

  const getSelectedStoreName = () => {
    const store = STORES.find(store => store.id === selectedStore);
    return store ? store.name : '';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    timeContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    dateText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    timeText: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xxl * 1.5,
      color: theme.colors.primary,
      marginBottom: theme.spacing.lg,
    },
    storeSelectionContainer: {
      marginBottom: theme.spacing.xl,
    },
    storeSelectionTitle: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    picker: {
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.borderRadius.medium,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.md,
    },
    successContainer: {
      alignItems: 'center',
      marginTop: theme.spacing.xl,
    },
    successIcon: {
      marginBottom: theme.spacing.md,
    },
    successText: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.success,
      textAlign: 'center',
    },
    successDetails: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
    },
  });

  return (
    <Layout
      title={getTitleText()}
      showBackButton={true}
    >
      <View style={styles.container}>
        {!isSuccess ? (
          <>
            <Card>
              <View style={styles.timeContainer}>
                <Text style={styles.dateText}>{currentDate}</Text>
                <Text style={styles.timeText}>{currentTime}</Text>
              </View>

              <View style={styles.storeSelectionContainer}>
                <Text style={styles.storeSelectionTitle}>Selecciona la tienda:</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={selectedStore}
                    onValueChange={(itemValue) => setSelectedStore(itemValue)}
                    dropdownIconColor={theme.colors.text}
                    style={{ color: theme.colors.text }}
                  >
                    {STORES.map(store => (
                      <Picker.Item key={store.id} label={store.name} value={store.id} />
                    ))}
                  </Picker>
                </View>
              </View>

              <Button
                title={getButtonText()}
                onPress={handleMarkAttendance}
                isLoading={isLoading}
                fullWidth={true}
                size="large"
              />
            </Card>
          </>
        ) : (
          <Card>
            <View style={styles.successContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={80}
                color={theme.colors.success}
                style={styles.successIcon}
              />
              <Text style={styles.successText}>
                {registrationType === 'entrada'
                  ? '¡Entrada registrada!'
                  : registrationType === 'salida'
                  ? '¡Salida registrada!'
                  : '¡Colación registrada!'}
              </Text>
              <Text style={styles.successDetails}>
                {`Se ha registrado tu ${registrationType} en ${getSelectedStoreName()} a las ${currentTime}`}
              </Text>
            </View>
          </Card>
        )}
      </View>
    </Layout>
  );
}