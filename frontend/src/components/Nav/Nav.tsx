import ROUTE_LINK from "@/routes/RouterLink";
import { S } from "./Nav.styled";

const Nav = () => {
  return (
    <>
      <S.NavContainer>
        <S.Logo>Hello There</S.Logo>
        <S.MenuBox>
          <S.Menu to={ROUTE_LINK.CHOOSECHAR.link}>choose character</S.Menu>
          <S.Menu to={ROUTE_LINK.MANAGE.link}>manage</S.Menu>
        </S.MenuBox>
      </S.NavContainer>
    </>
  );
};

export default Nav;
