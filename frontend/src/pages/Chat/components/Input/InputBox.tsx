// ./components/Input/InputBox.tsx
import { useState } from "react";
import { S } from "./InputBox.style";

const InputBox = ({
  onSend,
  disabled,
}: {
  onSend: (msg: string) => void;
  disabled?: boolean;
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(message);
      setMessage("");
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요 (200자 이내)"
        maxLength={200}
        disabled={disabled}
      />
      <S.Button type="submit" disabled={disabled || !message.trim()}>
        전송
      </S.Button>
    </S.Form>
  );
};

export default InputBox;
