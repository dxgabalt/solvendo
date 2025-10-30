import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  useColorScheme as _useColorScheme,
  ColorSchemeName
} from 'react-native';

// Importaciones de temas y contexto
import { ThemeProvider } from './src/context/ThemeContext';
import { lightTheme, darkTheme } from './src/theme/theme';

// Pantallas de autenticación
import LoginScreen from './src/screens/auth/LoginScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

// Pantallas principales
import HomeScreen from './src/screens/main/HomeScreen';
import AttendanceScreen from './src/screens/main/AttendanceScreen';
import CompletedShiftScreen from './src/screens/main/CompletedShiftScreen';
import ChangeStoreScreen from './src/screens/main/ChangeStoreScreen';
import CompleteStoreChangeScreen from './src/screens/main/CompleteStoreChangeScreen';
import RequestsScreen from './src/screens/main/RequestsScreen';
import RequestDetailScreen from './src/screens/main/RequestDetailScreen';
import ScheduleScreen from './src/screens/main/ScheduleScreen';
import TasksScreen from './src/screens/main/TasksScreen';
import HistoryScreen from './src/screens/main/HistoryScreen';
import NotificationsScreen from './src/screens/main/NotificationsScreen';
import DeliveryReceptionScreen from './src/screens/main/DeliveryReceptionScreen';

// Definir tipos de navegación
export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  MainTabs: undefined;
  Attendance: undefined;
  CompletedShift: undefined;
  ChangeStore: undefined;
  CompleteStoreChange: undefined;
  RequestDetail: { requestId: string };
  Schedule: undefined;
  Tasks: undefined;
  Notifications: undefined;
  DeliveryReception: undefined;
};

// Aplicar los tipos al Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Requests') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          // Asegurar que iconName tenga un valor predeterminado
          return <Ionicons name={iconName || 'home'} size={size} color={color} />;
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Inicio' }} 
      />
      <Tab.Screen 
        name="Requests" 
        component={RequestsScreen} 
        options={{ tabBarLabel: 'Solicitudes' }} 
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ tabBarLabel: 'Historial' }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const colorScheme = _useColorScheme() as ColorSchemeName;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#0A84FF' : '#007AFF'} />
      </View>
    );
  }

  return (
    <ThemeProvider initialTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
              <Stack.Group>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                <Stack.Screen name="Attendance" component={AttendanceScreen} />
                <Stack.Screen name="CompletedShift" component={CompletedShiftScreen} />
                <Stack.Screen name="ChangeStore" component={ChangeStoreScreen} />
                <Stack.Screen name="CompleteStoreChange" component={CompleteStoreChangeScreen} />
                <Stack.Screen name="RequestDetail" component={RequestDetailScreen} />
                <Stack.Screen name="Schedule" component={ScheduleScreen} />
                <Stack.Screen name="Tasks" component={TasksScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="DeliveryReception" component={DeliveryReceptionScreen} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}