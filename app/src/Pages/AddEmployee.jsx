import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [experience, setExperience] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const newEmployee = {
      name,
      email,
      department,
      jobTitle,
      experience: String(experience),
      password,
      phoneNumber,
      image,
    }

    axios
      .post('/api/employee', newEmployee)
      .then((response) => {
        console.log('Employee added:', response.data)
        navigate('/employeesList')
      })
      .catch((error) => {
        console.error('Error adding employee:', error)
      })

    setName('')
    setEmail('')
    setDepartment('')
    setJobTitle('')
    setExperience('')
    setPassword('')
    setPhoneNumber('')
    setImage('')
  }

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
      <h2  className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">Add Employee</h2>
      </div>
      <div className="p-6 mt-10 rounded-md shadow-2xl bg-slate-100 sm:mx-auto sm:w-full sm:max-w-sm w-96">
      <form onSubmit={handleSubmit} className="space-y-6" >
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-800">Name:</label>
          <div className="mt-2">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100"          />
          </div>
        </div>
        <div>
          <label htmlFor="email"className="block text-sm font-medium leading-6 text-gray-800">Email:</label>
          <div className="mt-2">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100"
          />
          </div>
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-800">Department:</label>
          <div className="mt-2">
          <input
            type="text"
            id="department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100"
          />
          </div>
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium leading-6 text-gray-800">Job Title:</label>
          <div className="mt-2">
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100"
          />
           </div>
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-800">Experience:</label>
          <div className="mt-2">
          <input
            type="text"
            id="experience"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100"
          />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-800">Password:</label>
          <div className="mt-2">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100"
          />
          </div>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-800">Phone Number:</label>
          <div className="mt-2">
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100"
          />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-800">Image:</label>
          <div className="mt-2">
          <input
            type="text"
            id="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100"
          />
          </div>
        </div>
        <button type="submit"  className="flex w-full justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900">Add</button>
      </form>
    </div>
    </div>
  )
}

export default AddEmployee
