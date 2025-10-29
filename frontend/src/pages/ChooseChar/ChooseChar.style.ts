import styled from "styled-components";
interface ImgUrlProps {
  imgUrl: string;
}

export const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 140px;

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  CharsBox: styled.div`
    display: grid;
    width: 80%;
    row-gap: 30px;
    column-gap: 2%;

    grid-template-columns: repeat(4, 1fr);

    @media ${({ theme }) => theme.device.md} {
      grid-template-columns: repeat(3, 1fr);
    }

    @media ${({ theme }) => theme.device.sm} {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 4%;
    }

    justify-items: center;
    align-items: start;
  `,
  Char: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 90%;
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
    white-space: nowrap;

    @media ${({ theme }) => theme.device.md} {
      font-size: medium;
    }
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
