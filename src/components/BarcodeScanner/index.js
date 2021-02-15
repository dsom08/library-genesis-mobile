import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Permissions } from 'react-native-unimodules';
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from './styles';

const BarcodeScanner = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(false);

  useEffect(() => {
    getCameraPermission()
  }, [])

  const getCameraPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      console.log(status)
      await setCameraPermission(status === 'granted');
    } catch (e) {
      console.log(e.message);
    }
  }

  const onBarCodeRead = ({ type, data }) => {
    navigation.navigate('Search', { scannedISBN: data })
  }

  return (
    <>
      {cameraPermission
        ? <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <BarCodeScanner
                onBarCodeScanned={onBarCodeRead}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.scanScreenMessage}>Focus the ISBN barcode to scan.</Text>
            </View>
          </View>
        : <Text>Camera Permission required...</Text>
      }
    </>
    
  )
}

export default BarcodeScanner;
