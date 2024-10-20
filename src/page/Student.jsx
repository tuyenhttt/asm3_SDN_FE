import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap"; // Bạn có thể giữ lại Button từ React Bootstrap nếu cần
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getStudents, deleteStudent } from "../services/student.service";

const StudentPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents(); // Fetch data from API
        console.log("Fetched Students:", response);

        // Kiểm tra xem dữ liệu trả về có đúng định dạng không
        if (response && response.data && Array.isArray(response.data)) {
          setStudents(response.data); // Set state with fetched data
          console.log("Fetched Students:", response.data);
        } else {
          console.error("Invalid data format received: ", response);
          setStudents([]); // Set empty array if data is invalid
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]); // Set empty array in case of error
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    // Gọi API để xóa sinh viên
    try {
      await deleteStudent(id); // Gọi hàm xóa sinh viên
      setStudents(students.filter((student) => student._id !== id)); // Cập nhật danh sách sinh viên
      console.log(`Student with ID ${id} deleted.`);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      <Link to="/students/create">
        <Button
          className="p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
          variant="primary"
        >
          Create New Student
        </Button>
      </Link>
      <Table striped bordered hover className="w-full mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-center">STT</th>
            <th className="text-center">Name</th>
            <th className="text-center">Student Code</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{student.name}</td>
                <td className="text-center">{student.studentCode}</td>
                <td className="text-center">
                  {student.isActive ? "Active" : "Inactive"}
                </td>
                <td className="text-center flex justify-center space-x-2">
                  <Link to={`/students/${student._id}`}>
                    <Button
                      variant="info"
                      className="p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      View Detail
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="p-2 rounded-md bg-red-500 hover:bg-red-700 text-white"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-2 border-b">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentPage;
