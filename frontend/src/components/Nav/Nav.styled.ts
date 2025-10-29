import { Link } from "react-router-dom";
import styled from "styled-components";

export const S = {
  NavContainer: styled.div`
    width: 100%;
    height: 60px;
    background-color: ${(props) => props.theme.color.green};
    display: flex;
    justify-content: space-between;
  `,
  Logo: styled.div`
    width: 160px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 20px;
    font-family: ${(props) => props.theme.font.LogoFont};
  `,
  MenuBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    margin-right: 20px;
  `,
  Menu: styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;
    color: ${(props) => props.theme.color.white};
    font-size: larger;
    font-weight: 700;

    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.color.yellow};
    }
  `,
  NavButton: styled.button`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    color: ${({ theme }) => theme.color.white};
    font-size: larger;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.yellow};
    }
  `,
};
