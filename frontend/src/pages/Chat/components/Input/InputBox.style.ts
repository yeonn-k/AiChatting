import styled from "styled-components";

export const S = {
  Form: styled.form`
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;

    gap: 14px;
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
  `,
  Button: styled.button`
    width: 12%;
    height: 100px;
    background-color: ${(props) => props.theme.color.green};
    color: ${(props) => props.theme.color.white};

    font-size: large;
    font-weight: 600;
  `,
};
