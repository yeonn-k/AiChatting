import { S } from "./Nav.styled";

const Nav = () => {
  return (
    <>
      <S.NavContainer>
        <S.Logo>Hello There</S.Logo>
        <S.MenuBox>
          <S.Menu>choose character</S.Menu>
          <S.Menu>manage</S.Menu>
        </S.MenuBox>
      </S.NavContainer>
    </>
  );
};

export default Nav;
