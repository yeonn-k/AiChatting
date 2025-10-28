import styled from "styled-components";

export const S = {
  InputContainer: styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,

  Label: styled.label`
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.color.white};
  `,

  Input: styled.input<{ $error?: boolean }>`
    width: 100%;
    padding: 10px;
    border: 1px solid
      ${({ theme, $error }) =>
        $error ? theme.color.green : theme.color.lightGrey};
    border-radius: 4px;
    outline: none;
    background-color: ${({ theme }) => theme.color.white};

    &:focus {
      border: 1px solid ${({ theme }) => theme.color.green};
      box-shadow: 0 0 4px rgba(255, 113, 5, 0.3);
    }
  `,

  ErrorText: styled.span`
    color: red;
    font-size: 12px;
    margin-top: 4px;
    display: block;
  `,
};
