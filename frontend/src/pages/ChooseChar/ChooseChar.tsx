import Nav from "@/components/Nav/Nav";
import { S } from "./ChooseChar.style";
import Char1 from "@/assets/images/char1.jpg";
import Char2 from "@/assets/images/char2.jpg";
import Char3 from "@/assets/images/char3.jpg";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "@/stores/characterStore";
import ROUTE_LINK from "@/routes/RouterLink";

const ChooseChar = () => {
  const navigate = useNavigate();
  const select = useCharacterStore((state) => state.select);

  const handlePick = (id: string) => {
    select(id);
    navigate(ROUTE_LINK.CHAT.link(id));
  };

  return (
    <>
      <Nav />
      <S.Container>
        <S.CharsBox>
          <S.Char onClick={() => handlePick("1")}>
            <S.CharImg imgUrl={Char1} />
            <S.CharName>미니빈</S.CharName>
          </S.Char>
          <S.Char onClick={() => handlePick("2")}>
            <S.CharImg imgUrl={Char2} />
            <S.CharName>악동이</S.CharName>
          </S.Char>
          <S.Char onClick={() => handlePick("3")}>
            <S.CharImg imgUrl={Char3} />
            <S.CharName>스푸키</S.CharName>
          </S.Char>
        </S.CharsBox>
      </S.Container>
    </>
  );
};

export default ChooseChar;
