import { DefaultTheme } from '@react-navigation/native';

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    subtext: string;
    border: string;
    notification: string;
    success: string;
    warning: string;
    danger: string;
    pending: string;
    // UI-specific colors
    buttonText: string;
    buttonBackground: string;
    tabBarBackground: string;
    tabBarInactive: string;
    tabBarActive: string;
    inputBackground: string;
    cardBackground: string;
    shadow: string;
    separator: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
    pill: number;
  };
  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      bold: string;
    };
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
  };
};

// Light theme
export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#007AFF', // Azul brillante para modo claro
    secondary: '#5AC8FA',
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    subtext: '#6E6E73',
    border: '#E5E5EA',
    notification: '#FF3B30',
    success: '#34C759',
    warning: '#FFCC00',
    danger: '#FF3B30',
    pending: '#FF9500',
    buttonText: '#FFFFFF',
    buttonBackground: '#007AFF',
    tabBarBackground: '#FFFFFF',
    tabBarInactive: '#8E8E93',
    tabBarActive: '#007AFF',
    inputBackground: '#FFFFFF',
    cardBackground: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.05)',
    separator: '#E5E5EA',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    pill: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      bold: 'Poppins-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
  },
};

// Dark theme
export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#0A84FF', // Azul brillante para modo oscuro
    secondary: '#64D2FF',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    subtext: '#8E8E93',
    border: '#38383A',
    notification: '#FF453A',
    success: '#30D158',
    warning: '#FFD60A',
    danger: '#FF453A',
    pending: '#FF9F0A',
    buttonText: '#FFFFFF',
    buttonBackground: '#0A84FF',
    tabBarBackground: '#1C1C1E',
    tabBarInactive: '#8E8E93',
    tabBarActive: '#0A84FF',
    inputBackground: '#1C1C1E',
    cardBackground: '#2C2C2E',
    shadow: 'rgba(0, 0, 0, 0.2)',
    separator: '#38383A',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    pill: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      bold: 'Poppins-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
  },
};