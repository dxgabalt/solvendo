import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useTheme } from '../../context/ThemeContext';

// Datos de ejemplo para los productos a recibir
const INITIAL_PRODUCTS = [
  { id: '1', name: 'Laptop Acer Aspire 5', sku: 'LAP-AC-001', quantity: 2, received: false },
  { id: '2', name: 'Mouse Logitech G502', sku: 'MOU-LG-045', quantity: 5, received: false },
  { id: '3', name: 'Teclado Mecánico Redragon K552', sku: 'KEY-RD-033', quantity: 3, received: false },
  { id: '4', name: 'Monitor Samsung 24"', sku: 'MON-SM-012', quantity: 2, received: false },
  { id: '5', name: 'Audífonos Sony WH-1000XM4', sku: 'AUD-SN-008', quantity: 4, received: false },
];

export default function DeliveryReceptionScreen() {
  const { theme } = useTheme();
  const [guideNumber, setGuideNumber] = useState('');
  const [scanning, setScanning] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProductsChecked, setAllProductsChecked] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [guideLoaded, setGuideLoaded] = useState(false);

  // Simular el escaneo de una guía
  const handleScanGuide = () => {
    if (!guideNumber.trim()) {
      Alert.alert('Error', 'Por favor ingresa un número de guía válido');
      return;
    }

    setScanning(true);

    // Simular carga de datos
    setTimeout(() => {
      setProducts(INITIAL_PRODUCTS);
      setGuideLoaded(true);
      setScanning(false);
    }, 1500);
  };

  // Cambiar el estado de un producto (recibido o no)
  const toggleProductReceived = (productId) => {
    const updatedProducts = products.map(product => 
      product.id === productId
        ? { ...product, received: !product.received }
        : product
    );
    
    setProducts(updatedProducts);
    
    // Verificar si todos los productos están marcados
    const allChecked = updatedProducts.every(product => product.received);
    setAllProductsChecked(allChecked);
  };

  // Marcar o desmarcar todos los productos
  const toggleAllProducts = () => {
    const updatedProducts = products.map(product => ({
      ...product,
      received: !allProductsChecked,
    }));
    
    setProducts(updatedProducts);
    setAllProductsChecked(!allProductsChecked);
  };

  // Confirmar la recepción de productos
  const handleConfirm = () => {
    if (products.some(product => !product.received)) {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro que deseas confirmar? Hay productos que no han sido marcados como recibidos.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: submitConfirmation }
        ]
      );
    } else {
      submitConfirmation();
    }
  };

  // Enviar la confirmación de recepción
  const submitConfirmation = () => {
    setConfirming(true);
    
    // Simular procesamiento
    setTimeout(() => {
      setConfirming(false);
      setConfirmed(true);
    }, 1500);
  };

  // Reiniciar el proceso
  const handleReset = () => {
    setGuideNumber('');
    setProducts([]);
    setAllProductsChecked(false);
    setGuideLoaded(false);
    setConfirmed(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    guideSection: {
      marginBottom: theme.spacing.lg,
    },
    guideInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    guideInput: {
      flex: 1,
      height: 48,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.md,
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      marginRight: theme.spacing.md,
      backgroundColor: theme.colors.inputBackground,
    },
    sectionTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    scanningText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
      marginTop: theme.spacing.md,
      textAlign: 'center',
    },
    productsListContainer: {
      marginTop: theme.spacing.md,
    },
    checkAllContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: theme.spacing.sm,
    },
    checkAllText: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    productItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    productCheckbox: {
      marginRight: theme.spacing.sm,
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    productSku: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.subtext,
      marginTop: 2,
    },
    productQuantity: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.primary,
      marginLeft: theme.spacing.sm,
      width: 30,
      textAlign: 'center',
    },
    confirmButtonContainer: {
      marginTop: theme.spacing.xl,
    },
    successContainer: {
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    successIcon: {
      marginBottom: theme.spacing.md,
    },
    successTitle: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.success,
      marginBottom: theme.spacing.md,
      textAlign: 'center',
    },
    successText: {
      fontFamily: theme.typography.fontFamily.regular,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    summaryContainer: {
      width: '100%',
      marginBottom: theme.spacing.xl,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    summaryLabel: {
      fontFamily: theme.typography.fontFamily.medium,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    summaryValue: {
      fontFamily: theme.typography.fontFamily.bold,
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

  // Renderizar un elemento de producto
  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem} 
      onPress={() => toggleProductReceived(item.id)}
    >
      <Ionicons 
        name={item.received ? "checkbox" : "square-outline"} 
        size={24} 
        color={item.received ? theme.colors.success : theme.colors.text} 
        style={styles.productCheckbox}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSku}>SKU: {item.sku}</Text>
      </View>
      <Text style={styles.productQuantity}>x{item.quantity}</Text>
    </TouchableOpacity>
  );

  // Calcular productos recibidos vs. total
  const calculateSummary = () => {
    const totalProducts = products.length;
    const receivedProducts = products.filter(product => product.received).length;
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    const receivedQuantity = products
      .filter(product => product.received)
      .reduce((sum, product) => sum + product.quantity, 0);
    
    return {
      totalProducts,
      receivedProducts,
      totalQuantity,
      receivedQuantity,
    };
  };

  const summary = calculateSummary();

  return (
    <Layout title="Recepción de Despacho">
      <View style={styles.container}>
        {!confirmed ? (
          <>
            {!guideLoaded ? (
              <Card style={styles.guideSection}>
                <Text style={styles.sectionTitle}>Escanear guía de despacho</Text>
                <View style={styles.guideInputContainer}>
                  <TextInput
                    style={styles.guideInput}
                    placeholder="Ingresa número de guía"
                    value={guideNumber}
                    onChangeText={setGuideNumber}
                    editable={!scanning}
                  />
                  <Button
                    title={scanning ? "Escaneando..." : "Escanear"}
                    onPress={handleScanGuide}
                    isLoading={scanning}
                    disabled={scanning}
                  />
                </View>
                {scanning && (
                  <Text style={styles.scanningText}>Buscando información de la guía...</Text>
                )}
              </Card>
            ) : (
              <>
                <Card style={styles.guideSection}>
                  <Text style={styles.sectionTitle}>Guía de despacho #{guideNumber}</Text>
                  <View style={styles.checkAllContainer}>
                    <Text style={styles.checkAllText}>
                      Marcar todos los productos
                    </Text>
                    <TouchableOpacity onPress={toggleAllProducts}>
                      <Ionicons 
                        name={allProductsChecked ? "checkbox" : "square-outline"} 
                        size={24} 
                        color={allProductsChecked ? theme.colors.success : theme.colors.text} 
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.productsListContainer}>
                    <FlatList
                      data={products}
                      keyExtractor={item => item.id}
                      renderItem={renderProductItem}
                      scrollEnabled={false}
                    />
                  </View>
                </Card>
                
                <View style={styles.confirmButtonContainer}>
                  <Button
                    title="Confirmar productos recibidos"
                    onPress={handleConfirm}
                    fullWidth={true}
                    size="large"
                    isLoading={confirming}
                  />
                </View>
              </>
            )}
          </>
        ) : (
          <Card>
            <View style={styles.successContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={80}
                color={theme.colors.success}
                style={styles.successIcon}
              />
              <Text style={styles.successTitle}>Recepción completada</Text>
              <Text style={styles.successText}>
                Has confirmado la recepción de los productos de la guía #{guideNumber}.
              </Text>
              
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Productos recibidos:</Text>
                  <Text style={styles.summaryValue}>
                    {summary.receivedProducts} de {summary.totalProducts}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Unidades recibidas:</Text>
                  <Text style={styles.summaryValue}>
                    {summary.receivedQuantity} de {summary.totalQuantity}
                  </Text>
                </View>
                <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.summaryLabel}>Estado:</Text>
                  <Text style={[
                    styles.summaryValue, 
                    { color: summary.receivedProducts === summary.totalProducts ? theme.colors.success : theme.colors.warning }
                  ]}>
                    {summary.receivedProducts === summary.totalProducts ? 'Completo' : 'Parcial'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <Button
                  title="Nueva recepción"
                  onPress={handleReset}
                  size="large"
                  fullWidth={true}
                />
              </View>
            </View>
          </Card>
        )}
      </View>
    </Layout>
  );
}