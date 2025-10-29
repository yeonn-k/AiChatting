import styled from "styled-components";

interface ImgUrlProps {
  imgUrl: string;
}

export const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - 60px);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  NoChar: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Char: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 25%;
    aspect-ratio: 1 / 1;
    margin: 3% 0;

    @media ${({ theme }) => theme.device.md} {
      width: 20%;
      aspect-ratio: 1 / 1;
      margin: 2% 0;
    }

    @media ${({ theme }) => theme.device.tabletLandscape} {
      width: 10%;
      aspect-ratio: 1 / 1;
      margin: 2% 0;
    }
  `,
  CharImg: styled.div<ImgUrlProps>`
    width: 100%;
    aspect-ratio: 1 / 1;

    background-image: url(${(props) => props.imgUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    border-radius: 100%;
  `,
  CharName: styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    font-size: larger;
    font-weight: 700;
    color: ${(props) => props.theme.color.green};
    white-space: nowrap;

    @media ${({ theme }) => theme.device.md} {
      font-size: medium;
      margin-top: 10px;
    }
  `,
  ChatBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2%;

    width: 90%;
    height: 75%;
    border-radius: 20px;
    background-color: ${(props) => props.theme.color.green50};

    @media ${({ theme }) => theme.device.md} {
      height: 75%;
      gap: 3%;
    }

    @media ${({ theme }) => theme.device.tabletLandscape} {
      height: 70%;
      gap: 3%;
    }
  `,
};
