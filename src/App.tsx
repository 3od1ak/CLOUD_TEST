import StyledMain from "./components/StartPage/Main";
import { Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import StyledFirstPage from "./components/Questionnaire/FirstPage";
import StyledTwoPage from "./components/Questionnaire/TwoPage";
import StyledThirdPage from "./components/Questionnaire/ThirdPage";
import { useSelector } from "react-redux";
import { AppState } from "./reducer/store";

function App() {
  const phone = useSelector((state) => (state as AppState).phone);
  const email = useSelector((state) => (state as AppState).email);
  const nickname = useSelector((state) => (state as AppState).nickname);
  const name = useSelector((state) => (state as AppState).name);
  const surname = useSelector((state) => (state as AppState).surname);
  const sex = useSelector((state) => (state as AppState).sex);
  const about = useSelector((state) => (state as AppState).about);

  console.log(phone, email, nickname, name, surname, sex, about);

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/first_page" element={<StyledFirstPage />}></Route>
        <Route path="/second_page" element={<StyledTwoPage />}></Route>
        <Route path="/third_page" element={<StyledThirdPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
