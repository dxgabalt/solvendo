import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useTheme } from '../../context/ThemeContext';

export default function CompleteStoreChangeScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Obtener los datos pasados desde la pantalla anterior
  const { storeId, storeName } = route.params || { storeId: '2', storeName: 'Tienda Norte' };

  useEffect(() => {
    // Actualizamos la hora actual
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  };

  const handleFinishChange = () => {
    setIsLoading(true);
    
    // Simulamos el procesamiento del cambio
    setTimeout(() => {
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    successCard: {
      marginBottom: theme.spacing.xl,
    },
    icon: {
      alignSelf: 'center',
      marginBottom: theme.spacing.md,
    },
    title: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.success,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    infoContainer: {
      marginTop: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: theme.spacing.md,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
    },
    infoLabel: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    infoValue: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
    },
    descriptionCard: {
      marginBottom: theme.spacing.xl,
    },
    descriptionTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    descriptionText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
    },
    bulletItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sm,
    },
    bullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.primary,
      marginTop: 8,
      marginRight: theme.spacing.sm,
    },
  });

  return (
    <Layout
      title="Cambio de tienda"
      showBackButton={false}
    >
      <View style={styles.container}>
        <Card style={styles.successCard}>
          <Ionicons
            name="checkmark-circle-outline"
            size={80}
            color={theme.colors.success}
            style={styles.icon}
          />
          <Text style={styles.title}>¡Cambio exitoso!</Text>
          <Text style={styles.subtitle}>
            Ahora estás asignado a {storeName}
          </Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tienda actual:</Text>
              <Text style={styles.infoValue}>{storeName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hora de cambio:</Text>
              <Text style={styles.infoValue}>{currentTime}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>Información importante</Text>
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.descriptionText}>
              Tu horario de trabajo se mantiene igual
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.descriptionText}>
              Asegúrate de presentarte a tiempo en la nueva ubicación
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.descriptionText}>
              Todas tus tareas asignadas serán actualizadas
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.descriptionText}>
              Si tienes alguna duda, comunícate con tu supervisor
            </Text>
          </View>
        </Card>

        <Button
          title="Finalizar cambio"
          onPress={handleFinishChange}
          isLoading={isLoading}
          fullWidth={true}
          size="large"
        />
      </View>
    </Layout>
  );
}