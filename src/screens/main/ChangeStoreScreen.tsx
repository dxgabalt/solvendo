import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

// Datos simulados del horario actual
const CURRENT_STORE = {
  id: '1',
  name: 'Tienda Central',
  schedule: {
    start: '8:00',
    end: '17:00',
  },
};

export default function ChangeStoreScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [selectedStore, setSelectedStore] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeStore = () => {
    if (!selectedStore) {
      return;
    }

    setIsLoading(true);
    // Simulamos el procesamiento del cambio
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('CompleteStoreChange', { 
        storeId: selectedStore,
        storeName: getSelectedStoreName(),
      });
    }, 1500);
  };

  const getSelectedStoreName = () => {
    const store = STORES.find(store => store.id === selectedStore);
    return store ? store.name : '';
  };

  // Filtrar la tienda actual para no mostrarla en el picker
  const availableStores = STORES.filter(store => store.id !== CURRENT_STORE.id);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    currentStoreContainer: {
      marginBottom: theme.spacing.lg,
    },
    currentStoreTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    storeInfo: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.medium,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    storeName: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    scheduleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    scheduleLabel: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      marginRight: theme.spacing.sm,
      width: 70,
    },
    scheduleTime: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    newStoreTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    newStoreDescription: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      marginBottom: theme.spacing.md,
    },
    picker: {
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.borderRadius.medium,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.lg,
    },
    noStoresText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
      padding: theme.spacing.lg,
    },
  });

  return (
    <Layout
      title="Cambio de tienda"
      showBackButton={true}
    >
      <View style={styles.container}>
        <View style={styles.currentStoreContainer}>
          <Text style={styles.currentStoreTitle}>Tienda actual</Text>
          <Card>
            <Text style={styles.storeName}>{CURRENT_STORE.name}</Text>
            <View style={styles.scheduleRow}>
              <Text style={styles.scheduleLabel}>Entrada:</Text>
              <Text style={styles.scheduleTime}>{CURRENT_STORE.schedule.start}</Text>
            </View>
            <View style={styles.scheduleRow}>
              <Text style={styles.scheduleLabel}>Salida:</Text>
              <Text style={styles.scheduleTime}>{CURRENT_STORE.schedule.end}</Text>
            </View>
          </Card>
        </View>

        <Text style={styles.newStoreTitle}>Nueva tienda</Text>
        <Text style={styles.newStoreDescription}>
          Por favor selecciona la tienda a la que deseas cambiarte:
        </Text>

        {availableStores.length > 0 ? (
          <Card>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedStore}
                onValueChange={(itemValue) => setSelectedStore(itemValue)}
                dropdownIconColor={theme.colors.text}
                style={{ color: theme.colors.text }}
              >
                <Picker.Item label="Selecciona una tienda" value="" />
                {availableStores.map(store => (
                  <Picker.Item key={store.id} label={store.name} value={store.id} />
                ))}
              </Picker>
            </View>

            <Button
              title="Cambiar de tienda"
              onPress={handleChangeStore}
              isLoading={isLoading}
              disabled={!selectedStore}
              fullWidth={true}
              size="large"
            />
          </Card>
        ) : (
          <Card>
            <Text style={styles.noStoresText}>
              No hay otras tiendas disponibles para cambio
            </Text>
          </Card>
        )}
      </View>
    </Layout>
  );
}