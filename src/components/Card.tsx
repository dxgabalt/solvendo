import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  icon?: ReactNode;
  rightComponent?: ReactNode;
  footer?: ReactNode;
  elevated?: boolean;
}

export const Card = ({
  title,
  subtitle,
  children,
  style,
  onPress,
  icon,
  rightComponent,
  footer,
  elevated = true,
}: CardProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.medium,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      ...(elevated && {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: title || subtitle ? theme.spacing.sm : 0,
    },
    iconContainer: {
      marginRight: theme.spacing.sm,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    subtitle: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
      marginTop: 2,
    },
    rightComponentContainer: {
      marginLeft: theme.spacing.sm,
    },
    content: {
      // Content styles if needed
    },
    footer: {
      marginTop: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: theme.spacing.sm,
    },
  });

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent style={[styles.container, style]} onPress={onPress}>
      {(title || subtitle || icon || rightComponent) && (
        <View style={styles.header}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {(title || subtitle) && (
            <View style={styles.titleContainer}>
              {title && <Text style={styles.title}>{title}</Text>}
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          )}
          {rightComponent && (
            <View style={styles.rightComponentContainer}>{rightComponent}</View>
          )}
        </View>
      )}
      <View style={styles.content}>{children}</View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </CardComponent>
  );
};