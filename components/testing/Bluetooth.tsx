import React, { useState } from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, Platform, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

const bleManager = new BleManager();

interface Device {
    id: string;
    name: string | null;
}

export default function ScanDevices() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [scanning, setScanning] = useState(false);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const apiLevel = await DeviceInfo.getApiLevel();
            if (apiLevel < 31) {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
            } else {
                await requestMultiple([
                    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ]);
            }
        }
    };

    const startScan = async () => {
        await requestPermissions();

        setDevices([]);
        setScanning(true);

        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.warn('Scan error:', error);
                setScanning(false);
                return;
            }

            // Avoid duplicates
            setDevices((prev) => {
                if (device && !prev.find((d) => d.id === device.id)) {
                    return [...prev, device];
                }
                return prev;
            });
        });

        // Stop scanning after 10 seconds
        setTimeout(() => {
            bleManager.stopDeviceScan();
            setScanning(false);
        }, 10000);
    };

    return (
        <View style={{ flex: 1, paddingTop: 50, alignItems: 'center' }}>
            <TouchableOpacity
                onPress={startScan}
                style={{
                    backgroundColor: scanning ? '#888' : 'black',
                    padding: 20,
                    borderRadius: 10,
                    marginBottom: 20,
                }}
                disabled={scanning}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>
                    {scanning ? 'Scanning...' : 'Scan for Devices'}
                </Text>
            </TouchableOpacity>

            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={{ marginVertical: 4 }}>{item.name || 'Unnamed'} - {item.id}</Text>
                )}
            />
        </View>
    );
}
