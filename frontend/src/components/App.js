import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./Shared/GlobalStyles";
import TestPage from "./Test";
import Redirect from "./Shared/Redirect";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<TestPage />} />

        {/* Server Fetch links */}
        <Route path="/auth/*" element={<Redirect type="server" />} />
        {/* External links */}
        {<Route path="/http\\:/*" element={<Redirect type="external" />} />}
        {<Route path="/https\\:/*" element={<Redirect type="external" />} />}
      </Routes>
    </>
  );
};

export default App;
