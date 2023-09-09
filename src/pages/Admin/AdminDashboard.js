import React from 'react'
import Layout from "../../components/Layout/Layout";
import AdminMenue from '../../components/Layout/AdminMenue';
import { useAuth } from '../../Context/auth';

const AdminDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid mt-[6rem] ml-10 ">
        <div className="row">
          <div className="col-md-3 flex">
<AdminMenue/>
          </div>
          <div className="col-md-9 mt-2">
            <div className="card w-75 p-3">
             <h1 className='text-[2rem]'>Admin Name:{auth?.user?.name}</h1>
             <h1 className='text-[2rem]'>Admin Email:{auth?.user?.email}</h1>
             <h1 className='text-[2rem]'>Admin phone:{auth?.user?.phone}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard