import React from "react";
import styled from "styled-components";
import ok_response from "../../assets/img/OK_response.svg";
import cross_close_error from "../../assets/img/cross_close_error.svg";
import error_cross from "../../assets/img/error_cross.svg";
import { useNavigate } from "react-router-dom";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Затемнение фона */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
`;

const ErrorCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 100px;
`;

const ErrorImage = styled.img`
  cursor: pointer;
`;

const ModalContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  width: 460px;
  height: 312px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Title = styled.h2<{ isSuccess: boolean }>`
  font-family: "SB Sans Interface", sans-serif;
  text-align: center;
  align-items: center;
  justify-content: ${(props) => (props.isSuccess ? "center" : "space-between")};
  width: ${(props) => (props.isSuccess ? "auto" : "396px")};
  display: flex;
`;

const CircleBig = styled.div<{ error?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: ${(props) =>
    props.error ? "rgba(232, 78, 88, 0.15)" : "rgba(5, 174, 113, 0.15)"};
  border-radius: 100px;
`;

const OkResponseImage = styled.img`
  width: 38.4px;
  height: 38.4px;
`;

const GoToMainButton = styled.button`
  font-family: "SB Sans Interface", sans-serif;
  font-size: 14px;
  background: #5558fa;
  border-radius: 4px;
  border: none;
  padding: 12px 16px;
  color: white;
  cursor: pointer;
`;

const CloseButton = styled.button`
  font-family: "SB Sans Interface", sans-serif;
  font-size: 14px;
  background: #5558fa;
  border-radius: 4px;
  border: none;
  padding: 12px 16px;
  color: white;
  cursor: pointer;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate("/");
  };

  if (!isOpen) return null;

  const isErrorMessage = type === "error";
  const isSuccess = !isErrorMessage;

  return (
    <ModalWrapper className="modal">
      <ModalContent className="modal-content">
        <Title isSuccess={isSuccess}>
          {isErrorMessage ? "Ошибка" : "Форма успешно отправлена"}{" "}
          {isErrorMessage && (
            <ErrorCircle>
              <ErrorImage src={cross_close_error} alt="Error" />
            </ErrorCircle>
          )}
        </Title>
        {isErrorMessage ? (
          <CircleBig error>
            <ErrorImage src={error_cross} alt="Error" onClick={onClose} />
          </CircleBig>
        ) : (
          <CircleBig>
            <OkResponseImage src={ok_response} alt="OK Response" />
          </CircleBig>
        )}
        {isErrorMessage ? (
          <CloseButton onClick={onClose}>Закрыть</CloseButton>
        ) : (
          <GoToMainButton onClick={handleGoToMain}>На главную</GoToMainButton>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
