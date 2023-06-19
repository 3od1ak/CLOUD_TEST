import StyledMain from "./components/StartPage/Main";
import { Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import StyledFirstPage from "./components/Questionnaire/FirstPage";
import StyledTwoPage from "./components/Questionnaire/TwoPage";
import StyledThirdPage from "./components/Questionnaire/ThirdPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/create/first_page" element={<StyledFirstPage />}></Route>
        <Route path="/create/second_page" element={<StyledTwoPage />}></Route>
        <Route path="/create/third_page" element={<StyledThirdPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
