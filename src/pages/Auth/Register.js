import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer,setAnswer]= useState("");
  const navigate = useNavigate();
  //form sumbit
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone,address,answer}
      );
      if (res && res.data.success) {
        navigate("/login");
        setTimeout(() => {
          toast.success(res.data.message);
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register Ecommerce app">
<div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center mt-[3rem]">
  <div className="container max-w-screen-lg mx-auto">
    <div>
      
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Sign Up Page</p>
            <p>Please fill out all the fields.</p>
          </div>
          <div className="lg:col-span-2">
            <form className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5" onSubmit={handelSubmit} >
              <div className="md:col-span-5">
                <label htmlFor="full_name">Full Name</label>
                <input  value={name}
                  onChange={(e) => setName(e.target.value)} type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Enter Your Name"
                  required />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input  value={email}
                  onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="Email" />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="password">Password</label>
                <input  value={password}
                  onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Password"
                  required/>
              </div>
              <div className="md:col-span-3">
              <label htmlFor="address">Address</label>
                <input  value={address}
                  onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="address"
                  required/>
              </div>
              <div className="md:col-span-2">
              <label htmlFor="Phone">Phone</label>
                <input   value={phone}
                  onChange={(e) => setPhone(e.target.value)} type="text" name="Phone" id="Phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   placeholder="Phone"
                  required/>
              </div>
            
              <div className="md:col-span-5">
              <label htmlFor="security">Security Question</label>
                <input value={answer}
                  onChange={(e) => setAnswer(e.target.value)} type="text" name="security" id="security" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="What is name of your pet?"
                  required/>
              </div>
              
            
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Register;
