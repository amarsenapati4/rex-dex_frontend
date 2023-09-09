import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const Pagenotfound = () => {
  return (
    <Layout  title={"go back page not found"}>
    <div className='flex min-h-[65vh] flex-col justify-center items-center md:flex ju'>
      <h1 className='text-[100px] font-[700]'>404</h1>
      <h2 className='font-normal'>oops! page not found</h2>
      <Link to='/' className='text-black border-2 border-black p-[10px] mt-[10px]'>Go Back
      </Link>
    </div>
    </Layout>
  )
}

export default Pagenotfound;
