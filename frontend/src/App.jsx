import AuthForm from "./pages/Auth";
import NotFound from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from "./pages/Todo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="Todo" element={<Todos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
