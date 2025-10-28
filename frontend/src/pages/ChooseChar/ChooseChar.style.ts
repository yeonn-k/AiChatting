import styled from "styled-components";
interface ImgUrlProps {
  imgUrl: string;
}

export const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  CharsBox: styled.div`
    width: 80%;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Char: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 30%;
    aspect-ratio: 1 / 1;

    opacity: 0.6;

    &:hover {
      opacity: 1;
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
  `,
};
