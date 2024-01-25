import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getEarningsHist } from "../axiosSettings/user/userAxios";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../components/adminSideBar";

const EarningHistory = () => {
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false)

  const [getEarnings, setGetEarnings] = useState<any>([])
  const navigate = useNavigate();
  function formatDateTime(dateString: any) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}-${formattedMonth}-${year}; ${formattedHours}:${formattedMinutes}`;
}


  const fetchEarnings = async()=>{
    try{
      const response = await getEarningsHist()
      setGetEarnings(response.data.getAllEarnings)
    }catch(error:any){
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchEarnings()
  }, [])

  const handleEventRedirect = async()=>{
    try{
          if (mainUser.is_completed_profile === false) {
        return setShowModal(true);
      }
      if (mainUser.profile_picture.length === 0) {
        return setShowModal2(true);
      }
      if (mainUser.isBlocked) {
        return setShowModal3(true);
      }
      if(!mainUser.isAddAccount){
        return setShowModal4(true)
      }
    }catch(error:any){
      console.log(error.message)
    }
  }
  const buttons: any = [
    {
      label: "click here to complete profile",
      onClick: () => navigate("/profile"),
      bg: "#27AE60", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];
  const buttons2: any = [
    {
      label: "click here to update profile picture",
      onClick: () => navigate("/profile"),
      bg: "#27AE60", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];
  const buttons3: any = [
    {
      label: "click here to update bank account details",
      onClick: () => navigate("/user_account"),
      bg: "#27AE60", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];
  return (
    <>
      <div className="fixed left-0 z-30">
      {mainUser.role === "Admin" ? <Adminsidebar /> : <Sidebar />}
      </div>
      <div className="pl-20 fixed top-0 w-full z-10">
          <Navbar
            name={mainUser.first_name}
            image={
              mainUser.profile_picture.length === 0
                ? "/images/event1.png"
                : mainUser.profile_picture
            }
          />
        </div>
      <div className="w-full sm:w-[80%] h-auto sm:h-[678px] flex-col md:px-32 justify-start items-start gap-4 inline-flex mt-32">
        <div className="w-[1180px] justify-between items-center inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-green-500 text-2xl font-semibold font-['Inter']">
              Earning History
            </div>
            <div className="w-[200px] h-[0px] border-2 border-green-500"></div>
          </div>
        </div>
        <table className="w-[1050px]" id="tickets">
          <tr className="h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-[30px] text-gray-500 text-xs font-medium font-Inter tracking-tight">
            <th>ORDER NUMBER</th>
            <th>EVENT NAME</th>
            <th>EVENT CATEGORY</th>
            <th>ORDER DATE</th>
            <th>TICKET TYPE</th>
            <th>TICKET QUANTITY</th>
            <th>TICKET UNIT COST</th>
            <th>TOTAL COST</th>
            <th>AMOUNT EARNED</th>
          </tr>
          {getEarnings ? (getEarnings.map((earn:any, index:any)=>(
          <tr key={index} className="h-11 px-5 py-3 justify-start items-start gap-2.5 text-gray-800 text-sm font-medium font-Inter leading-tight tracking-tight">
            <td>{earn.order_number}</td>
            <td>{earn.event_name}</td>
            <td>{earn.event_category}</td>
            <td>{formatDateTime(earn.createdAt)}</td>
            <td>{earn.ticket_type}</td>
            <td>{earn.ticket_quantity}</td>
            <td>{earn.ticket_cost}</td>
            <td>{earn.total_amount}</td>
            <td>{earn.amount_earned}</td>
          </tr>
          ))):(<div><p>No Earnings Yet. Want to earn some money? click <a href="#" onClick={handleEventRedirect}>here</a> to create an event</p></div>)}
        </table>
        {showModal && (
        <Modal onClose={() => setShowModal(false)} buttons={buttons}>
          <p className="text-center">
            Only Users with completed profiles can create events. Please update your details, avatar and bank account details
          </p>
        </Modal>
      )}
      {showModal2 && (
        <Modal onClose={() => setShowModal2(false)} buttons={buttons2}>
          <p className="text-center">
            Please update your avatar before you can create events
          </p>
        </Modal>
      )}
       {showModal3 && (
        <Modal onClose={() => setShowModal3(false)}>
          <p className="font-Inter text-center">
          <span className="text-red-500">Your Account has been blocked, Please <a className="text-red-500" href="mailto:admin@example.com?subject=Blocked&body=Please%20Contact%20Admin">Click Here To Contact Admin</a></span>
              </p>
        </Modal>
      )}
      {showModal4 &&(
         <Modal onClose={() => setShowModal4(false)} buttons={buttons3}>
         <p className="text-center">
           Please update your bank account details before you can create events. This is to enable you receive payments for event tickets
         </p>
       </Modal>
      )}
      </div>
    </>
  );
};

export default EarningHistory;