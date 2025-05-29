import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../context/ThemeContext';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function LoginScreen() {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulamos un inicio de sesión
    setTimeout(() => {
      setIsLoading(false);
      // Aquí iría la navegación a la pantalla principal cuando tengamos autenticación
    }, 1500);
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      padding: theme.spacing.xl,
      justifyContent: 'space-between',
    },
    header: {
      alignItems: 'center',
      marginTop: theme.spacing.xl,
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: theme.spacing.lg,
    },
    appName: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xxl,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    tagline: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    formContainer: {
      marginTop: theme.spacing.lg,
    },
    forgotPasswordContainer: {
      alignItems: 'center',
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.xl,
    },
    forgotPasswordText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary,
    },
    footer: {
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    registerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.lg,
    },
    registerText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.subtext,
      marginRight: theme.spacing.xs,
    },
    registerLink: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
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
    }
  });

  // URL de la imagen generada con el servicio
  const logoUrl = "https://api.a0.dev/assets/image?text=Solvendo+Logo&aspect=1:1&seed=123";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={theme.dark ? 'light-content' : 'dark-content'} />
      <TouchableOpacity 
        style={styles.themeToggle} 
        onPress={toggleTheme} 
        accessibilityLabel="Cambiar tema"
      >
        <Ionicons 
          name={isDarkMode ? "sunny-outline" : "moon-outline"} 
          size={24} 
          color={theme.colors.text} 
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={{ uri: logoUrl }} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Solvendo</Text>
          <Text style={styles.tagline}>Gestión de empleados</Text>
        </View>

        <View style={styles.formContainer}>
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

          <Button
            title="Ingresar"
            onPress={handleLogin}
            isLoading={isLoading}
            fullWidth={true}
            size="large"
            style={{ marginTop: theme.spacing.md }}
          />

          <TouchableOpacity 
            style={styles.forgotPasswordContainer} 
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Regístrate con nosotros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}