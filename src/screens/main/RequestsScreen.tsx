import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Status } from '../../components/Status';
import { useTheme } from '../../context/ThemeContext';

// Tipos de solicitud
const REQUEST_TYPES = [
  { id: '1', label: 'Cambio de horario', icon: 'calendar-outline' },
  { id: '2', label: 'Permiso de ausencia', icon: 'time-outline' },
  { id: '3', label: 'Solicitud de vacaciones', icon: 'airplane-outline' },
  { id: '4', label: 'Reembolso de gastos', icon: 'cash-outline' },
  { id: '5', label: 'Problema técnico', icon: 'construct-outline' },
  { id: '6', label: 'Otro', icon: 'help-circle-outline' },
];

// Datos de ejemplo para las solicitudes
const REQUESTS = [
  {
    id: '1',
    type: 'Cambio de horario',
    date: '27/05/2025',
    message: 'Solicito cambio de turno para el día 30 de mayo. Necesito salir antes por un compromiso familiar.',
    status: 'approved',
  },
  {
    id: '2',
    type: 'Permiso de ausencia',
    date: '25/05/2025',
    message: 'Requiero permiso para ausentarme el día 02 de junio por motivos médicos.',
    status: 'pending',
  },
  {
    id: '3',
    type: 'Solicitud de vacaciones',
    date: '20/05/2025',
    message: 'Solicito vacaciones para la semana del 15 al 22 de junio.',
    status: 'rejected',
  },
  {
    id: '4',
    type: 'Problema técnico',
    date: '19/05/2025',
    message: 'El terminal de punto de venta está presentando fallos al procesar pagos con tarjeta de crédito.',
    status: 'approved',
  },
];

export default function RequestsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [requestType, setRequestType] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  const handleSubmitRequest = () => {
    if (!requestType || !message) {
      return;
    }

    setIsLoading(true);
    // Simulamos el envío de la solicitud
    setTimeout(() => {
      setIsLoading(false);
      setShowNewRequestForm(false);
      setRequestType('');
      setMessage('');
      // En una aplicación real, añadiríamos la solicitud al listado
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    title: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
    },
    requestItem: {
      marginBottom: theme.spacing.md,
    },
    requestHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sm,
    },
    requestType: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    requestDate: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
    },
    requestMessage: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    statusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewDetails: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary,
    },
    formTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    formSubtitle: {
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
      marginBottom: theme.spacing.md,
    },
    textArea: {
      height: 120,
      textAlignVertical: 'top',
    },
    noRequests: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
      padding: theme.spacing.xl,
    },
    fabButton: {
      position: 'absolute',
      bottom: theme.spacing.lg,
      right: theme.spacing.lg,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 10,
      display: showNewRequestForm ? 'none' : 'flex',
    },
  });

  // Renderizar un elemento de solicitud
  const renderRequestItem = ({ item }) => (
    <Card 
      style={styles.requestItem}
      onPress={() => navigation.navigate('RequestDetail', { requestId: item.id })}
    >
      <View style={styles.requestHeader}>
        <Text style={styles.requestType}>{item.type}</Text>
        <Text style={styles.requestDate}>{item.date}</Text>
      </View>
      <Text 
        style={styles.requestMessage}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.message}
      </Text>
      <View style={styles.statusContainer}>
        <Status type={item.status} />
        <Text style={styles.viewDetails}>Ver detalle</Text>
      </View>
    </Card>
  );

  return (
    <Layout
      title="Solicitudes"
      rightComponent={
        showNewRequestForm ? (
          <TouchableOpacity onPress={() => setShowNewRequestForm(false)}>
            <Ionicons name="close-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        ) : null
      }
    >
      <View style={styles.container}>
        {!showNewRequestForm ? (
          // Lista de solicitudes existentes
          <>
            {REQUESTS.length > 0 ? (
              <FlatList
                data={REQUESTS}
                keyExtractor={(item) => item.id}
                renderItem={renderRequestItem}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Card>
                <Text style={styles.noRequests}>
                  No tienes solicitudes registradas
                </Text>
              </Card>
            )}
            
            {/* Botón flotante para agregar nueva solicitud */}
            <TouchableOpacity 
              style={styles.fabButton}
              onPress={() => setShowNewRequestForm(true)}
            >
              <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
          </>
        ) : (
          // Formulario para nueva solicitud
          <Card>
            <Text style={styles.formTitle}>Nueva solicitud</Text>
            <Text style={styles.formSubtitle}>
              Por favor completa el formulario para enviar una nueva solicitud.
            </Text>
            
            <Text style={{ marginBottom: theme.spacing.xs, color: theme.colors.text }}>
              Tipo de solicitud:
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={requestType}
                onValueChange={(itemValue) => setRequestType(itemValue)}
                dropdownIconColor={theme.colors.text}
                style={{ color: theme.colors.text }}
              >
                <Picker.Item label="Selecciona un tipo" value="" />
                {REQUEST_TYPES.map(type => (
                  <Picker.Item key={type.id} label={type.label} value={type.id} />
                ))}
              </Picker>
            </View>
            
            <Input
              label="Mensaje"
              placeholder="Describe detalladamente tu solicitud..."
              value={message}
              onChangeText={setMessage}
              multiline={true}
              numberOfLines={4}
              inputStyle={styles.textArea}
            />
            
            <Button
              title="Enviar solicitud"
              onPress={handleSubmitRequest}
              isLoading={isLoading}
              disabled={!requestType || !message}
              fullWidth={true}
              size="large"
              style={{ marginTop: theme.spacing.md }}
            />
          </Card>
        )}
      </View>
    </Layout>
  );
}