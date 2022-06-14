import styled from '@emotion/styled';

export const Base = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 38px);
  flex-flow: column;
  position: relative;
`;

export const Header = styled.header<{ border: string }>`
  height: 50px;
  display: flex;
  width: 100%;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ border }) => border};
  padding: 0 20px;
  > .header-left {
    display: flex;
    align-items: center;
    font-size: 19px;
    cursor: pointer;
    padding: 2px;
    border-radius: 4px;
    transition: 0.5s;
    & .img {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background-color: lightgray;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 800;
      font-size: 14px;
      color: #fff;
      position: relative;
      margin-right: 10px;

      //> img {
      //  width: 100%;
      //  height: 100%;
      //}

      > .isOnline {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translate(2px, 1px);
        background-color: #fff;

        > div {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: red;
        }
      }
    }

    & .arrow {
      margin-left: 5px;
      font-size: 16px;
      color: gray;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      & .isOnline {
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  & .header-right {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 2px;
    border-radius: 4px;
    cursor: pointer;
    & img,
    .img {
      width: 24px;
      height: 24px;
      background-color: lightgray;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      color: #fff;
      font-size: 14px;
    }

    & .counts {
      font-size: 14px;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

export const DragOver = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background: white;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;
