import { Controller } from "react-hook-form";
import styled from "styled-components";

const ControlledInput = ({ name, control, defaultValue, ...rest }) => {
  const controllerProps = {
    name,
    defaultValue,
    control,
  };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <CustomInput
              name={name}
              {...rest}
              hasError={!!error} // boolean 값으로 바꾸는
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}{" "}
          </>
        );
      }}
    ></Controller>
  );
};

export default ControlledInput;

const CustomInput = styled.input`
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 2px solid ${(props) => (props.hasError ? "red" : "black")};
  padding: 10px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin: 10px;
`;
