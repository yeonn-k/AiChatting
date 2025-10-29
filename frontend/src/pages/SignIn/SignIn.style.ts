import styled from "styled-components";
import bgV from "@/assets/images/entryImg-v.jpg";
import bgH from "@/assets/images/entryImg-h.jpg";

import { Link } from "react-router-dom";

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
  InputContainer: styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: flex-end;

    div {
      width: 100%;
      margin-bottom: 0;
    }
  `,
  FormContainer: styled.form`
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  LoginButton: styled.button`
    width: 100%;
    padding: 12px;
    color: ${(props) => props.theme.color.white};
    background-color: ${({ theme }) => theme.color.green};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.color.green};
    }
  `,
  HelperText: styled.span`
    width: 100%;
    font-size: ${({ theme }) => theme.font.small};
    color: ${({ theme }) => theme.color.green};
    margin-top: -10px;
  `,
  SubmitButton: styled.button`
    width: 100%;
    height: 60px;
    padding: 12px;
    margin-top: 10px;

    color: ${(props) => props.theme.color.white};
    background-color: ${({ theme }) => theme.color.green};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.7;
    transition:
      opacity 0.2s ease,
      transform 0.1s ease;

    &:hover {
      opacity: 1;
      background-color: ${({ theme }) => theme.color.green};
    }
  `,
  LinkButton: styled(Link)`
    color: ${(props) => props.theme.color.white};
    display: flex;
    justify-content: center;
  `,
};
