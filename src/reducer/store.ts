import { createStore } from "redux";

export interface AppState {
  phone: string;
  email: string;
  nickname: string;
  name: string;
  surname: string;
  sex: "not-selected" | "man" | "woman";
  about: string;
  inputs: string[];
  checkboxes: boolean[];
  selectedRadioButton: string;
}

export enum ActionTypes {
  SET_PHONE_NUMBER = "SET_PHONE_NUMBER",
  SET_EMAIL = "SET_EMAIL",
  SET_NICKNAME = "SET_NICKNAME",
  SET_NAME = "SET_NAME",
  SET_SURNAME = "SET_SURNAME",
  SET_SEX = "SET_SEX",
  SET_ABOUT = "SET_ABOUT",
  SET_INPUTS = "SET_INPUTS",
  SET_CHECKBOXES = "SET_CHECKBOXES",
  SET_SELECTED_RADIOBUTTON = "SET_SELECTED_RADIOBUTTON",
}

export interface SetPhoneNumberAction {
  type: ActionTypes.SET_PHONE_NUMBER;
  payload: string;
}

export interface SetEmailAction {
  type: ActionTypes.SET_EMAIL;
  payload: string;
}

export interface SetNicknameAction {
  type: ActionTypes.SET_NICKNAME;
  payload: string;
}

export interface SetNameAction {
  type: ActionTypes.SET_NAME;
  payload: string;
}

export interface SetSurnameAction {
  type: ActionTypes.SET_SURNAME;
  payload: string;
}

export interface SetSexAction {
  type: ActionTypes.SET_SEX;
  payload: "not-selected" | "man" | "woman";
}

export interface SetAboutAction {
  type: ActionTypes.SET_ABOUT;
  payload: string;
}

export interface SetInputsAction {
  type: ActionTypes.SET_INPUTS;
  payload: string[];
}

export interface SetCheckboxesAction {
  type: ActionTypes.SET_CHECKBOXES;
  payload: boolean[];
}

export interface SetSelectedRadioButtonAction {
  type: ActionTypes.SET_SELECTED_RADIOBUTTON;
  payload: string;
}

type AppAction =
  | SetPhoneNumberAction
  | SetEmailAction
  | SetNicknameAction
  | SetNameAction
  | SetSurnameAction
  | SetSexAction
  | SetAboutAction
  | SetInputsAction
  | SetCheckboxesAction
  | SetSelectedRadioButtonAction;

const initialState: AppState = {
  phone: "",
  email: "",
  nickname: "",
  name: "",
  surname: "",
  sex: "not-selected",
  about: "",
  inputs: [],
  checkboxes: [],
  selectedRadioButton: "",
};

export const appReducer = (
  state = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case ActionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionTypes.SET_PHONE_NUMBER:
      return { ...state, phone: action.payload };
    case ActionTypes.SET_NICKNAME:
      return { ...state, nickname: action.payload };
    case ActionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case ActionTypes.SET_SURNAME:
      return { ...state, surname: action.payload };
    case ActionTypes.SET_SEX:
      return { ...state, sex: action.payload };
    case ActionTypes.SET_ABOUT:
      return { ...state, about: action.payload };
    case ActionTypes.SET_INPUTS:
      return { ...state, inputs: action.payload };
    case ActionTypes.SET_CHECKBOXES:
      return { ...state, checkboxes: action.payload };
    case ActionTypes.SET_SELECTED_RADIOBUTTON:
      return { ...state, selectedRadioButton: action.payload };

    default:
      return state;
  }
};

const store = createStore(appReducer);

export default store;
