// ChatArea.styled.ts
import styled from "styled-components";

type Role = "user" | "assistant";

export const S = {
  Container: styled.div`
    width: 90%;
    height: 84%;
    padding: 20px;
    overflow-y: auto;
    background-color: ${({ theme }) => theme.color.ivory};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    @media ${({ theme }) => theme.device.md} {
      height: 75%;
      gap: 3%;
    }

    @media ${({ theme }) => theme.device.tabletLandscape} {
      width: 95%;
      height: 73%;

      gap: 3%;
    }
  `,

  Bubble: styled.div<{ $role: Role }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: ${({ $role }) =>
      $role === "user" ? "flex-end" : "flex-start"};
  `,

  Msg: styled.div<{ $role: Role }>`
    max-width: 70%;
    padding: 10px 14px;
    border-radius: 12px;
    color: #fff;
    background-color: ${({ $role, theme }) =>
      $role === "user" ? theme.color.green : theme.color.grey};
    white-space: pre-wrap;
    word-break: break-word;
  `,
  Typing: styled.div`
    width: 80%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 10px;
    color: ${({ theme }) => theme.color.green};
    background-color: ${(props) => props.theme.color.white};

    font-size: 0.9rem;
    font-style: italic;
  `,
  Time: styled.span`
    display: block;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.color.deepGrey};
    margin-top: 4px;
    text-align: right;
  `,
};
