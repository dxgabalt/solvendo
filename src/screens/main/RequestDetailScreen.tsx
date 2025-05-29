import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Status } from '../../components/Status';
import { useTheme } from '../../context/ThemeContext';

// Datos de ejemplo para las solicitudes (simulando una base de datos)
const REQUEST_DATA = [
  {
    id: '1',
    type: 'Cambio de horario',
    date: '27/05/2025',
    time: '14:35',
    message: 'Solicito cambio de turno para el día 30 de mayo. Necesito salir antes por un compromiso familiar importante. Podría recuperar las horas el sábado 31 de mayo si es necesario.',
    status: 'approved',
    responses: [
      {
        id: '1',
        from: 'Supervisor',
        date: '27/05/2025',
        time: '16:20',
        message: 'Solicitud aprobada. Por favor coordina con Juan para el cambio de turno del día 30.',
      }
    ]
  },
  {
    id: '2',
    type: 'Permiso de ausencia',
    date: '25/05/2025',
    time: '09:15',
    message: 'Requiero permiso para ausentarme el día 02 de junio por motivos médicos. Tengo una cita médica programada para ese día y necesito asistir. Adjunto copia de la cita médica.',
    status: 'pending',
    responses: []
  },
  {
    id: '3',
    type: 'Solicitud de vacaciones',
    date: '20/05/2025',
    time: '11:45',
    message: 'Solicito vacaciones para la semana del 15 al 22 de junio. Tengo planeado un viaje familiar y ya he coordinado con mis compañeros para cubrir mis responsabilidades durante ese período.',
    status: 'rejected',
    responses: [
      {
        id: '1',
        from: 'Recursos Humanos',
        date: '22/05/2025',
        time: '10:30',
        message: 'Lo sentimos, pero no podemos aprobar esta solicitud en este momento debido a la alta demanda esperada para esas fechas. Por favor considera reprogramar para una fecha posterior o coordinar con más antelación.',
      }
    ]
  },
  {
    id: '4',
    type: 'Problema técnico',
    date: '19/05/2025',
    time: '16:20',
    message: 'El terminal de punto de venta está presentando fallos al procesar pagos con tarjeta de crédito. Hemos tenido que rechazar varias ventas hoy debido a este problema. Necesitamos soporte técnico urgente.',
    status: 'approved',
    responses: [
      {
        id: '1',
        from: 'Soporte IT',
        date: '19/05/2025',
        time: '17:05',
        message: 'Gracias por reportar el problema. Un técnico visitará la tienda mañana a primera hora para revisar y solucionar el terminal.',
      },
      {
        id: '2',
        from: 'Supervisor',
        date: '20/05/2025',
        time: '09:30',
        message: 'El técnico ya solucionó el problema. Por favor verificar que todo funcione correctamente y reportar cualquier nuevo inconveniente.',
      }
    ]
  },
];

export default function RequestDetailScreen() {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  
  // Obtener ID de la solicitud desde los parámetros de navegación
  const { requestId } = route.params || { requestId: '1' };
  
  // Buscar la solicitud en los datos de ejemplo
  const request = REQUEST_DATA.find(req => req.id === requestId);
  
  if (!request) {
    return (
      <Layout title="Detalle de solicitud" showBackButton={true}>
        <Card>
          <Text style={{ textAlign: 'center', color: theme.colors.subtext }}>
            Solicitud no encontrada
          </Text>
        </Card>
      </Layout>
    );
  }

  // Determinar el color y el icono según el estado
  const getStatusBarStyle = () => {
    switch (request.status) {
      case 'approved':
        return {
          color: theme.colors.success,
          icon: 'checkmark-circle-outline',
        };
      case 'rejected':
        return {
          color: theme.colors.danger,
          icon: 'close-circle-outline',
        };
      case 'pending':
      default:
        return {
          color: theme.colors.pending,
          icon: 'time-outline',
        };
    }
  };

  const statusStyle = getStatusBarStyle();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBar: {
      backgroundColor: statusStyle.color,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.medium,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    statusIcon: {
      marginRight: theme.spacing.sm,
    },
    statusText: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: '#FFFFFF',
    },
    card: {
      marginBottom: theme.spacing.lg,
    },
    cardTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    requestHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
    },
    requestType: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    requestDateTime: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
    },
    requestMessage: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      lineHeight: 22,
    },
    responseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sm,
      paddingBottom: theme.spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    responseFrom: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    responseDateTime: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
    },
    responseMessage: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      lineHeight: 22,
    },
    noResponses: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
      padding: theme.spacing.lg,
    },
    footer: {
      marginTop: theme.spacing.md,
    },
  });

  return (
    <Layout
      title="Detalle de solicitud"
      showBackButton={true}
    >
      <View style={styles.container}>
        {/* Barra de estado */}
        <View style={styles.statusBar}>
          <Ionicons
            name={statusStyle.icon}
            size={24}
            color="#FFFFFF"
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>
            {request.status === 'approved' 
              ? 'Solicitud aprobada' 
              : request.status === 'rejected'
              ? 'Solicitud rechazada'
              : 'Solicitud pendiente'
            }
          </Text>
        </View>

        {/* Detalles de la solicitud */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Detalles de la solicitud</Text>
          <View style={styles.requestHeader}>
            <Text style={styles.requestType}>{request.type}</Text>
            <Text style={styles.requestDateTime}>
              {request.date} - {request.time}
            </Text>
          </View>
          <Text style={styles.requestMessage}>
            {request.message}
          </Text>
        </Card>

        {/* Respuestas */}
        <Text style={styles.cardTitle}>Respuestas</Text>
        <Card style={styles.card}>
          {request.responses.length > 0 ? (
            request.responses.map((response) => (
              <View key={response.id} style={{ marginBottom: theme.spacing.md }}>
                <View style={styles.responseHeader}>
                  <Text style={styles.responseFrom}>{response.from}</Text>
                  <Text style={styles.responseDateTime}>
                    {response.date} - {response.time}
                  </Text>
                </View>
                <Text style={styles.responseMessage}>
                  {response.message}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noResponses}>
              Aún no hay respuestas a esta solicitud
            </Text>
          )}
        </Card>

        {/* Botones de acción */}
        <View style={styles.footer}>
          {request.status === 'pending' && (
            <Button
              title="Cancelar solicitud"
              variant="outline"
              fullWidth={true}
              onPress={() => navigation.goBack()}
            />
          )}
        </View>
      </View>
    </Layout>
  );
}