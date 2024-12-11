import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const RecipientScanCode = ({
  onProfileScanned,
}: {
  onProfileScanned: (data: any) => void;
}) => {
  const handleScan = (e: {data: string}) => {
    try {
      const userData = JSON.parse(e.data);
      onProfileScanned(userData);
    } catch (error) {
      Alert.alert('Invalid QR Code', 'Please scan a valid profile QR code.');
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleScan}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={<></>}
        bottomContent={<></>}
        reactivate={true}
        reactivateTimeout={2000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default RecipientScanCode;
