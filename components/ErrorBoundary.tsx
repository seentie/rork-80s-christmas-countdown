import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/retroColors';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('ErrorBoundary caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary details:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>🎄 Oops! Something went wrong 🎄</Text>
          <Text style={styles.messageText}>
            The app encountered an error but is still running. Please restart the app.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.neonPink,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.neonCyan,
    textAlign: 'center',
    lineHeight: 20,
  },
});
