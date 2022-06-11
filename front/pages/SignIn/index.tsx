import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import CustomLabel from '@pages/SignUp/CustomLabel';
import { useForm } from 'react-hook-form';
import Socials from '@pages/SignUp/Socials';
import { Base, Button, Container, Form, Header, Error } from '@pages/SignUp/styles';
import axios from 'axios';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

interface IForm {
  email: string;
  password: string;
}
const SignIn = () => {
  const theme = useTheme();
  const { data: userData, mutate } = useSWR('/api/users', fetcher);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });
  const { email, password } = watch();
  const onSubmit = useCallback((data: IForm) => {
    axios
      .post('/api/users/login', data)
      .then((res) => {
        console.log(res.data);
        mutate();
      })
      .catch((error) => {
        console.error(error);
        setError('email', { message: '이메일 주소 혹은 비밀번호를 다시 확인해주세요' });
        setError('password', { message: '이메일 주소 혹은 비밀번호를 다시 확인해주세요' });
      });
  }, []);
  if (userData === undefined) return <div>로딩중...</div>;
  if (userData) {
    return <Redirect to={`/workspace/${userData?.Workspaces[0].url}/channel/일반`} />;
  }
  return (
    <Base bgColor={theme.colors.white} textColor={theme.colors.black}>
      <Container>
        <Header gray={theme.colors.gray[400]} link={theme.colors.blue[500]}>
          <h1>Sign in</h1>
          <p>
            New to Slack? <Link to={'/sign_up'}>Sign up for an account</Link>.
          </p>
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <CustomLabel label={'이메일 주소'} isValue={Boolean(email)} isInValid={Boolean(errors?.email)} alarm>
              <input
                type={'email'}
                {...register('email', {
                  required: true,
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/i, message: '' },
                })}
              />
            </CustomLabel>
            {/*<Error red={theme.colors.red[500]}>{errors.email?.message}</Error>*/}
          </div>
          <div>
            <CustomLabel label={'비밀번호'} isValue={Boolean(password)} isInValid={Boolean(errors?.password)} alarm>
              <input type={'password'} {...register('password', { required: true, minLength: 6 })} />
            </CustomLabel>
          </div>
          {errors.email && errors.password && (
            <Error red={theme.colors.red[500]} style={{ marginTop: 0 }}>
              {errors.email?.message}
            </Error>
          )}
          <Button>Sign in</Button>
          <Socials />
        </Form>
      </Container>
    </Base>
  );
};

export default SignIn;
