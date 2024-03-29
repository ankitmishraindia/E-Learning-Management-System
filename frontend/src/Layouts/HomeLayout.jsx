import { AiFillCloseCircle } from "react-icons/ai";
import {FiMenu} from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';
import { logout } from "../Redux/Slices/AuthSlice";
function HomeLayout({ children }){

  const dispatch=useDispatch();
  const navigate=useNavigate();

  //for checking if user is loggedin
  const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn);

  //for displaying the options according to role
  const role=useSelector((state)=>state?.auth?.role)

  function changewidth(){
    const drawerSide=document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width='auto';
  }

  function hideDrawer(){
    const element=document.getElementsByClassName('drawer-toggle')
    element[0].checked=false;
  
    const drawerSide=document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width=0;  
  }

 async function handleLogout(e){
    e.preventDefault()

    const res=await dispatch(logout());
    console.log(res)
    if(res?.payload?.success)
    navigate('/')
  }
 return(
    <>
      <div className="min-h-screen" data-theme="dark">
         {/* Adding of daisyui drawer */}
        <div className="drawer w-fit absolute left-0 z-50">
          <input type="checkbox" id="my-drawer" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="cursor-pointer relative">
              <FiMenu
              onClick={changewidth}
              size={"32px"}
              className="font-bold m-4 text-white"/>
            </label>
          </div>
          <div className="drawer-side w-0">
            <label htmlFor="my-drawer" className='drawer-overlay'></label>
            <ul className='menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative h-full'>
              <li className='w-fit absolute right-2 z-50'>
                <button onClick={hideDrawer}>
                  <AiFillCloseCircle size={24}/>
                </button>
              </li>
              <li>
                <Link to='/'>Home</Link>
              </li>
              
              {isLoggedIn&&role==='ADMIN'&&
              <li>
                <Link to='/admin/dashboard'>Admin Dashboard</Link>
                </li>}
                
              <li>
                <Link to='/courses'>All courses</Link>
              </li>
              <li>
                <Link to='/contact'>Contact Us</Link>
              </li>
              <li>
                <Link to='/about'>About Us</Link>
              </li>

              {!isLoggedIn&&(
              <li className="absolute bottom-4 w-[90%]">
              <div className="w-full flex items-center justify-center">
                  <button className='btn btn-primary w-1/2 text-white'>
                      <Link to="/login">Login</Link>
                  </button>
                  <button className='btn btn-secondary w-1/2 text-white'>
                      <Link to="/signup">Signup</Link>
                  </button>
              </div>
              </li>
              )}
              {isLoggedIn&&(
              <li className="absolute bottom-4 w-[90%]">
              <div className="w-full flex items-center justify-center">
                  <button className='btn btn-primary w-1/2 text-white'>
                      <Link to="/user/profile">Profile</Link>
                  </button>
                  <button onClick={handleLogout} className='btn btn-secondary w-1/2 text-white'>
                      Logout
                  </button>
              </div>
              </li>
              )}
            </ul>
          </div>

        </div>
        
        {children}

        <Footer/>

      </div>
    </>
 )
}

export default HomeLayout;

