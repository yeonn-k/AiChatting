// src/pages/Chat/Chat.tsx
import { useParams } from "react-router-dom";
import { S } from "./Chat.style";
import { useCharacterStore } from "@/stores/characterStore";
import Nav from "@/components/Nav/Nav";
import InputBox from "./components/Input/InputBox";
import ChatArea from "./components/ChatArea/ChatArea";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { postAxios } from "@/utils/axios";

type Msg = {
  role: "user" | "assistant";
  content: string;
  time: string; // ✅ 타임스탬프 추가
};

const Chat = () => {
  const { charId } = useParams<{ charId: string }>();
  const getCharById = useCharacterStore((s) => s.getCharById);
  const char = getCharById(charId || "");

  if (!char) return <S.NoChar>존재하지 않는 캐릭터입니다 😿</S.NoChar>;

  const storageKey = useMemo(() => `chat_${char.id}`, [char.id]);

  // ✅ 초기 로드 (로컬스토리지 복원)
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as Msg[]) : [];
    } catch {
      return [];
    }
  });

  const [sending, setSending] = useState(false);
  const hydratedRef = useRef(true);

  // ✅ 캐릭터 바뀌면 해당 키로 새로 로드
  useEffect(() => {
    hydratedRef.current = false;
    try {
      const raw = localStorage.getItem(storageKey);
      setMessages(raw ? (JSON.parse(raw) as Msg[]) : []);
    } catch {
      setMessages([]);
    } finally {
      hydratedRef.current = true;
    }
  }, [storageKey]);

  // ✅ 메시지 변경 시 저장 (복원 완료 후)
  useEffect(() => {
    if (!hydratedRef.current) return;
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const handleSend = async (input: string) => {
    if (sending) return;

    const text = input.trim();
    if (!text) return;

    if (text.length > 200) {
      toast.error("최대 전송 가능한 길이는 200자 입니다.");
      return;
    }

    const now = new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Msg = { role: "user", content: text, time: now };
    setMessages((prev) => [...prev, userMsg]);

    setSending(true);
    try {
      const historyToSend = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await postAxios("/chat", {
        characterId: char.id,
        message: text,
        history: historyToSend,
      });

      const aiText = res.data?.content ?? "응답 생성 실패";
      const aiMsg: Msg = {
        role: "assistant",
        content: aiText,
        time: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "메시지 전송 중 오류가 발생했습니다.";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Nav />
      <S.Container>
        <S.Char>
          <S.CharImg imgUrl={char.imgUrl} />
          <S.CharName>{char.name}</S.CharName>
        </S.Char>
        <S.ChatBox>
          <ChatArea messages={messages} loading={sending} />
          <InputBox onSend={handleSend} disabled={sending} />
        </S.ChatBox>
      </S.Container>
    </>
  );
};

export default Chat;
