import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./Shared/GlobalStyles";
import TestPage from "./Test";
import Redirect from "./Shared/Redirect";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" index element={<TestPage />} />

        {/* Server Fetch links */}
        <Route path="/auth/:type" element={<Redirect end="server" />} />
        {/* External links */}
      </Routes>
    </>
  );
};

export default App;
