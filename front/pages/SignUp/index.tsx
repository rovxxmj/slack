import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Link, Redirect } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import CustomLabel from '@pages/SignUp/CustomLabel';
import { useForm } from 'react-hook-form';
import Socials from '@pages/SignUp/Socials';
import { Base, Button, Container, Form, Header, Error } from '@pages/SignUp/styles';
import axios from 'axios';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
interface IForm {
  email: string;
  name: string;
  nickname: string;
  password: string;
}
const SignUp = () => {
  const theme = useTheme();
  const { data: userData, error, mutate } = useSWR<IUser | false>('/api/users', fetcher, { dedupingInterval: 2000 });
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: { email: '', name: '', nickname: '', password: '' },
    mode: 'onChange',
  });

  const { email, name, nickname, password } = watch();
  const onSubmit = useCallback((data: IForm) => {
    // setError('nickname', { message: '이미 사용중인 사용자 이름(닉네임)입니다.' });

    axios
      .post('/api/users', data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        mutate();
        reset();
        return <Redirect to={'/sign_in'} />;
      })
      .catch((error) => {
        setError('email', { message: '이미 사용중인 이메일입니다.' });
        setError('nickname', { message: '이미 사용중인 사용자 이름(닉네임)입니다.' });
        console.error(error);
      });
  }, []);

  return (
    <Base bgColor={theme.colors.white} textColor={theme.colors.black}>
      <Container>
        <Header gray={theme.colors.gray[400]} link={theme.colors.blue[500]}>
          <h1>Sign up</h1>
          <p>
            Already have an account? <Link to={'/sign_in'}>Sign In</Link>.
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
            <Error red={theme.colors.red[500]}>{errors.email?.message}</Error>
          </div>
          <div>
            <CustomLabel label={'성명'} isValue={Boolean(name)} isInValid={Boolean(errors?.name)} alarm>
              <input type={'text'} {...register('name', { required: true, minLength: 2 })} />
            </CustomLabel>
          </div>
          <div>
            <CustomLabel label={'사용자 이름'} isValue={Boolean(nickname)} isInValid={Boolean(errors?.nickname)} alarm>
              <input type={'text'} {...register('nickname', { required: true })} />
            </CustomLabel>
            <Error red={theme.colors.red[500]}>{errors.nickname?.message}</Error>
          </div>
          <div>
            <CustomLabel label={'비밀번호'} isValue={Boolean(password)} isInValid={Boolean(errors?.password)} alarm>
              <input type={'password'} {...register('password', { required: true, minLength: 6 })} />
            </CustomLabel>
          </div>
          <Button>Sign up</Button>
          <Socials />
        </Form>
      </Container>
    </Base>
  );
};

export default SignUp;
