import React from 'react';
import BarcodeScanner from '../../components/BarcodeScanner';

const ScannerScreen = (props) => {
  return (
    <BarcodeScanner navigation={props.navigation} />
  )
}

export default ScannerScreen;
