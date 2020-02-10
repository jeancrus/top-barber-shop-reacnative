import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import Background from '~/components/Background';

import { Container, HourList, Hour, Title } from './styles';
import DateInput from '~/components/DateInput';
import useStateWithCallback from '~/helper';
import api from '~/services/api';

export default function SelectDateTime({ navigation }) {
    const provider = navigation.getParam('provider');
    const [opened, setOpened] = useState(false);
    const [date, setDate] = useStateWithCallback(new Date(), () =>
        setOpened(Platform.OS === 'ios')
    );
    const [hours, setHours] = useState([]);

    function handleDate(event, pickDate) {
        const pickedDate = pickDate || date;
        setDate(pickedDate);
    }

    useEffect(() => {
        async function loadAvailable() {
            const response = await api.get(
                `providers/${provider.id}/available`,
                {
                    params: {
                        date: date.getTime(),
                    },
                }
            );
            setHours(response.data);
        }
        loadAvailable();
    }, [date, provider]);

    function handleSelectHour(time) {
        navigation.navigate('Confirm', {
            provider,
            time,
        });
    }

    return (
        <Background>
            <Container>
                <DateInput
                    date={date}
                    onChange={handleDate}
                    open={opened}
                    handleOpen={() => setOpened(true)}
                />
                <HourList
                    data={hours}
                    keyExtractor={item => item.time}
                    renderItem={({ item }) => (
                        <Hour
                            enabled={item.available}
                            onPress={() => handleSelectHour(item.value)}
                        >
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o horário',
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
