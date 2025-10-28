import Nav from "@/components/Nav/Nav";
import { S } from "./AddChar.styled";
import InputField from "@/components/InputField/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import theme from "@/styles/theme/theme";
import ROUTE_LINK from "@/routes/RouterLink";
import { postAxios } from "@/utils/axios";
import { useCharacterStore } from "@/stores/characterStore";
import { useNavigate } from "react-router-dom";

interface AddCharForm {
  name: string;
  prompt: string;
  image: FileList;
}

const AddChar = () => {
  const methods = useForm<AddCharForm>({ mode: "onBlur" });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();
  const addCustom = useCharacterStore((s) => s.addCustom); // 스토어에 이 함수 추가(아래 참고)

  const createCharacter = (fd: FormData) => {
    return postAxios("/addchar", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  const onSubmit = async (data: AddCharForm) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("prompt", data.prompt);
      if (data.image?.[0]) fd.append("image", data.image[0]);

      const res = await createCharacter(fd);
      const char = res.data?.character; // {id,name,prompt,imgUrl, ...}

      // 스토어에 반영(없으면 스킵하고 단순 이동만 해도 됨)
      addCustom?.({
        id: char.id,
        name: char.name,
        imgUrl: char.imgUrl ? `http://localhost:8080${char.imgUrl}` : "",
        prompt: char.prompt,
      });

      toast.success("새 캐릭터가 생성되었습니다!");
      reset();
      navigate(ROUTE_LINK.CHOOSECHAR.link); // 목록 화면으로
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "캐릭터 생성 중 오류가 발생했습니다.";
      toast.error(msg);
    }
  };

  return (
    <>
      <Nav />
      <S.Container>
        <FormProvider {...methods}>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              name="name"
              label="캐릭터 이름"
              placeholder="예: 미니빈"
              required
              labelColor={theme.color.green}
            />

            <InputField
              name="prompt"
              label="AI 프롬프트"
              placeholder="캐릭터의 성격이나 말투를 설명해주세요."
              required
              labelColor={theme.color.green}
            />

            <S.InputContainer>
              <S.Label htmlFor="image">썸네일 이미지</S.Label>
              <S.FileInput
                type="file"
                id="image"
                accept="image/*"
                {...methods.register("image", { required: true })}
              />
            </S.InputContainer>

            <S.SubmitBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? "생성 중..." : "캐릭터 생성"}
            </S.SubmitBtn>
          </S.Form>
        </FormProvider>
      </S.Container>
    </>
  );
};

export default AddChar;
