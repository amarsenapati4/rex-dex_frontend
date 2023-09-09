import React from 'react'
import Layout from '../components/Layout/Layout';
import { useAuth } from '../Context/auth';
import UserMenue from '../components/Layout/UserMenue';

const DashBoard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"Dashboard Ecommerce"}>
          
        <div className="container-fluid mt-[6rem] ml-10">
            <div className="row">
                <div className="col-md-3 flex">
                    <UserMenue/>
                </div>
                <div className="col-md-9 mt-2">
                <div className="card w-75 p-3">
                  <h3>User Name:{auth?.user?.name}</h3>
                  <h3>User Email:{auth?.user?.email}</h3>
                  <h3>User Address:{auth?.user?.address}</h3>
                </div>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default DashBoard