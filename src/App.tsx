import { HashRouter, Routes, Route } from "react-router-dom";
import Editor from "./views/editorFinal";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/test" element={<Editor />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
