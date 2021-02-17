import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
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
        ? <Layout style={styles.container}>
              <BarCodeScanner
                onBarCodeScanned={onBarCodeRead}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.scanScreenMessage} category='h6'>Focus on the ISBN barcode</Text>
          </Layout>
        : <Text>Camera Permission required...</Text>
      }
    </>
    
  )
}

export default BarcodeScanner;
