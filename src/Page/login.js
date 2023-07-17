import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledInput from "../Components/Input";
import styled from "styled-components";

const schema = yup.object().shape({
  email: yup.string().email().required("이메일을 입력해주세요"),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
});

const LoginHookForm = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all", //제출하기 전
    reValidateMode: "onChange", //제출하고 나서
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    trigger(); //유효성 검사 강제로 시작하게 함
  }, []);

  const onSubmit = (info) => console.log(info);
  const onError = (info) => console.log(info);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <ControlledInput
        control={control}
        name={"email"}
        type="email"
        label={"이메일"}
        placeholder={"이메일을 입력해주세요"}
      />
      <ControlledInput
        control={control}
        name={"password"}
        type="password"
        label={"비밀번호"}
        placeholder={"비밀번호를 입력해주세요"}
      />
      <CustomButton type="submit" disabled={!isValid}>
        로그인
      </CustomButton>
    </Form>
  );
};

export default LoginHookForm;

const Form = styled.form`
  width: 100%;
`;

const CustomButton = styled.button`
  width: 100px;
  padding: 7px;
  border: none;
  background-color: gray;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;
