import React, { useEffect, useState } from "react";
import { addDocument, getStudents } from "../../Utils/Firebase/api";
import Loader from "../../Components/Loader";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firebase/firebase";

export default function Students() {
  const [modal, setModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    rollno: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData({ ...data, [name]: value });
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.name === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.class === "" ||
      data.rollno === ""
    ) {
      return alert("Please fill all the fields");
    }
    setLoading(true);
    try {
      await addDocument("Students", data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setData({
      name: "",
      email: "",
      phone: "",
      class: "",
      rollno: "",
    });
  };

  const newStudent = [
    {
      id: 1,
      name: "Name",
      type: "text",
      access: "name",
      placeholder: "Enter name",
    },
    {
      id: 2,
      name: "Email",
      type: "email",
      access: "email",
      placeholder: "Enter email",
    },
    {
      id: 3,
      name: "Phone",
      type: "number",
      access: "phone",
      placeholder: "Enter phone",
    },
    {
      id: 4,
      name: "Class",
      type: "text",
      access: "class",
      options: ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3"],
      placeholder: "Enter class",
    },
    {
      id: 5,
      name: "Roll No.",
      type: "number",
      access: "rollno",
      placeholder: "Enter roll no.",
    },
  ];

  const fetchData = async () => {
    setLoadingStudents(true);
    try {
      const studentList = await getDocs(collection(db, "Students"));
      let students = [];
      studentList.forEach((doc) => {
        students.push(doc.data());
      });
      setStudents(students);
    } catch (error) {
      setError(error);
    }
    setLoadingStudents(false);
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 justify-between">
        <h1 className="font-semibold text-3xl text-zinc-800">Students</h1>
        <button
          onClick={handleModal}
          className="px-4 py-1 rounded-md bg-blue-500 text-white "
        >
          New
        </button>
      </div>
      <div className="border rounded-md overflow-hidden">
        {loadingStudents ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-200 text-[14px]">
                <th className="text-left py-1 pl-2">Name</th>
                <th className="text-left py-1">Email</th>
                <th className="text-left py-1">Phone</th>
                <th className="text-left py-1">Class</th>
                <th className="text-left py-1">Roll No.</th>
                <th className="text-left py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[15px]">
              {students && students.length > 0 ? (
                students.map((student) => {
                  return (
                    <tr key={student.id} className="border-b last:border-none">
                      <td className="text-left pl-2 capitalize">
                        {student.name}
                      </td>
                      <td className="text-left">
                        <a
                          href={`mailto:${student.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {student.email}
                        </a>
                      </td>
                      <td className="text-left">
                        <a
                          href={`tel:${student.phone}`}
                          className="text-blue-500 hover:underline"
                        >
                          {student.phone}
                        </a>
                      </td>
                      <td className="text-left">{student.class}</td>
                      <td className="text-left">{student.rollno}</td>
                      <td className="text-left">
                        <div className="flex gap-2 text-[14px] py-1">
                          <button className="text-blue-500">Edit</button>
                          <button className="text-red-500">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center py-2" colSpan="6">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-30 backdrop-blur-sm w-screen h-screen flex items-center justify-center">
          <div className="border max-w-[30rem] w-full p-3 rounded-xl bg-white">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
              {newStudent.map((student) => {
                return (
                  <div className="flex flex-col gap-1" key={student.id}>
                    <label
                      htmlFor={student.access}
                      className="text-[13px] font-bold uppercase text-zinc-700"
                    >
                      {student.name}
                    </label>
                    {student.options ? (
                      <select
                        name={student.access}
                        id={student.access}
                        onChange={handleChange}
                        value={data[student.access]}
                        className=" outline-none bg-sky-100 shadow-inner border border-zinc-100 rounded-md px-2 py-1"
                      >
                        <option value="">Select class</option>
                        {student.options.map((option, index) => {
                          return (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <input
                        type={student.type}
                        name={student.access}
                        id={student.access}
                        onChange={handleChange}
                        value={data[student.access]}
                        placeholder={student.placeholder}
                        className=" outline-none bg-sky-100 shadow-inner border border-zinc-100 rounded-md px-2 py-1"
                      />
                    )}
                  </div>
                );
              })}

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-2 rounded-md bg-green-500 text-white text-sm font-medium"
                >
                  {loading ? "Loading..." : "Add"}
                </button>
                <button disabled={loading} type="button" onClick={handleModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleModal}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
