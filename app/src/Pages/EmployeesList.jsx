import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    axios
      .get("/api/employee") // Replace '/api/employees' with your actual API endpoint
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });

    {
      /* axios
      .get("/api/departments")
      .then((response) => {
        const departmentNames = response.data.map(
          (employee) => employee.department
        );
        setDepartments(departmentNames);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  */
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleDelete = (employeeId) => {
    axios
      .delete(`/api/employee/${employeeId}`)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== employeeId)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name &&
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterValue === "" || employee.department === filterValue)
    );
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "department") {
      return a.department.localeCompare(b.department);
    } else if (sortOption === "experience") {
      return new Date(a.experience) - new Date(b.experience);
    } else if (sortOption === "jobTitle") {
      return a.jobTitle.localeCompare(b.jobTitle);
    } else if (sortOption === "email") {
      return a.email.localeCompare(b.email);
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="relative overflow-x-auto ">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-100">
          <div>
            <label
              htmlFor="sort"
              className="inline-flex items-center text-gray-500 "
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-100 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-400 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <option value="">None</option>
              <option value="name">Name</option>
              <option value="department">Department</option>
              <option value="experience">Experience</option>
              <option value="jobTitle">Job Title</option>
              <option value="email">Email</option>
            </select>
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-200 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th>Name</th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Department
            </th>
            <th scope="col" className="px-6 py-3">
              Job Title
            </th>
            <th scope="col" className="px-6 py-3">
              Experience
            </th>
            <th scope="col" className="px-6 py-3">
              phoneNumber
            </th>
            {/* <th scope="col" className="px-6 py-3">Status</th> */}

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr
              key={employee._id}
              className="bg-white border-b dark:bg-gray-100 dark:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-400"
            >
              <td>
                <img
                  className="w-10 h-10 rounded-full"
                  src={"./src/assets/Mon Photo.jpeg"}
                  alt="Jese image"
                />
              </td>
              <td
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-500"
              >
                {employee.name}
              </td>

              <td>
                <div className="pl-3">
                  <div className="font-normal text-gray-500">
                    {employee.email}
                  </div>
                </div>
              </td>
              <td>{employee.department}</td>
              <td className="px-6 py-4">{employee.jobTitle}</td>
              <td className="px-6 py-4">{employee.experience}</td>
              <td className="px-6 py-4">{employee.phoneNumber}</td>
              {/* <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> present
                    </div>
                </td> */}

              <td className="px-6 py-4">
                {" "}
                <Link to="/addEmployee" className="add">
                  <img src={"./src/assets/add.png"} width="20" height="20" />
                </Link>
                <Link to={`/editEmployee/${employee._id}`}>
                  {" "}
                  <img src={"./src/assets/update.png"} width="20" height="20" />
                </Link>
                <Link
                  className="delete"
                  onClick={() => handleDelete(employee._id)}
                >
                  <img src={"./src/assets/delete.png"} width="20" height="20" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default EmployeesList;
