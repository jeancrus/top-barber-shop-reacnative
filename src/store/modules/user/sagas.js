import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, ...rest } = payload.data;

        const profile = {
            name,
            email,
            ...(rest.oldPassword ? rest : {}),
        };

        const response = yield call(api.put, 'users', profile);
        Alert.alert('Ok!', 'Perfil atualizado com sucesso!');

        yield put(updateProfileSuccess(response.data));
    } catch (error) {
        console.tron.log('error', error.response);
        Alert.alert('Falha na atualização', 'Verifique seus dados.');
        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
