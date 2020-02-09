import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
    const tron = Reactotron.configure({
        name: 'BarberShop',
    })
        .useReactNative()
        .setAsyncStorageHandler(AsyncStorage)
        .use(reactotronRedux())
        .use(sagaPlugin())
        .connect();

    tron.clear();

    console.tron = tron;
}
