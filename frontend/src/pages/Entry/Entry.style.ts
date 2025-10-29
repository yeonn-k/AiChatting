import styled from "styled-components";
import { Link } from "react-router-dom";
import bgV from "@/assets/images/entryImg-v.jpg";
import bgH from "@/assets/images/entryImg-h.jpg";

export const S = {
  EntryPointBox: styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${bgV});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    @media ${({ theme }) => theme.device.md} {
      background-image: url(${bgH});
    }
  `,
  BoxOverlay: styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  `,
  Logo: styled.div`
    width: 274px;
    height: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 40px;
    font-family: ${(props) => props.theme.font.LogoFont};
  `,
  AuthBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  LinkButton: styled(Link)`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 305px;
    height: 60px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

    opacity: 0.7;
    transition:
      opacity 0.2s ease,
      transform 0.1s ease;

    &:hover {
      opacity: 1;
      color: ${(props) => props.theme.color.green};

      &:active {
        transform: scale(0.95);
      }
    }
  `,
};
