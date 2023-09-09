import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenue";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";
import UserMenue from "../../components/Layout/UserMenue";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid mt-[6rem] flex md:flex-row flex-col">
        <div className="col-md-3 flex flex-row">
          <UserMenue />
        </div>
        <div className="col-md-9 mt-4 md:mt-0">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
               <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    #
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Buyer
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Payment
                </th>
                <th scope="col" class="px-6 py-3">
                    Transaction_id
                </th>
                <th scope="col" class="px-6 py-3">
                    Quantity
                </th>

            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i+1}
                </th>
                <td class="px-6 py-4">
                {o?.status}
            </td>
                <td class="px-6 py-4">
{o?.buyer?.name}               
 </td>
                <td class="px-6 py-4">
 {moment(o?.createAt).fromNow()}
                </td>
                <td class="px-6 py-4">
       {o?.payment.success ? "Success" : "Failed"}
                </td>
                <td class="px-6 py-4">
       {o?.payment.transaction.id}
                </td>
                <td class="px-6 py-4">
      {o?.products?.length}
                </td>


            </tr>
        </tbody>
    </table>
</div>

                <div className="container mx-auto ">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id} >
                      <div className="col-md-4 ">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;