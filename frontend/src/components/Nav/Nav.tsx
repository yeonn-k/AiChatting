import ROUTE_LINK from "@/routes/RouterLink";
import { S } from "./Nav.styled";
import { toast } from "react-toastify";
import { postAxios } from "@/utils/axios";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await postAxios("/auth/signout", {});
    } catch {
      console.warn("서버 로그아웃 실패 — 프론트에서만 처리합니다.");
    } finally {
      localStorage.removeItem("token");
      toast.success("로그아웃 되었습니다!");
      navigate(ROUTE_LINK.SIGNIN.link); // 로그인 페이지로 리디렉션
    }
  };
  return (
    <>
      <S.NavContainer>
        <S.Logo>Hello There</S.Logo>
        <S.MenuBox>
          <S.Menu to={ROUTE_LINK.CHOOSECHAR.link}>choose character</S.Menu>
          <S.NavButton onClick={handleSignOut}>sign out</S.NavButton>
        </S.MenuBox>
      </S.NavContainer>
    </>
  );
};

export default Nav;
