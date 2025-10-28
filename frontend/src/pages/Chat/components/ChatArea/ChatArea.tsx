// ./components/ChatArea/ChatArea.tsx
import { S } from "./ChatArea.styled";

type Msg = { role: "user" | "assistant"; content: string; time: string };

const ChatArea = ({
  messages,
  loading,
}: {
  messages: Msg[];
  loading?: boolean;
}) => {
  return (
    <S.Container>
      {messages.map((m, i) => (
        <S.Bubble key={i} $role={m.role}>
          <S.Msg $role={m.role}>
            <div>{m.content}</div>
          </S.Msg>
          <S.Time>{m.time}</S.Time>
        </S.Bubble>
      ))}
      {loading && <S.Typing>🤖 답변 생성 중...</S.Typing>}
    </S.Container>
  );
};

export default ChatArea;
