import React, { useState } from "react";
import { styled } from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import checkmarkIcon from "../../assets/img/checkmark.svg";
import { schema } from "../../services/schemaValidate";
import { useDispatch } from "react-redux";
import {
  ActionTypes,
  AppState,
  SetAboutAction,
  SetNicknameAction,
} from "../../reducer/store";
import { useSelector } from "react-redux";
import Modal from "../Modals/OKorNO";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = styled.div`
  width: 900px;
  height: 500px;
  background: white;
  margin: 0 auto;
  border-radius: 12px 12px 0px 0px;

  @media (max-width: 768px) {
    width: 700px;
    height: 400px;
    background: white;
    margin: 0 auto;
    border-radius: 12px 12px 0px 0px;
  }
`;

const GeneralContainer = styled.div`
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 610px;
`;

const StepContainer = styled.div`
  margin: 3rem auto;
  width: 680px;

  @media (max-width: 768px) {
    margin: 3rem 3rem;
    width: 600px;
  }
`;

const StepLine = styled.div`
  display: flex;
  align-items: center;
  height: 8px;
  background-color: #ccc;
  justify-content: space-between;
  margin: 0 auto;
  background: linear-gradient(to right, #5558fa 0%, #5558fa 100%);
  border-radius: 8px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCircle = styled.div<{ selected?: boolean; old?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ selected, old }) =>
    selected || old ? "#5558FA" : "#A6A6A6"};

  background-image: ${({ old }) => (old ? `url(${checkmarkIcon})` : "none")};
  background-position: center center;

  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  margin-top: 1.4rem;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20%;
    height: 20%;
    border-radius: 50%;
    background-color: ${({ selected }) => (selected ? "#fff" : "transparent")};

    background-repeat: no-repeat;
    /* background-size: cover; */
  }
`;

const StepNumber = styled.span<{ selected?: boolean }>`
  margin-top: 0.2rem;
  color: ${({ selected }) => (selected ? "#5558FA" : "#A6A6A6")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  font-family: "SB Sans Interface", sans-serif;
`;

const InputContainers = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  & > div > input,
  & > div > select {
    background: white;
  }

  @media (max-width: 768px) {
    width: 610px;
    margin: 0 auto;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NumberText = styled.span`
  font-family: "SB Sans Interface", sans-serif;
  font-size: 16px;
  margin: 1rem 0 10px 0; /* Add the desired margin value here */
`;

const NumberInput = styled.textarea`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 12px;
  gap: 12px;
  font-family: "SB Sans Interface", sans-serif;
  width: 680px;
  height: 84px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 610px;
    margin: 0 auto;
  }
`;

const Counter = styled.span`
  font-family: "SB Sans Interface", sans-serif;
  font-size: 12px;
  width: 100%;
  color: #555;
  display: flex;
  justify-content: flex-end;
`;

const ErrorMessage = styled.span`
  color: ${({ color }: any) => color || "red"};
  font-family: "SB Sans Interface", sans-serif;
  font-size: 15px;
`;

const ButtonContainers = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const ButtonSubmitBack = styled.button`
  width: 93px;
  height: 54px;

  background: white;
  color: #5558fa;
  border-radius: 8px;
  border: 1px solid #5558fa;
  font-size: 16px;
  font-family: "SB Sans Interface", sans-serif;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonSubmitNext = styled.button`
  width: 93px;
  height: 54px;

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
  nickname: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  sex: "not-selected" | "man" | "woman";
  about: string;
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  radio: "radio1" | "radio2" | "radio3";
}

const StyledTHirdPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const [radios, setRadios] = useState(["radio1", "radio2", "radio3"]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success"); // Fix the type of modalType

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const formattedText = text.replace(/\s/g, ""); // Удаление пробелов
    formik.handleChange(e);
    setInput(formattedText);
  };

  const maxLength = 200;
  const remainingCharacters = maxLength - input.length;

  const numberInputSchema = yup.object().shape({
    about: yup
      .string()
      .required("Обязательное поле")
      .max(200, "Максимальное количество символов: 200"),
  });

  const formik = useFormik<FormData>({
    initialValues: {
      nickname: "",
      name: "",
      surname: "",
      phone: "",
      email: "",
      sex: "not-selected",
      about: "",
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      radio: "radio1", // Значение по умолчанию для радиокнопок
    },
    validationSchema: numberInputSchema,
    onSubmit: (values) => {
      navigate("/first_page");
    },
  });

  const handleBack = () => {
    navigate("/second_page");
  };

  const {
    nickname,
    name,
    surname,
    phone,
    email,
    sex,
    selectedRadioButton,
    checkboxes,
    inputs,
  } = useSelector(
    (state) => state as AppState // Update "state" with the correct slice of your Redux store
  );

  interface FormData {
    nickname: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
    sex: "not-selected" | "man" | "woman";
    about: string;
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    radio: "radio1" | "radio2" | "radio3";
  }

  const handleSubmitForm = async (formData: Partial<FormData>) => {
    try {
      const response = await fetch(
        "https://api.sbercloud.ru/content/v1/bootcamp/frontend",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setModalType("success");
      } else {
        setModalType("error");
      }
      setModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setModalType("error");
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formik.isValid || !formik.values.about.trim()) {
      return; // Поле NumberInput не прошло валидацию или осталось пустым
    }

    // Access form field values from formik object
    const about = values.about;

    // Dispatch actions to update the Redux store
    dispatch<SetAboutAction>({
      type: ActionTypes.SET_ABOUT,
      payload: about,
    });

    const formData = {
      nickname,
      name,
      surname,
      phone,
      email,
      sex,
      about,
      selectedRadioButton,
      checkboxes,
      inputs,
    };

    handleSubmitForm(formData);
  };

  const { handleSubmit, values, errors, touched } = formik;
  return (
    <Container>
      <Main>
        <StepContainer>
          <StepLine>
            <Step>
              <StepCircle old />
              <StepNumber selected>1</StepNumber>
            </Step>
            <Step>
              <StepCircle old />
              <StepNumber selected>2</StepNumber>
            </Step>
            <Step>
              <StepCircle selected />
              <StepNumber selected>3</StepNumber>
            </Step>
          </StepLine>
        </StepContainer>
        <GeneralContainer>
          <form onSubmit={handleNext}>
            <InputContainers>
              <NumberText>About</NumberText>
              <NumberInput
                placeholder="Placeholder"
                name="about"
                id="field_about"
                value={input}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                maxLength={maxLength}
              />
              {errors.about && touched.about && (
                <ErrorMessage>{errors.about}</ErrorMessage>
              )}
              <Counter>{`Осталось: ${remainingCharacters} символов`} </Counter>
            </InputContainers>

            <ButtonContainers>
              <ButtonSubmitBack
                id="button-back"
                type="button"
                onClick={handleBack}
              >
                Назад
              </ButtonSubmitBack>
              <ButtonSubmitNext id="button-send" type="submit">
                Далее
              </ButtonSubmitNext>
            </ButtonContainers>
          </form>
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            type={modalType}
          />
        </GeneralContainer>

        {/* Existing button code... */}
      </Main>
    </Container>
  );
};

export default StyledTHirdPage;
