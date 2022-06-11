import styled from '@emotion/styled';

export const Base = styled.div<{ bgColor: string; textColor: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`;
export const Container = styled.div`
  position: absolute;
  top: 40%;
  left: 30%;
  transform: translate(-30%, -40%);
`;
export const Header = styled.header<{ gray: string; link: string }>`
  margin-bottom: 50px;

  > h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 46px;
    letter-spacing: -0.75px;
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: ${({ gray }) => gray};
  }

  & a {
    color: ${({ link }) => link};
    text-decoration: none;
  }
`;
export const Form = styled.form`
  margin: 0 auto;
  width: 400px;
  max-width: 400px;

  > div {
    height: 90px;
  }
`;
export const Button = styled.button`
  padding: 9px 0 10px;
  border-radius: 3px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin-top: 30px;
  width: 100%;
  color: #fff;
  background-color: #000;
  display: block;
  font-weight: 700;
  font-size: 14px;
  border: none;
`;
export const Error = styled.p<{ red: string }>`
  color: ${({ red }) => red};
  margin-top: -8px;
  font-size: 14px;
`;
