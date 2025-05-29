import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useTheme } from '../../context/ThemeContext';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    // Validación básica
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    // Simulamos el registro
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Registro exitoso', 
        'Tu cuenta ha sido creada exitosamente. Por favor inicia sesión.',
        [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]
      );
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing.md,
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
    form: {
      marginTop: theme.spacing.sm,
    },
    footer: {
      marginTop: theme.spacing.xl,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing.lg,
    },
    loginText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      marginRight: theme.spacing.xs,
    },
    loginLink: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
    },
  });

  return (
    <Layout
      title="Registro"
      showBackButton={true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.description}>
          Por favor completa todos los campos para registrarte en Solvendo.
        </Text>

        <View style={styles.form}>
          <Input
            label="Nombre completo"
            placeholder="Juan Pérez"
            value={name}
            onChangeText={setName}
            leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.subtext} />}
          />

          <Input
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.subtext} />}
          />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.subtext} />}
          />

          <Input
            label="Confirmar contraseña"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword={true}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.subtext} />}
          />

          <Button
            title="Registrarme"
            onPress={handleRegister}
            isLoading={isLoading}
            fullWidth={true}
            size="large"
            style={{ marginTop: theme.spacing.md }}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
            <Text 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              Inicia sesión
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
}