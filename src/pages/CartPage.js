/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("https://ecommerce-backend-us2n.onrender.com/cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
//get payment gateway token
const getToken = async () => {
  try {
    const { data } = await axios.get("https://ecommerce-backend-us2n.onrender.com/api/v1/product/braintree/token");
    setClientToken(data?.clientToken);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getToken();
}, [auth?.token]);

//handle payments
const handlePayment = async () => {
  try {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    // eslint-disable-next-line no-unused-vars
    const { data } = await axios.post("https://ecommerce-backend-us2n.onrender.com/api/v1/product/braintree/payment", {
      nonce,
      cart,
    });
    setLoading(false);
    localStorage.removeItem("https://ecommerce-backend-us2n.onrender.com/cart");
    setCart([]);
    navigate("https://ecommerce-backend-us2n.onrender.com/dashboard/user/orders");
    toast.success("Payment Completed Successfully ");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
  return (
    <Layout>
      <div className="container mt-[6rem]">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`https://ecommerce-backend-us2n.onrender.com/api/v1/product/product-photo/${p._id}`}
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
                  <h5 className="card-title">Number of product Available in Stock:{p.quantity}</h5>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4 >Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("https://ecommerce-backend-us2n.onrender.com/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("https://ecommerce-backend-us2n.onrender.com/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-info"
                    onClick={() =>
                      navigate("https://ecommerce-backend-us2n.onrender.com/login", {
                        state: "https://ecommerce-backend-us2n.onrender.com/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
           <div className="mt-2 mb-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;