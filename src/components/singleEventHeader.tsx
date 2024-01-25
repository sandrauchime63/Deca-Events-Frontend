import { FaFlag } from "react-icons/fa6";
import Button from "./Button";
import Modal from "./modal";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import { userReportEvent } from "../axiosSettings/events/eventAxios";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  address: string;
  date: string;
  image: string;
}

function SingleEventHeader(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>("")

  const navigate = useNavigate()

  
  const event_id = localStorage.getItem("event_id")

  const reportModal = async () => {
    try {
      setShowModal(true);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleReportChange = async(e:any)=>{
    try{
      e.preventDefault()
      let target = e.target.value
      setReport({report: target})
    }catch(error:any){
      console.log(error)
    }
  }

  const navigateToPayment = async()=>{
    try{
    return navigate("/reg4event")
    }catch(error:any){
      console.log(error)
    }
  }

  const reportEvent = async(e:any)=>{
    try{
      // e.preventDefault()
      setLoading(true)
      console.log('hi')
      const response = await userReportEvent(event_id, report)
      if(report.length === 0){
        setLoading(false)
        return showErrorToast("Input required")
      }
      if(response.data.status !== "success"){
        setLoading(false)
        showErrorToast(response.data.message)
      }
      showSuccessToast(response.data.message)
      setReport("")
      setShowModal(false)
      return setLoading(false)
    }catch (error: any) {
      if (error.response) {
        // Server responded with a status code other than 2xx
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        return showErrorToast('Network Error. Please try again later.');
      } else {
        // Something happened in setting up the request
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }
  const buttons: any = [
    {
      label: `${loading ? "Loading..." : "Submit Report"}`,
      onClick: (e:any)=> reportEvent(e),
      bg: "#27AE60", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];

  const closeReportModal = ()=>{
    setLoading(false)
    return setShowModal(false)
  }
  return (
    <div
      className="w-full h-[595px] bg-neutral-900 bg-opacity-30 bg-cover bg-center rounded-[10px]"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="flex px-20 text-white justify-end py-5">
        <div>
          <a href="#" className="w-8 h-8" onClick={reportModal}>
            <FaFlag className="text-red-500 w-full h-full p-2 bg-white rounded-full" />
          </a>
        </div>
      </div>

      <div className="flex px-20 text-white justify-between pt-35">
        <div className="w-3/5 h-[307px] flex-col gap-[18px] inline-flex">
          <h1 className="text-white text-[64px] font-['Inter']">
            {props.title}
          </h1>
          <div className="text-white text-base font-Inter">
            {props.description}
          </div>
          <div className="relative">
            <div className="left-[29px] top-0 text-white text-lg font-normal font-['Inter']">
              {props.address}{" "}
            </div>
          </div>
        </div>
        {/* right div */}
        <div className="bg-white rounded-[10px] shadow p-10">
          <div className="text-black text-2xl font-normal font-Inter pb-4">
            Date & time
          </div>
          <div className="text-zinc-500 text-lg font-normal font-Inter pb-4">
            {props.date}
          </div>

          <div className="text-green-500 text-base font-normal font-Inter pb-4">
            Add to calendar
          </div>
          <div className="self-stretch gap-2.5 inline-flex pb-4">
            <Button
              title={"Book Now"}
              text={"white"}
              bg={"green"}
              type={"button"}
              onClick={navigateToPayment}
            />
          </div>
          <div className="text-center text-zinc-500 text-base font-normal font-['Inter']">
            No Refunds
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => closeReportModal()} buttons={buttons}>
          <div className="font-Inter h-[200px] w-[100%] text-center mb-[60px]">
            <p className="font-Inter bold">Please Type Your Report Below</p>
            <textarea
            placeholder="Not more than 20 words please"
              className="h-[100%] w-[100%] resize-none border border-gray-300 p-2"
              required
              onChange={(e)=> handleReportChange(e)}
            ></textarea>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SingleEventHeader;
