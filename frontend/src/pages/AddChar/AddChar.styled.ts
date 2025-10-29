import styled from "styled-components";

export const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;

    @media ${({ theme }) => theme.device.md} {
      background: ${({ theme }) => theme.color.ivory};
    }
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

    @media ${({ theme }) => theme.device.md} {
      box-shadow: none;
    }
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
  PreviewBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Preview: styled.img`
    margin-top: 3%;
    width: 36%;
    aspect-ratio: 1 / 1;

    object-fit: cover;
    border-radius: 50%;
  `,
};
