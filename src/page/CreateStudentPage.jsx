import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { Button } from "react-bootstrap";
import { createStudent } from "../services/student.service";
import { Link } from "react-router-dom";

const CreateStudentPage = () => {
  const [name, setName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [isActive, setIsActive] = useState(true); // Default to active
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent({ name, studentCode, isActive });
      navigate("/students"); // Use navigate to go back to students page
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-center text-2xl font-bold">Create New Student</h1>
      <Link to="/students">
        <Button
          variant="primary"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Return Home
        </Button>
      </Link>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="studentCode" className="block mb-2">
            Student Code
          </label>
          <input
            type="text"
            id="studentCode"
            name="studentCode"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-700">Is Active</span>
          </label>
        </div>
        <Button
          variant="primary"
          type="submit"
          className="mt-2 bg-green-500 text-white rounded p-4 text-lg"
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateStudentPage;
