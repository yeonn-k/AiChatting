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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 2%;
    row-gap: 30px;
  `,
  Char: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 20%;
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
  AddIcon: styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    border-radius: 100%;
    padding: 24px;
    border: 2px dashed ${({ theme }) => theme.color.green};
    background-color: ${({ theme }) => theme.color.ivory};
  `,
};
