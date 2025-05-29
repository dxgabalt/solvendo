import React, { ReactNode } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  rightComponent?: ReactNode;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  scrollable?: boolean;
  showHeader?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  safeAreaColor?: string;
}

export const Layout = ({
  children,
  title,
  showBackButton = false,
  rightComponent,
  style,
  containerStyle,
  scrollable = true,
  showHeader = true,
  headerLeft,
  headerRight,
  safeAreaColor,
}: LayoutProps) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: safeAreaColor || theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: theme.spacing.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.cardBackground,
    },
    headerTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontFamily: theme.typography.fontFamily.bold,
      color: theme.colors.text,
      flex: 1,
    },
    backButton: {
      paddingRight: theme.spacing.sm,
    },
    headerLeftContainer: {
      marginRight: theme.spacing.sm,
    },
    headerRightContainer: {
      marginLeft: theme.spacing.sm,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {showHeader && (
          <View style={styles.header}>
            {headerLeft ? (
              <View style={styles.headerLeftContainer}>{headerLeft}</View>
            ) : showBackButton ? (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            ) : null}
            
            {title && <Text style={styles.headerTitle}>{title}</Text>}
            
            {headerRight ? headerRight : rightComponent}
          </View>
        )}
        
        {scrollable ? (
          <ScrollView
            style={[styles.container, containerStyle]}
            contentContainerStyle={[styles.content, style]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.container, containerStyle, styles.content, style]}>
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};