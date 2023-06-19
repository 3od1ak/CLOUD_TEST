import React, { useState } from "react";
import { styled } from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import checkmarkIcon from "../../assets/img/checkmark.svg";
import trashIcon from "../../assets/img/trash.svg";
import { useDispatch } from "react-redux";
import {
  ActionTypes,
  SetCheckboxesAction,
  SetInputsAction,
  SetSelectedRadioButtonAction,
} from "../../reducer/store";

const validationSchema = yup.object().shape({
  nickname: yup
    .string()
    .max(30, "Nickname must be at most 30 characters long")
    .matches(/^[a-zA-Z0-9]+$/, "Nickname can only contain letters and numbers")
    .required("Nickname is required"),
  name: yup
    .string()
    .max(50, "Name must be at most 50 characters long")
    .matches(/^[a-zA-Z]+$/, "Name can only contain letters")
    .required("Name is required"),
  surname: yup
    .string()
    .max(50, "Surname must be at most 50 characters long")
    .matches(/^[a-zA-Z]+$/, "Surname can only contain letters")
    .required("Surname is required"),
  sex: yup.string().oneOf(["man", "woman"], "Select a gender"),
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

  @media (max-width: 768px) {
    width: 700px;
    height: 780px;
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
  width: 680px;

  @media (max-width: 768px) {
    width: 610px;
  }
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
  background: linear-gradient(
    to right,
    #5558fa 0%,
    #5558fa 50%,
    rgba(0, 0, 0, 0.08) 50%,
    rgba(0, 0, 0, 0.08) 100%
  );
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

const ErrorMessage = styled.span`
  color: ${({ color }: any) => color || "red"};
  font-family: "SB Sans Interface", sans-serif;
  font-size: 15px;
`;

const AddInputButton = styled.button`
  width: 50px;
  height: 50px;
  background: transparent;
  color: #5558fa;
  border-radius: 4px;
  border: 2px solid #5558fa;
  font-size: 16px;
  font-family: "SB Sans Interface", sans-serif;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background: #5558fa;
    color: white;
  }
`;

const RemoveInputIcon = styled.img`
  margin-left: 6px;
  &:hover {
    cursor: pointer;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  & > div > input,
  & > div > select {
    background: white;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 2px;
`;

const CheckboxLabel = styled.label`
  font-family: "SB Sans Interface", sans-serif;
`;
const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  & > div > input,
  & > div > select {
    background: white;
  }
`;

const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 2px;
`;

const RadioButtonLabel = styled.label`
  font-family: "SB Sans Interface", sans-serif;
`;

const ButtonContainers = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
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
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  radio: "" | "radio1" | "radio2" | "radio3";
}

const StyledTwoPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<string[]>(["", "", ""]);
  const [iconIds, setIconIds] = useState(inputs.map((_, index) => index));
  const dispatch = useDispatch();

  const [checkboxes, setCheckboxes] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [radios, setRadios] = useState(["radio1", "radio2", "radio3"]);

  const addInput = () => {
    setInputs((prevInputs) => [...prevInputs, ""]);
  };

  const toggleCheckbox = (index: number) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = [...prevCheckboxes];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      return updatedCheckboxes;
    });
  };

  const removeInput = (index: number) => {
    setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
    setIconIds((prevIds) => prevIds.filter((_, i) => i !== index));
  };

  const formik = useFormik<FormData>({
    initialValues: {
      nickname: "",
      name: "",
      surname: "",
      phone: "",
      email: "",
      sex: "not-selected",
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      radio: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate("/create/third_page");
    },
  });

  const handleBack = () => {
    navigate("/create/first_page");
  };

  interface FormValues {
    [key: string]: string;
  }

  const handleNext = () => {
    const selectedCheckboxes = checkboxes
      .map((isChecked, index) => (isChecked ? index : null))
      .filter((checkbox) => checkbox !== null);

    const selectedRadioIndex = radios.findIndex(
      (radio) => values.radio === radio
    );

    const selectedFields = [...selectedCheckboxes];

    const updatedCheckboxes = checkboxes.map((isChecked, index) => {
      if (selectedCheckboxes.includes(index)) {
        return true;
      }
      return false;
    });
    setCheckboxes(updatedCheckboxes);

    const updatedRadios = radios.map((radio, index) => {
      if (index === selectedRadioIndex) {
        return radio;
      }
      return "";
    });
    setRadios(updatedRadios);

    dispatch<SetInputsAction>({
      type: ActionTypes.SET_INPUTS,
      payload: inputs,
    });

    dispatch<SetCheckboxesAction>({
      type: ActionTypes.SET_CHECKBOXES,
      payload: updatedCheckboxes,
    });

    dispatch<SetSelectedRadioButtonAction>({
      type: ActionTypes.SET_SELECTED_RADIOBUTTON,
      payload: updatedRadios[updatedRadios.findIndex((radio) => radio !== "")],
    });

    navigate("/create/third_page");
  };

  const { handleSubmit, handleChange, values, errors, touched } = formik;
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
              <StepCircle selected />
              <StepNumber selected>2</StepNumber>
            </Step>
            <Step>
              <StepCircle />
              <StepNumber>3</StepNumber>
            </Step>
          </StepLine>
        </StepContainer>
        <GeneralContainer>
          <InputContainers>
            <NumberText>Advantages</NumberText>
            {inputs.map((input, index) => (
              <InputContainer key={index}>
                <NumberInput
                  placeholder="Placeholder"
                  name={`input_${index}`}
                  value={input}
                  onChange={(e) => {
                    const updatedInputs = [...inputs];
                    updatedInputs[index] = e.target.value;
                    setInputs(updatedInputs);
                  }}
                  onBlur={formik.handleBlur}
                  id={`field-advatages-${index}`}
                />
                <RemoveInputIcon
                  src={trashIcon}
                  alt="Remove"
                  onClick={() => removeInput(index)}
                  id={`button-remove-${iconIds[index] + 1}`}
                />
              </InputContainer>
            ))}

            <AddInputButton id="button add" type="button" onClick={addInput}>
              +
            </AddInputButton>
          </InputContainers>

          <CheckboxGroup>
            {/* Checkboxes */}
            <NumberText>Checkbox group</NumberText>
            {checkboxes.map((isChecked, index) => (
              <CheckboxContainer key={index}>
                <input
                  type="checkbox"
                  id={`field-checkbox-group-option-${index + 1}`}
                  name={`checkbox_${index}`}
                  checked={isChecked}
                  onChange={() => toggleCheckbox(index)}
                />
                <CheckboxLabel htmlFor={`checkbox_${index}`}>
                  {index + 1}
                </CheckboxLabel>
              </CheckboxContainer>
            ))}
          </CheckboxGroup>

          <RadioGroup>
            {/* Radio Buttons */}
            <NumberText>Radio group</NumberText>
            {radios.map((radio, index) => (
              <RadioButtonContainer key={radio}>
                <input
                  type="radio"
                  id={`field-radio-group-option-${index + 1}`}
                  name="radio"
                  value={radio}
                  checked={values.radio === radio}
                  onChange={handleChange}
                />
                <RadioButtonLabel htmlFor={radio}>{index + 1}</RadioButtonLabel>
              </RadioButtonContainer>
            ))}
          </RadioGroup>
          <ButtonContainers>
            <ButtonSubmitBack
              id="button-back"
              type="button"
              onClick={handleBack}
            >
              Назад
            </ButtonSubmitBack>
            <ButtonSubmitNext
              id="button-next"
              type="submit"
              onClick={handleNext}
            >
              Далее
            </ButtonSubmitNext>
          </ButtonContainers>
        </GeneralContainer>

        {/* Existing button code... */}
      </Main>
    </Container>
  );
};

export default StyledTwoPage;
