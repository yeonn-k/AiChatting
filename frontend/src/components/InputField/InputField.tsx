import { useFormContext } from "react-hook-form";
import { S } from "./InputField.styled";

interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  pattern?: RegExp;
  required?: boolean;
}

const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  pattern,
  required = true,
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = (errors as Record<string, any>)[name];

  return (
    <S.InputContainer>
      {label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label || name}을(를) 입력해주세요.` : false,
          pattern: pattern
            ? {
                value: pattern,
                message: `올바른 ${label || name}을(를) 입력해주세요.`,
              }
            : undefined,
        })}
        $error={!!fieldError}
      />
      {fieldError && <S.ErrorText>{String(fieldError.message)}</S.ErrorText>}
    </S.InputContainer>
  );
};

export default InputField;
