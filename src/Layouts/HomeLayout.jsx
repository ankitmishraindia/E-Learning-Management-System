import { AiFillCloseCircle } from "react-icons/ai";
import {FiMenu} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Footer from '../Components/Footer';
function HomeLayout({ children }){

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
 return(
    <>
      <div className="min-h-[90vh]" data-theme="dark">
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
            <ul className='menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative'>
              <li className='w-fit absolute right-2 z-50'>
                <button onClick={hideDrawer}>
                  <AiFillCloseCircle size={24}/>
                </button>
              </li>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/courses'>All courses</Link>
              </li>
              <li>
                <Link to='/contact'>Contact Us</Link>
              </li>
              <li>
                <Link to='/about'>About Us</Link>
              </li>
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