import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Platform } from 'react-native';
import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange, open, handleOpen }) {
    const dateFormatted = useMemo(() => {
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt });
    }, [date]);

    return (
        <Container>
            <DateButton onPress={handleOpen}>
                <Icon name="event" color="#fff" size={20} />
                <DateText>{dateFormatted}</DateText>
            </DateButton>
            {open && (
                // <Picker>
                <DateTimePicker
                    value={date}
                    onChange={onChange}
                    minimumDate={new Date()}
                    mode="datetime"
                    display="spinner"
                    is24Hour
                />
                // </Picker>
            )}
        </Container>
    );
}
