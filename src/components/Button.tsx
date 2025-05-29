import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const { theme } = useTheme();
  
  // Define styles based on variant
  const getButtonStyles = () => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.medium,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    };

    // Add size specific styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = theme.spacing.xs;
        baseStyle.paddingHorizontal = theme.spacing.sm;
        break;
      case 'medium':
        baseStyle.paddingVertical = theme.spacing.sm;
        baseStyle.paddingHorizontal = theme.spacing.md;
        break;
      case 'large':
        baseStyle.paddingVertical = theme.spacing.md;
        baseStyle.paddingHorizontal = theme.spacing.lg;
        break;
      default:
        baseStyle.paddingVertical = theme.spacing.sm;
        baseStyle.paddingHorizontal = theme.spacing.md;
    }

    // Add variant specific styles
    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? `${theme.colors.buttonBackground}80` : theme.colors.buttonBackground,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? `${theme.colors.secondary}80` : theme.colors.secondary,
          borderWidth: 0,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? `${theme.colors.primary}80` : theme.colors.primary,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingVertical: 0,
          paddingHorizontal: 0,
        };
      default:
        return baseStyle;
    }
  };

  // Define text styles based on variant
  const getTextStyles = () => {
    const baseStyle: TextStyle = {
      fontFamily: theme.typography.fontFamily.medium,
      textAlign: 'center',
    };

    // Add size specific styles
    switch (size) {
      case 'small':
        baseStyle.fontSize = theme.typography.fontSize.sm;
        break;
      case 'medium':
        baseStyle.fontSize = theme.typography.fontSize.md;
        break;
      case 'large':
        baseStyle.fontSize = theme.typography.fontSize.lg;
        break;
      default:
        baseStyle.fontSize = theme.typography.fontSize.md;
    }

    // Add variant specific styles
    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          ...baseStyle,
          color: theme.colors.buttonText,
        };
      case 'outline':
        return {
          ...baseStyle,
          color: disabled ? `${theme.colors.primary}80` : theme.colors.primary,
        };
      case 'text':
        return {
          ...baseStyle,
          color: disabled ? `${theme.colors.primary}80` : theme.colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const buttonStyles = getButtonStyles();
  const textStyles = getTextStyles();

  return (
    <TouchableOpacity
      {...rest}
      style={[
        buttonStyles,
        fullWidth && { width: '100%' },
        style,
      ]}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? theme.colors.primary : theme.colors.buttonText} 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={[textStyles, icon && { marginLeft: theme.spacing.sm }, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};