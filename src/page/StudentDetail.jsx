import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getById, updateStudent } from "../services/student.service";
import { Button, Form } from "react-bootstrap";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    studentCode: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await getById(id);
        if (response && response.data) {
          setStudent(response.data);
        } else {
          console.error("Invalid data format received: ", response);
        }
      } catch (error) {
        console.error("Error fetching student detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetail();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: name === "isActive" ? !prevStudent.isActive : value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await updateStudent(id, student);
      if (response && response.status === 200) {
        alert("Student updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>No student found.</div>;
  }

  return (
    <div className="container mx-auto mt-20 p-6 bg-white rounded shadow-md">
      <h2 className="text-center mb-4 text-xl font-bold">Student Detail</h2>
      <Link to="/students">
        <Button
          variant="primary"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
        >
          Return Home
        </Button>
      </Link>
      <Form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name}
            onChange={handleInputChange}
            readOnly={!isEditing} // Only editable when in edit mode
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="studentCode"
            className="block text-gray-700 font-semibold"
          >
            Student Code
          </label>
          <input
            type="text"
            id="studentCode"
            name="studentCode"
            value={student.studentCode}
            onChange={handleInputChange}
            readOnly={!isEditing} // Only editable when in edit mode
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="isActive"
            className="block text-gray-700 font-semibold"
          >
            Status
          </label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={student.isActive}
            onChange={handleInputChange}
            disabled={!isEditing} // Only editable when in edit mode
          />
          <label htmlFor="isActive" className="ml-2">
            Active
          </label>
        </div>

        <div>
          <Button
            variant="secondary"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-4"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && (
            <Button
              type="submit"
              variant="primary"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Update Student
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default StudentDetail;
