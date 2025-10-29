import styled from "styled-components";

export const S = {
  Form: styled.form`
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;

    gap: 14px;

    @media ${({ theme }) => theme.device.md} {
      gap: 10px;
    }

    @media ${({ theme }) => theme.device.tabletLandscape} {
      width: 95%;
    }
  `,
  Textarea: styled.textarea`
    flex: 1;
    resize: none;
    border: none;
    border-radius: 10px;
    height: 100px;
    background: ${(props) => props.theme.color.ivory};
    padding: 15px;
    font-size: large;

    @media ${({ theme }) => theme.device.md} {
      height: 60px;
    }
  `,
  Button: styled.button`
    width: 12%;
    min-width: 100px;
    height: 100px;
    background-color: ${(props) => props.theme.color.green};
    color: ${(props) => props.theme.color.white};

    font-size: large;
    font-weight: 600;

    @media ${({ theme }) => theme.device.md} {
      height: 60px;
    }
  `,
};
