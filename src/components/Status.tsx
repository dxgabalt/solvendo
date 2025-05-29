import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type StatusType = 'approved' | 'pending' | 'rejected';

interface StatusProps {
  type: StatusType;
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Status = ({ 
  type, 
  text,
  size = 'medium'
}: StatusProps) => {
  const { theme } = useTheme();

  const getStatusColor = () => {
    switch (type) {
      case 'approved':
        return theme.colors.success;
      case 'pending':
        return theme.colors.pending;
      case 'rejected':
        return theme.colors.danger;
      default:
        return theme.colors.secondary;
    }
  };

  const getStatusText = () => {
    if (text) return text;
    
    switch (type) {
      case 'approved':
        return 'Aprobado';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazado';
      default:
        return '';
    }
  };

  const getPaddingSize = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
          fontSize: theme.typography.fontSize.xs,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          fontSize: theme.typography.fontSize.md,
        };
      case 'medium':
      default:
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
          fontSize: theme.typography.fontSize.sm,
        };
    }
  };

  const paddingSizes = getPaddingSize();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: `${getStatusColor()}20`, // 20% opacity
      borderRadius: theme.borderRadius.pill,
      paddingVertical: paddingSizes.paddingVertical,
      paddingHorizontal: paddingSizes.paddingHorizontal,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: getStatusColor(),
      marginRight: theme.spacing.xs,
    },
    text: {
      color: getStatusColor(),
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: paddingSizes.fontSize,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>{getStatusText()}</Text>
    </View>
  );
};