import React from "react";
import "./SideBar.css";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
const SideBar = ({sideBar,handleToggleBar}) => {
  return (
    <div className={` d-flex-column align-items-center ${sideBar?'sideBar open':'sideBar' }` } style={{width:"15vw",paddingTop:"1rem",height:"90vh"}}
    onClick={()=>handleToggleBar(false)}>
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      <li>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
      <li>
        <MdThumbUp size={23} />
        <span>Liked videos</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Books</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>Don't know</span>
      </li>
      <hr />
      <li>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />

    </div>
  );
};

export default SideBar;
