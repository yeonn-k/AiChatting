import styled from "styled-components";

export const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
  `,

  Form: styled.form`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    border-radius: 16px;
    background: ${({ theme }) => theme.color.ivory};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `,

  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  Label: styled.label`
    font-weight: 600;
    color: ${({ theme }) => theme.color.green};
  `,

  FileInput: styled.input`
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.color.grey};
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
  `,

  SubmitBtn: styled.button`
    margin-top: 10px;
    padding: 12px 20px;
    background-color: ${({ theme }) => theme.color.green};
    color: white;
    font-weight: 700;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.color.green};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
};
