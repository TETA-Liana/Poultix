import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Text, View, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

// const manager = new BleManager();

export default function Testing() {
    // const requestPermissions = async () => {
    //     if (Platform.OS === 'android') {
    //         await PermissionsAndroid.requestMultiple([
    //             PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    //             PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         ]);
    //     }
    // };

    // useEffect(() => {
    //     requestPermissions();
    // }, []);

    // const scan = () => {
    //     manager.startDeviceScan(null, null, (error, device) => {
    //         if (error) {
    //             console.log('Scan error:', error);
    //             return;
    //         }
    //         console.log('Device:', device?.name, device?.id);
    //     });

    //     setTimeout(() => {
    //         manager.stopDeviceScan();
    //         console.log('Scan stopped');
    //     }, 10000);
    // };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity  style={{ backgroundColor: 'black', padding: 20, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Scan for Devices</Text>
            </TouchableOpacity>
        </View>
    );
}
