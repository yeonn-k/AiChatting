import { useForm, FormProvider } from "react-hook-form";
import { S } from "./SingUp.style";
import InputField from "@/components/InputField/InputField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { toast } from "react-toastify";
import ROUTE_LINK from "@/routes/RouterLink";

import { postAxios } from "@/utils/axios";

interface FormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const methods = useForm<FormData>({ mode: "onSubmit" });
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (submitting) return;
    setSubmitting(true);
    const { email, password } = data;

    if (!email || !password) {
      toast.error("이메일과 비밀번호를 모두 입력해주세요");
      return;
    }

    try {
      const res = await postAxios("/auth/signup", {
        email,
        password,
      });

      if (res.status === 201) {
        toast.success("✨ 회원가입이 성공적으로 완료되었습니다.");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
      if (res.status === 401) {
        toast.error("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <S.EntryPointBox>
          <S.BoxOverlay>
            <S.Logo>Hello There</S.Logo>

            <S.FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
              <S.InputContainer>
                <InputField
                  name="email"
                  label="이메일"
                  placeholder="아이디를 입력하세요."
                  type="email"
                  pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                />
              </S.InputContainer>

              <S.InputContainer>
                <InputField
                  name="password"
                  label="비밀번호"
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                />
              </S.InputContainer>

              <S.SubmitButton type="submit" disabled={submitting}>
                {submitting ? "로딩 중..." : "회원가입"}
              </S.SubmitButton>
              <S.LinkButton to={ROUTE_LINK.SIGNIN.link}>로그인</S.LinkButton>
            </S.FormContainer>
          </S.BoxOverlay>
        </S.EntryPointBox>
      </FormProvider>
    </>
  );
};

export default SignUp;
