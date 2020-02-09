import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    const { email, password } = payload;
    try {
        const {
            data: { token, user },
        } = yield call(api.post, '/sessions', {
            email,
            password,
        });

        if (user.provider) {
            yield put(signFailure());
            Alert.alert(
                'Erro no login',
                'O usuário não pode ser prestador de serviços'
            );
            return;
        }
        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));
        // history.push('/dashboard');
    } catch (error) {
        yield put(signFailure());
        Alert.alert('Falha na autenticação', error.response.data.error);
    }
}

export function* signUp({ payload }) {
    const { name, email, password } = payload;
    try {
        yield call(api.post, '/users', {
            name,
            email,
            password,
        });
        // history.push('/');
    } catch (error) {
        yield put(signFailure());
        Alert.alert('Falha de criação', error.response.data.error);
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
