import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import TestPage from "./Test";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<TestPage />} />
      </Routes>
    </>
  );
};

export default App;
