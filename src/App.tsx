import { Routes, Route } from "react-router";
import { Home, NotFound } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
