import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Alert } from 'react-native';
import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import api from '~/services/api';

export default function Confirm({ navigation }) {
    const provider = navigation.getParam('provider');
    const time = navigation.getParam('time');

    const dateFormatted = useMemo(() => {
        return formatRelative(parseISO(time), new Date(), { locale: ptBR });
    }, [time]);

    async function handleAddAppointment() {
        try {
            await api.post('appointments', {
                provider_id: provider.id,
                date: time,
            });

            Alert.alert('Sucesso!', `Agendamento: ${dateFormatted} marcado!`);
            navigation.navigate('Dashboard');
        } catch (error) {
            Alert.alert('Falha!', error.response.data.error);
        }
    }

    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: provider.avatar
                            ? provider.avatar.url_mobile
                            : `https://api.adorable.io/avatar/50/${provider.name}`,
                    }}
                />
                <Name>{provider.name}</Name>
                <Time>{dateFormatted}</Time>
                <SubmitButton onPress={handleAddAppointment}>
                    Confirmar agendamento
                </SubmitButton>
            </Container>
        </Background>
    );
}

Confirm.navigationOptions = ({ navigation }) => ({
    title: 'Confirmar o agendamento',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
        >
            <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
    ),
});
