import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useTheme } from '../../context/ThemeContext';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    setIsLoading(true);
    // Simulamos el envío del correo
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.xl,
    },
    title: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    description: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      marginBottom: theme.spacing.xl,
    },
    successContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.xl,
    },
    successIcon: {
      marginBottom: theme.spacing.lg,
    },
    successTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.success,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
    },
    successDescription: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    backButton: {
      marginTop: theme.spacing.lg,
    },
  });

  return (
    <Layout
      title="Recuperar contraseña"
      showBackButton={true}
    >
      {!success ? (
        <View>
          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.description}>
            Por favor, ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </Text>

          <Input
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.subtext} />}
          />

          <Button
            title="Enviar instrucciones"
            onPress={handleResetPassword}
            isLoading={isLoading}
            fullWidth={true}
            size="large"
            style={{ marginTop: theme.spacing.md }}
          />
        </View>
      ) : (
        <View style={styles.successContainer}>
          <Ionicons
            name="checkmark-circle-outline"
            size={80}
            color={theme.colors.success}
            style={styles.successIcon}
          />
          <Text style={styles.successTitle}>¡Correo enviado!</Text>
          <Text style={styles.successDescription}>
            Se ha enviado un enlace para restablecer tu contraseña al correo electrónico proporcionado. 
            Por favor revisa tu bandeja de entrada.
          </Text>
          <Button
            title="Volver al inicio de sesión"
            onPress={() => navigation.navigate('Login')}
            variant="outline"
            size="large"
            fullWidth={true}
            style={styles.backButton}
          />
        </View>
      )}
    </Layout>
  );
}