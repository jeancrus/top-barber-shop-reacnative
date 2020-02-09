import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View``;

export const Separator = styled.View`
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        padding: 30,
    },
})`
    align-self: stretch;
`;

export const LogoutButton = styled(Button)`
    margin-top: 10px;
    background: #f64c75;
`;
