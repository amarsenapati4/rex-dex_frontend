import React, { useState } from 'react'
import { NavLink ,Link} from 'react-router-dom'
import logo from './REXdex copy.png'
import { FaShoppingCart } from "react-icons/fa";
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../../Context/auth';
import toast from "react-hot-toast";
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from "../../Context/cart";
import { Badge } from "antd";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("Logout Successful");
    }, "1000");
  }
  let Links = [
    { name: "HOME", link: "/" },
    { name: "Category", link: "/category" },
    { name: "Register", link: "/register" },
    { name: "Login", link: "/login" },
  ];
  let [open, setOpen] = useState(false);

 

  return (
    <div className='shadow-2xl z-50 w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-teal-400  md:px-10 px-6'>
        <img src={logo} alt={"logo"} className='pl-8 py-4 h-[5rem]' />
        {/* Menu icon */}
        <div onClick={() => setOpen(!open)} className='absolute right-12 top-6 cursor-pointer md:hidden w-7 h-7'>
          {
            open ? <XMarkIcon /> : <Bars3BottomRightIcon />
          }
        </div>
        {/* linke items */}

        <ul className={` md:flex  md:items-center md:pb-0 pb-12 absolute md:static bg-teal-400 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-13' : 'top-[-490px]'}`}>
          <NavLink to="/" className='md:ml-8 md:my-0 font-bold flex '>Home</NavLink>
          <li className="dropdown md:pt-2 md:p-2 ">
                <Link
                  className=" dropdown-toggle text-black"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link text-black">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link text-black">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle text-black pl-0"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <div className='mr-6'>
               <Badge count={cart?.length} showZero>
          <NavLink to="/cart" className=' md:my-0 flex mr-2 pr-0'><FaShoppingCart /></NavLink>
          </Badge>
          </div>
          <div className='w-full flex justify-start'>
            <SearchInput className="mr-4" />
          </div>

        </ul>
        {/* button */}
      </div>
    </div>
  );
};
export default Header;