import React,{useState} from "react";
import { MdOutlineDarkMode, MdOutlineHome } from "react-icons/md";
import { BsFillGridFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser, AiOutlineMail, AiOutlineBell } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { handleLogout } from "../../features/auth/loginSlice";
import { useDispatch, useSelector} from "react-redux";
function Navbar() {
  const {username,image,_id} = useSelector(store =>store.loggedUser.user)
  const [show,setShow] = useState(false);
  const dispatch = useDispatch();
  const handleLogoutAction = ()=>{
    dispatch(handleLogout())
  }
  return (
    <div className="navbar-container">
      <div className="navbar-inner-container">
        <h1>Memoria</h1>
        <div className="navbar-profile-section" onMouseEnter={()=>setShow(prev=>!prev)} onMouseLeave={()=>setShow(prev=>!prev)}>
          <img src={image} alt="user profile"/>
          <span className="navbar-username">{username}</span>
          {
          show && <div className="navbar-dropdown">
            <span>
             <Link to={`/profile/${_id}`} className="remove-underline">Profile</Link>
            </span>
            <span>Account</span>
            <span onClick={handleLogoutAction}>Logout</span>
          </div>
        }
        </div>
      </div>
        
    </div>
  );
}

export default Navbar;
