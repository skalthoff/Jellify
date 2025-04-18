import NetInfo from '@react-native-community/netinfo';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Platform, Text } from 'react-native';
import { View } from 'tamagui';
import  NoInternetModal  from './modal';

const internetConnectionWatcher = {
    NO_INTERNET: 'No internet connection',
    BACK_ONLINE: 'Back online',
};

enum networkStatusTypes {
    ONLINE = 'ONLINE',
    DISCONNECTED = 'DISCONNECTED',
}

const isAndroid = Platform.OS === 'android';

const InternetConnectionWatcher = () => {
    const [networkStatus, setNetworkStatus] = useState<keyof typeof networkStatusTypes | null>(
        null,
    );
    const lastNetworkStatus = useRef<keyof typeof networkStatusTypes | null>();
    const queryClient = useQueryClient();

    const internetConnectionBack = () => {
        setNetworkStatus(networkStatusTypes.ONLINE);
        setTimeout(() => {
            lastNetworkStatus.current !== networkStatusTypes.DISCONNECTED && setNetworkStatus(null);
        }, 3000);
    };
    useEffect(() => {
        lastNetworkStatus.current = networkStatus;
    }, [networkStatus]);

    useEffect(() => {
        const networkWatcherListener = NetInfo.addEventListener(
            ({ isConnected, isInternetReachable }) => {
                const isNetworkDisconnected = !(
                    isConnected && (isAndroid ? isInternetReachable : true)
                );

                if (isNetworkDisconnected) {
                    setNetworkStatus(networkStatusTypes.DISCONNECTED);
                } else if (
                    !isNetworkDisconnected &&
                    lastNetworkStatus.current === networkStatusTypes.DISCONNECTED
                ) {
                    internetConnectionBack();
                }
            },
        );
        return () => {
            networkWatcherListener();
        };
    }, []);

    if (!networkStatus) {
        return null;
    }
    return (
        <View>
                        <NoInternetModal open={networkStatus !== networkStatusTypes.ONLINE}/>
                        <View
            style={{
                padding: 10,
                paddingBottom: isAndroid ? 12 : 15,
                backgroundColor: networkStatus === networkStatusTypes.ONLINE ? "green" : "red",
            }}>
            <Text style={{ color: 'white',textAlign:"center" }}>
                {networkStatus === networkStatusTypes.ONLINE
                    ? internetConnectionWatcher.BACK_ONLINE
                    : internetConnectionWatcher.NO_INTERNET}
            </Text>
        </View>
        </View>
       
    );
};

export default InternetConnectionWatcher;