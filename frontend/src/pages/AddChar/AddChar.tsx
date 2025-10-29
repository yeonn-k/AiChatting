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
import { useState } from "react";
import { resizeToWebp } from "@/utils/handleImgSize";

interface AddCharForm {
  name: string;
  prompt: string;
  image: FileList;
}

const AddChar = () => {
  const methods = useForm<AddCharForm>({ mode: "onBlur" });
  const navigate = useNavigate();
  const addCustom = useCharacterStore((s) => s.addCustom);
  const [preview, setPreview] = useState<string>("");
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onFileChange = async (file?: File) => {
    if (!file) return;
    try {
      const { webpFile, previewUrl } = await resizeToWebp(file);

      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return previewUrl;
      });

      const dt = new DataTransfer();
      dt.items.add(webpFile);
      const input = document.getElementById("image") as HTMLInputElement | null;
      if (input) input.files = dt.files;
    } catch (e: any) {
      toast.error(e.message || "이미지 처리 실패");
    }
  };

  const createCharacter = async (fd: FormData) => {
    const res = await postAxios("/addchar", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res;
  };

  const onSubmit = async (data: AddCharForm) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("prompt", data.prompt);
      if (data.image?.[0]) fd.append("image", data.image[0]);

      const res = await createCharacter(fd);
      const char = res.data?.character;

      if (!char) toast.error("캐릭터 생성 중 오류가 발생했습니다.");

      addCustom?.({
        id: char.id,
        name: char.name,
        imgUrl: char.imgUrl ? `http://localhost:8080${char.imgUrl}` : "",
        prompt: char.prompt,
      });

      toast.success("새 캐릭터가 생성되었습니다!");
      reset();
      navigate(ROUTE_LINK.CHOOSECHAR.link);
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
                onChange={(e) => onFileChange(e.target.files?.[0])}
              />

              {preview && (
                <S.PreviewBox>
                  <S.Preview src={preview} alt="preview" style={{}} />
                </S.PreviewBox>
              )}
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
