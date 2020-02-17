import * as React from 'react';
import { Box } from 'reakit';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  touched: boolean;
  error?: string;
  value?: string;
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 6px;
`;

const Input = styled.input<Omit<Props, 'label'>>`
  padding: 0.8rem 1rem;
  font-size: 16px;
  border: 1px solid ${props => props.theme.palette.primary};
  &:focus {
    border-color: ${props => props.theme.palette.accent};
    outline-color: ${props => props.theme.palette.accent};
    opacity: 0.8;
  }
  ${props => props.error && props.touched && `border-color: ${props.theme.palette.error}`};
`;

const Error = styled.span<Pick<Props, 'touched' | 'error'>>`
  height: 1.5rem;
  color: ${props => props.theme.palette.error};
  visibility: ${props => (props.error && props.touched ? 'visible' : 'hidden')};
`;

const TextInput = ({ label, name, error, touched, ...props }: Props) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} error={error} touched={touched} />
      <Error error={error} touched={touched}>
        {error}
      </Error>
    </Container>
  );
};

export default TextInput;
