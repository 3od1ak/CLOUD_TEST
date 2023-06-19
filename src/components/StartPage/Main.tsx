import React from "react";
import { styled } from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ActionTypes,
  SetEmailAction,
  SetPhoneNumberAction,
} from "../../reducer/store";
import InputMask from "react-input-mask";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Требуется номер телефона"),
  email: yup.string().email("Некорректный email").required("Требуется почта"),
});

const Main = styled.div`
  display: flex;
  margin: 2rem;
`;

const ContainersInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NumberText = styled.span`
  font-family: "SB Sans Interface", sans-serif;
  font-size: 16px;
`;

const NumberInput = styled(InputMask)`
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 12px;
  gap: 12px;
  font-family: "SB Sans Interface", sans-serif;
  width: 400px;
  height: 44px;
  font-size: 16px;
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 24px;
`;

const EmailText = styled.span`
  font-family: "SB Sans Interface", sans-serif;
  font-size: 16px;
`;

const EmailInput = styled.input`
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 12px;
  font-family: "SB Sans Interface", sans-serif;
  font-size: 16px;
`;

const ErrorMessage = styled.span`
  color: ${({ color }: any) => color || "red"};
  font-family: "SB Sans Interface", sans-serif;
  font-size: 15px;
`;

const ButtonSubmit = styled.button`
  margin-top: 50px;
  width: 109px;
  height: 54px;
  left: 24px;
  top: 369px;

  background: #5558fa;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-family: "SB Sans Interface", sans-serif;

  &:hover {
    cursor: pointer;
  }
`;

interface FormData {
  phoneNumber: string;
  email: string;
}

function StyledMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      phoneNumber: "+7 (927) 064-77-36",
      email: "g4orm_alex@mail.ru",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      navigate("/second_page");
    },
  });

  const { handleChange, values, errors, touched } = formik;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneNumber = values.phoneNumber;
    const email = values.email;

    dispatch<SetPhoneNumberAction>({
      type: ActionTypes.SET_PHONE_NUMBER,
      payload: phoneNumber,
    });

    dispatch<SetEmailAction>({
      type: ActionTypes.SET_EMAIL,
      payload: email,
    });

    navigate("/create/first_page");
  };

  return (
    <Main>
      <ContainersInput>
        <form onSubmit={handleSubmit}>
          <NumberContainer>
            <NumberText>Номер телефона</NumberText>
            <NumberInput
              mask="+7 (999) 999-99-99"
              maskChar="_"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              id="field-phone"
              as={NumberInput}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            )}
          </NumberContainer>

          <EmailContainer>
            <EmailText>Email</EmailText>
            <EmailInput
              placeholder="tim.jennings@example.com"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {errors.email && touched.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
          </EmailContainer>

          <ButtonSubmit id="button-start" type="submit">
            Начать
          </ButtonSubmit>
        </form>
      </ContainersInput>
    </Main>
  );
}

export default StyledMain;
