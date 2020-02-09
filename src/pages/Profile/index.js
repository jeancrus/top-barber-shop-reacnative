import React, { useRef, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Background from '~/components/Background';

import { Container, Separator, Form, LogoutButton } from './styles';
import { Title } from '../Dashboard/styles';
import { FormInput, SubmitButton } from '../SignIn/styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.user.loading);
    const profile = useSelector(state => state.user.profile);
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const oldPasswordRef = useRef();
    const emailRef = useRef();
    const [email, setEmail] = useState(profile.email);
    const [name, setName] = useState(profile.name);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    useEffect(() => {
        setOldPassword('');
        setConfirmPassword('');
        setPassword('');
    }, [profile]);

    function handleSubmit() {
        dispatch(
            updateProfileRequest({
                email,
                name,
                oldPassword,
                password,
                confirmPassword,
            })
        );
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Background>
            <Container>
                <Title>Meu perfil</Title>
                <Form>
                    <FormInput
                        icon="person-outline"
                        style={{ marginTop: 30 }}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu nome completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Separator />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha atual"
                        returnKeyType="next"
                        ref={oldPasswordRef}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite a confirmação da senha"
                        returnKeyType="next"
                        ref={passwordRef}
                        onSubmitEditing={() =>
                            confirmPasswordRef.current.focus()
                        }
                        value={password}
                        onChangeText={setPassword}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua nova senha"
                        ref={confirmPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <SubmitButton onPress={handleSubmit} loading={loading}>
                        Atualizar perfil
                    </SubmitButton>
                    <LogoutButton onPress={handleLogout} loading={loading}>
                        Sair do WebBarber
                    </LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={20} color={tintColor} />
    ),
};
