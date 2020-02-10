import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange, open, handleOpen }) {
    const dateFormatted = useMemo(() => {
        format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }, [date]);

    return (
        <Container>
            <DateButton onPress={handleOpen}>
                <Icon name="event" color="#fff" size={20} />
                <DateText>{dateFormatted}</DateText>
            </DateButton>

            {open && (
                <Picker>
                    <RNDateTimePicker
                        date={date}
                        onChange={onChange}
                        minimumDate={new Date()}
                        minuteInterval={60}
                        locale="pt"
                        mode="date"
                    />
                </Picker>
            )}
        </Container>
    );
}
