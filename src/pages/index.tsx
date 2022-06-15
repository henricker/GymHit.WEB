import { Box, Button, Flex, Grid, Heading, Image, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/Form/Input';
import Link from 'next/link';

type SignInFormData = {
  email: string;
  password: string;
};

const SignInSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn(): JSX.Element {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = (values): void => {
    console.log(values);
  };

  return (
    <Grid width='100vw' height='100vh' gridTemplateColumns='0.9fr 1.1fr'>
      <Flex
        as="form"
        width="100%"
        maxWidth='100%'
        bg="gray.800"
        padding="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Image src='logo.svg' width={200} height={200} mt='-5rem' mb='5rem'/>
        <Box ml='2rem'>
        <Box mt='-3rem'>
          <Heading size='lg' fontWeight='semibold' mb='1.5rem' fontSize='2.37rem'>
            Bem-vindo à GymHit
          </Heading>
          <Heading fontWeight='semibold' fontSize='.75rem' color='#A2A2A2' mb='4rem'>
            Faça o login para acessar sua conta.
          </Heading>
        </Box>
        <Stack spacing={6}>
          <Input
            name="email"
            id="email"
            error={errors.email}
            type="email"
            labelColor='#7C7C7C'
            labelWeight='semibold'
            label="Endereço de email"
            {...register('email')}
          />
          <Input
            name="password"
            id="password"
            error={errors.password}
            labelColor='#7C7C7C'
            type="password"
            labelWeight='semibold'
            label="Senha"
            {...register('password')}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          backgroundColor='#F54A48'
          width='100%'
          isLoading={formState.isSubmitting}
          mb="3.82rem"
        >
          Entrar
        </Button>

        <Heading fontSize='0.875rem' fontWeight='medium'>
          Ainda não tem uma conta? <Heading display='inline' fontSize='0.875rem' color='#F54A48' fontWeight='medium'>Criar Conta</Heading>  
        </Heading>
        </Box>
      </Flex>
      <Box backgroundImage='gym.svg' backgroundPosition='center' backgroundSize='cover'/>
    </Grid>
  );
}
