import { Route, Routes } from "react-router";
import { BackgroundChange, Home, NotFound, PhoneShowcase } from "./pages";
import TestPage from "./pages/test";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="phone" element={<PhoneShowcase />} />
      <Route path="bg" element={<BackgroundChange />} />
      <Route path="test" element={<TestPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
