// src/pages/ChooseChar/ChooseChar.tsx
import Nav from "@/components/Nav/Nav";
import { S } from "./ChooseChar.style";
import AddIcon from "@/assets/icons/Vector.svg";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "@/stores/characterStore";
import ROUTE_LINK from "@/routes/RouterLink";

const ChooseChar = () => {
  const navigate = useNavigate();
  const { list, select } = useCharacterStore();

  const handlePick = (id: string) => {
    select(id);
    navigate(ROUTE_LINK.CHAT.link(id));
  };

  const handleAddCharacter = () => {
    navigate(ROUTE_LINK.ADD_CHARACTER.link);
  };

  return (
    <>
      <Nav />
      <S.Container>
        <S.CharsBox>
          {list.map((char) => (
            <S.Char key={char.id} onClick={() => handlePick(char.id)}>
              <S.CharImg imgUrl={char.imgUrl} />
              <S.CharName>{char.name}</S.CharName>
            </S.Char>
          ))}

          {/* ✅ 추가 버튼 */}
          <S.Char onClick={handleAddCharacter}>
            <S.AddIcon src={AddIcon} />
            <S.CharName>새 캐릭터</S.CharName>
          </S.Char>
        </S.CharsBox>
      </S.Container>
    </>
  );
};

export default ChooseChar;
