import { S } from "./Entry.style";
import ROUTE_LINK from "../../routes/RouterLink";

const Entry = () => {
  return (
    <S.EntryPointBox>
      <S.BoxOverlay>
        <S.Logo>Hello There</S.Logo>
        <S.AuthBox>
          <S.LinkButton to={ROUTE_LINK.SIGNIN.link}>로그인</S.LinkButton>
          <S.LinkButton to={ROUTE_LINK.SIGNUP.link}>회원가입</S.LinkButton>
        </S.AuthBox>
      </S.BoxOverlay>
    </S.EntryPointBox>
  );
};

export default Entry;
