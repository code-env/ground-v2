import { Route, Routes } from "react-router";
import { BackgroundChange, Home, NotFound, PhoneShowcase } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="phone" element={<PhoneShowcase />} />
      <Route path="bg" element={<BackgroundChange />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
