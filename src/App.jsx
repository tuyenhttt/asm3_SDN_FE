import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPage from "./page/Student";
import StudentDetail from "./page/StudentDetail";
import CreateStudentPage from "./page/CreateStudentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<StudentPage />} />
        <Route path="/students/create" element={<CreateStudentPage />} />
        <Route path="/students/:id" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
