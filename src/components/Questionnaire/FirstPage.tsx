import React, { useState } from "react";
import { styled } from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import sourceIcon from "../../assets/img/arrow.svg"; // Путь к иконке источника
import {
  ActionTypes,
  SetNameAction,
  SetNicknameAction,
  SetPhoneNumberAction,
  SetSexAction,
  SetSurnameAction,
} from "../../reducer/store";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  nickname: yup
    .string()
    .max(30, "Максимальная длина никнейма - 30 символов")
    .matches(/^[a-zA-Z0-9]+$/, "Никнейм может содержать только буквы и цифры")
    .required("Требуется никнейм"),
  name: yup
    .string()
    .max(50, "Максимальная длина имени - 50 символов")
    .matches(/^[a-zA-Zа-яА-Я]+$/, "Имя может содержать только буквы")
    .required("Требуется имя"),
  surname: yup
    .string()
    .max(50, "Максимальная длина фамилии - 50 символов")
    .matches(/^[a-zA-Zа-яА-Я]+$/, "Фамилия может содержать только буквы")
    .required("Требуется фамилия"),
  sex: yup
    .mixed()
    .oneOf(["man", "woman", "not-selected"], "Выберите пол")
    .required("Требуется указать пол"),
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = styled.div`
  width: 900px;
  height: 800px;
  background: white;
  margin: 0 auto;
  border-radius: 12px 12px 0px 0px;
`;

const StepContainer = styled.div`
  margin: 3rem auto;
  width: 680px;
`;

const StepLine = styled.div`
  display: flex;
  align-items: center;
  height: 8px;
  background-color: #ccc;
  justify-content: space-between;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCircle = styled.div<{ selected?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ selected }) => (selected ? "#5558FA" : "#A6A6A6")};
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
  }
`;

const InputContainers = styled.div`
  margin: 6rem auto;
  width: 680px;
  & > div:not(:last-child) {
    margin-bottom: 1rem;
  }
  & > div > input,
  & > div > select {
    background: white;
  }
`;

const StepNumber = styled.span<{ selected?: boolean }>`
  margin-top: 0.2rem;
  color: ${({ selected }) => (selected ? "#5558FA" : "#A6A6A6")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  font-family: "SB Sans Interface", sans-serif;
`;

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 96px;
`;

const NumberText = styled.span`
  font-family: "SB Sans Interface", sans-serif;
  font-size: 16px;
`;

const NumberInput = styled.input`
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

const SexSelectContainer = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  gap: 0.5rem;
  flex-direction: column;
`;

const SexText = styled.span`
  font-family: "SB Sans Interface", sans-serif;
  font-size: 16px;
`;

const SexSelect = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 12px;
  height: px;
  width: 400px;
  font-family: "SB Sans Interface", sans-serif;
  font-size: 16px;
  color: grey;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  appearance: none;
`;

const SourceIcon = styled.img`
  margin-left: -30px; /* Изменяем положение иконки */
`;

const SexList = styled.ul`
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 0;
  list-style: none;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SexListItem = styled.li`
  padding: 12px;
  font-family: "SB Sans Interface", sans-serif;
  font-size: 16px;
  color: grey;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SexSelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Sources = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
`;

interface CustomSexSelectProps {
  name: string;
  id: string;
  value: "man" | "woman" | "not-selected";
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  onSelect: (value: "man" | "woman") => void; // Add the 'onSelect' prop
}

const CustomSexSelect: React.FC<CustomSexSelectProps> = ({
  name,
  id,
  value,
  onChange,
  onBlur,
  onSelect, // Add the 'onSelect' prop
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (value: "man" | "woman") => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(value); // Call the 'onSelect' prop with the selected value
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSelectedValue(selectedValue);
  };

  return (
    <SexSelectContainer>
      <SexText>Sex</SexText>
      <SexSelectWrapper>
        <SexSelect
          onClick={handleToggle}
          value={selectedValue === "not-selected" ? "" : selectedValue}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          onMouseDown={(e) => e.preventDefault()}
        >
          {selectedValue === "not-selected" && (
            <option value="" disabled>
              Не выбрано
            </option>
          )}
          {selectedValue !== "not-selected" && (
            <option value={selectedValue}>{selectedValue}</option>
          )}
        </SexSelect>
        <SourceIcon src={sourceIcon} alt="Source Icon" />
      </SexSelectWrapper>

      {isOpen && (
        <SexList>
          <SexListItem
            id="field-sex-option-man"
            onClick={() => handleSelect("man")}
          >
            man
          </SexListItem>
          <SexListItem
            id="field-sex-option-woman"
            onClick={() => handleSelect("woman")}
          >
            woman
          </SexListItem>
        </SexList>
      )}
    </SexSelectContainer>
  );
};

const ErrorMessage = styled.span`
  color: ${({ color }: any) => color || "red"};
  font-family: "SB Sans Interface", sans-serif;
  font-size: 15px;
`;

const ButtonContainers = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
`;

const ButtonSubmitBack = styled.button`
  width: 93px;
  height: 54px;
  left: 24px;
  top: 369px;

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
  nickname: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  sex: "not-selected" | "man" | "woman";
}

const StyledFirstPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSex, setSelectedSex] = useState<
    "man" | "woman" | "not-selected"
  >("not-selected");

  const formik = useFormik<FormData>({
    initialValues: {
      nickname: "",
      name: "",
      surname: "",
      phone: "",
      email: "",
      sex: "not-selected",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      navigate("/second_page"); // Переход на страницу /start после успешной валидации формы
    },
  });

  const handleBack = () => {
    navigate("/");
  };

  const { handleSubmit, handleChange, values } = formik;
  const errors = formik.errors; // Добавьте это
  const touched = formik.touched; // Добавьте это

  const isValid =
    Object.keys(errors).length === 0 && Object.keys(touched).length !== 0;

  const handleNext = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formik.values.nickname ||
      !formik.values.name ||
      !formik.values.surname ||
      selectedSex === "not-selected"
    ) {
      return; // Поле NumberInput не прошло валидацию или осталось пустым
    }

    console.log(values);

    // Access form field values from formik object
    const nickname = values.nickname;
    const name = values.name;
    const surname = values.surname;
    const sex = selectedSex;

    // Dispatch actions to update the Redux store
    dispatch<SetNicknameAction>({
      type: ActionTypes.SET_NICKNAME,
      payload: nickname,
    });

    dispatch<SetNameAction>({
      type: ActionTypes.SET_NAME,
      payload: name,
    });

    dispatch<SetSurnameAction>({
      type: ActionTypes.SET_SURNAME,
      payload: surname,
    });

    dispatch<SetSexAction>({
      type: ActionTypes.SET_SEX,
      payload: sex,
    });

    console.log(nickname, name, surname, sex);

    navigate("/second_page");
  };

  return (
    <Container>
      <Main>
        <StepContainer>
          <StepLine>
            <Step>
              <StepCircle selected />
              <StepNumber selected>1</StepNumber>
            </Step>
            <Step>
              <StepCircle />
              <StepNumber>2</StepNumber>
            </Step>
            <Step>
              <StepCircle />
              <StepNumber>3</StepNumber>
            </Step>
          </StepLine>
        </StepContainer>
        <InputContainers>
          <form onSubmit={handleNext}>
            <GeneralContainer>
              <NumberText>Nickname</NumberText>
              <NumberInput
                placeholder="Placeholder"
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                id="field-nickname"
              />
              {errors.nickname && touched.nickname && (
                <ErrorMessage>{errors.nickname}</ErrorMessage>
              )}
            </GeneralContainer>
            <GeneralContainer>
              <NumberText>Name</NumberText>
              <NumberInput
                placeholder="Placeholder"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                id="field-name"
              />
              {errors.name && touched.name && (
                <ErrorMessage>{errors.name}</ErrorMessage>
              )}
            </GeneralContainer>
            <GeneralContainer>
              <NumberText>Sername</NumberText>
              <NumberInput
                placeholder="Placeholder"
                name="surname"
                value={values.surname}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                id="field-sername"
              />
              {errors.surname && touched.surname && (
                <ErrorMessage>{errors.surname}</ErrorMessage>
              )}
            </GeneralContainer>
            <CustomSexSelect
              name="sex"
              id="sex-select"
              value={values.sex}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              onSelect={setSelectedSex} // Pass the 'setSelectedSex' function as the 'onSelect' prop
            />
            {errors.sex && touched.sex && (
              <ErrorMessage>{errors.sex}</ErrorMessage>
            )}

            <ButtonContainers>
              <ButtonSubmitBack type="button" onClick={handleBack}>
                Назад
              </ButtonSubmitBack>
              <ButtonSubmitNext type="submit">Далее</ButtonSubmitNext>
            </ButtonContainers>
          </form>

          {/* ... (repeat for other fields) */}
        </InputContainers>
      </Main>
    </Container>
  );
};

export default StyledFirstPage;
