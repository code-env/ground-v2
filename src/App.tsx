import { Routes, Route } from "react-router";
import { Home, NotFound, PhoneShowcase } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="phone" element={<PhoneShowcase />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
