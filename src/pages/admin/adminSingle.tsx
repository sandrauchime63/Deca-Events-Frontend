import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  FaArrowLeft,
  FaEnvelope,
  FaFacebookF,
  FaTelegram,
  FaThumbsDown,
  FaThumbsUp,
  FaTrash,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { TbLockOff } from "react-icons/tb";
import Button from "../../components/Button";
import "../../pages/table.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getSingeEvent,
  addEventComments,
  getEventComments,
  userDeleteEvent,
  userLikesAnEvent,
  userDislikesAnEvent,
  adminBlocksEvent,
  adminUnblocksEvent,
  getEventReport,
} from "../../axiosSettings/events/eventAxios";
import { showErrorToast, showSuccessToast } from "../../utility/toast";
import Modal from "../../components/modal";
import { SlDislike, SlLike } from "react-icons/sl";
import Adminsidebar from "../../components/adminSideBar";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
  WhatsappShareButton
} from "react-share";

function SingleAdmin() {
  const user: any = localStorage.getItem("user");
  const mainUser: any = JSON.parse(user);
  const event_id: any = localStorage.getItem("event_id");
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState<any>({});
  const [comments, setComments] = useState<any>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [blockLoading, setBlockLoading] = useState(false);
  const [unblockLoading, setUnblockLoading] = useState(false);
  const [getReports, setGetReports] = useState<any>([]);

  const [reportModal, setReportModal] = useState(false);
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  function formatDateTime(dateString: any) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  }
  const locate = localStorage.getItem("location");
  const fetchData = async () => {
    try {
      const response = await getSingeEvent(event_id);
      setEvent(response.data);
      return response.data.data;
    } catch (error: any) {
      console.log(error);
    }
  };

  const addComments = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const body = {
        comments: newComment,
      };
      const response = await addEventComments(event_id, body);
      if (response.status !== "success") {
        setLoading(false);
        return showErrorToast(response.message);
      }
      showSuccessToast(response.message);
      fetchEventComments();
      fetchData();
      setNewComment("");
      localStorage.setItem("event", JSON.stringify(response.data));
      return setLoading(false);
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };

  const fetchEventComments = async () => {
    try {
      const response = await getEventComments(event_id);
      setComments(response.mainComments);
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };

  const fetchEventReports = async () => {
    try {
      const reports = await getEventReport(event_id);
      if (reports.status !== 200) {
        return null;
      }
      console.log(reports);
      setGetReports(reports.data.reports);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchEventReports();
    fetchData();
    fetchEventComments();
  }, []);

  const handleCommentChange = async (e: any) => {
    try {
      e.preventDefault();
      let target = e.target.value;
      setNewComment(target);
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteEventFunction = async () => {
    try {
      setDeleteLoading(true);
      const response = await userDeleteEvent(event_id);
      console.log(response);
      if (response.status !== 200) {
        setDeleteLoading(false);
        showErrorToast(response.data.message);
        return setShowDeleteModal(false);
      }
      showSuccessToast(response.data.message);
      setDeleteLoading(false);
      navigate("/hostedevent");
      return setShowDeleteModal(false);
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };

  const handleClose = async () => {
    setDeleteLoading(false);
    return setShowDeleteModal(false);
  };

  const buttons: any = [
    {
      label: `${deleteLoading ? "Loading..." : "Confirm"}`,
      onClick: () => deleteEventFunction(),
      bg: "#27AE60", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];

  const userLikesEvent = async () => {
    try {
      const response = await userLikesAnEvent(event_id);
      if (response.status !== 200) {
        return showErrorToast(response.data.message);
      }

      showSuccessToast(response.data.message);
      return fetchData();
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };
  const userDislikesEvent = async () => {
    try {
      const response = await userDislikesAnEvent(event_id);
      if (response.status !== 200) {
        return showErrorToast(response.data.message);
      }

      showSuccessToast(response.data.message);
      return fetchData();
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };

  const blockEvent = async () => {
    try {
      setBlockLoading(true);
      const response = await adminBlocksEvent(event_id);
      if (response.status !== 200) {
        setBlockLoading(false);
        return showErrorToast(response.data.message);
      }
      setBlockLoading(false);
      fetchData();
      fetchEventComments();
      return showSuccessToast(response.data.message);
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };
  const unblockEvent = async () => {
    try {
      setUnblockLoading(true);
      const response = await adminUnblocksEvent(event_id);
      if (response.status !== 200) {
        setUnblockLoading(false);
        return showErrorToast(response.data.message);
      }
      setUnblockLoading(false);
      fetchData();
      fetchEventComments();
      return showSuccessToast(response.data.message);
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast("Network Error. Please try again later.");
      } else {
        return showErrorToast("Error occurred. Please try again.");
      }
    }
  };

  const viewReport = async () => {
    try {
      return setReportModal(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const url = window.location.href;

  return (
    <div className="w-screen pb-5">
      <div className="fixed">
        <Adminsidebar />
      </div>
      <div className="pl-24">
        <div>
          <Navbar
            name={mainUser.first_name}
            image={
              mainUser.profile_picture?.length === 0
                ? "/images/event1.png"
                : mainUser.profile_picture
            }
          />
        </div>
        <div className="ml-16 mr-16 mt-2">
          <div className="pl-8 my-2">
            <a
              href={`http://localhost:5173${locate}`}
              className="no-underline text-black"
            >
              <div className="flex">
                <FaArrowLeft className="text-black" />{" "}
                <p className="pl-2">Back</p>
              </div>
            </a>
          </div>
          <div
            className="w-full h-[595px] bg-neutral-900 bg-opacity-30 bg-cover bg-center rounded-[10px]"
            style={{
              backgroundImage: `url(${event.event_image})`,
            }}
          >
            <div className="flex px-20 text-white justify-end py-5">
              <div>
                <a
                  href="#"
                  className="w-8 h-8"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <FaTrash className="text-red-500 w-full h-full p-2 bg-white rounded-full" />
                </a>
              </div>
            </div>

            <div className="flex px-20 text-white justify-between pt-35">
              <div className="w-3/5 h-[307px] flex-col gap-[18px] inline-flex">
                <h1 className="text-white text-[64px] font-['Inter']">
                  {event.title}
                </h1>
                <div className="text-white text-base font-Inter">
                  {event.description}
                </div>
                <div className="relative">
                  <div className="left-[29px] top-0 text-white text-lg font-normal font-['Inter']"></div>
                </div>
              </div>
              {/* right div */}
              <div className="bg-white rounded-[10px] shadow p-10">
                <div className="text-black text-2xl font-normal font-Inter pb-4">
                  Date & time
                </div>
                <div className="text-zinc-500 text-lg font-normal font-Inter pb-4">
                  {`${formatDate(event.event_date)} ${event.event_time}`}
                </div>

                {/* <div className="text-green-500 text-base font-normal font-Inter pb-4">
                  Add to calendar
                </div>
                <div className="self-stretch gap-2.5 inline-flex pb-4">
                  <Button
                    title={"Book Now"}
                    text={"white"}
                    bg={"green"}
                    type={"button"}
                  />
                </div> */}
                {/* <div className="text-center text-zinc-500 text-base font-normal font-['Inter']">
                  No Refunds
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-5">
            <div className="w-6/12">
              <p className="font-medium">Description</p>
              <p className="font-Inter">{event.description}</p>
            </div>
            <div className="w-5/12">
              <div className="flex justify-between w-[70%]">
                <div className="">
                  <p className="pt-3 font-medium">Time</p>
                  <p className="font-Inter">
                    {/* Weekdays hours:{" "} */}
                    <span className="text-green-500">{event.event_time}</span>
                    <br />
                    {/* Weekends hours: <span className="text-green-500">7PM- 8PM</span> */}
                  </p>
                </div>
                <div>
                  <p className="pt-3 font-medium">Event Status</p>
                  <p className="font-Inter">
                    {/* Weekdays hours:{" "} */}
                    {event.isBlocked ? (
                      mainUser.role === "Admin" ? (
                        <span className="text-red-500">Blocked</span>
                      ) : (
                        <span className="text-red-500">
                          Blocked, Please{" "}
                          <a
                            className="text-red-500"
                            href="mailto:admin@example.com?subject=Blocked&body=Please%20Contact%20Admin"
                          >
                            Contact Admin
                          </a>
                        </span>
                      )
                    ) : (
                      <span className="text-green-500">Active</span>
                    )}
                    <br />
                  </p>
                </div>
              </div>
              <div className="w-[300px] h-[100px] gap-[10px] mt-2 flex justify-between">
                <button onClick={userLikesEvent}>
                  <span className="hover:text-green-800 text-green-500">
                    <SlLike className="w-[100px] h-[50px]" />
                    <span>
                      {event.likesArr?.length === 1 ? (
                        <p>{event.likes} like</p>
                      ) : (
                        <p>{event.likes} likes</p>
                      )}
                    </span>
                  </span>
                </button>
                <button onClick={userDislikesEvent}>
                  <span className="hover:text-red-800 text-red-500">
                    <SlDislike className="w-[100px] h-[50px]" />
                    <span>
                      {event.dislikesArr?.length === 1 ? (
                        <p>{event.dislikes} dislike</p>
                      ) : (
                        <p>{event.dislikes} dislikes</p>
                      )}
                    </span>
                  </span>
                </button>

                {event.isBlocked ? (
                  <Button
                    title={unblockLoading ? "Loading..." : "Unblock Event"}
                    text={"white"}
                    bg={"green"}
                    type={"submit"}
                    onClick={unblockEvent}
                  />
                ) : (
                  <Button
                    title={blockLoading ? "Loading..." : "Block Event"}
                    text={"white"}
                    bg={"red"}
                    type={"submit"}
                    onClick={blockEvent}
                  />
                )}
                <Button
                  title={"View Report"}
                  text={"white"}
                  bg={"green"}
                  type={"submit"}
                  onClick={viewReport}
                />
              </div>
              <p className="text-black font-medium pt-3">Share with friends</p>
              <div>
                <div className="w-32 h-8 md:w-96 flex gap-3">
                  <FacebookShareButton
                    url={url}
                    style={{ width: "2rem", height: "2rem" }}
                  >
                    <FaFacebookF className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={url}
                    style={{ width: "2rem", height: "2rem" }}
                  >
                    <FaWhatsapp className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </WhatsappShareButton>
                  <TelegramShareButton
                    url={url}
                    style={{ width: "2rem", height: "2rem" }}
                  >
                    <FaTelegram className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </TelegramShareButton>
                  <TwitterShareButton
                    url={url}
                    style={{ width: "2rem", height: "2rem" }}
                  >
                    <FaTwitter className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </TwitterShareButton>
                  <EmailShareButton
                    url={url}
                    style={{ width: "2rem", height: "2rem" }}
                  >
                    <FaEnvelope className="text-white w-full h-full p-2 bg-green-500 rounded-full" />
                  </EmailShareButton>
                </div>
              </div>
            </div>
          </div>
          {/* comment section */}
          <div className="text-gray-900 text-base font-medium leading-snug tracking-tight py-4">
            Comments
          </div>
          <div className="p-5 w-full bg-white rounded-lg shadow border border-gray-300 flex-col">
            <div className="flex">
              <img
                src={
                  mainUser.profile_picture?.length === 0
                    ? "/images/event1.png"
                    : mainUser.profile_picture
                }
                alt="profile_pic"
                className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
              />
              <h3 className="text-black text-lg pl-2 font-semibold">
                {mainUser.user_name}
              </h3>
            </div>
            <hr />
            <div className="w-full">
              <form
                className="flex justify-between w-full"
                onSubmit={(e: any) => addComments(e)}
              >
                <div className="w-4/5">
                  <input
                    type="text"
                    className="h-12 w-full border border-gray-500 px-2 font-Inter"
                    required
                    value={newComment}
                    onChange={(e) => handleCommentChange(e)}
                  />
                </div>
                <div className="pl-2 w-1/5">
                  <Button
                    title={loading ? "Loading..." : "Comment"}
                    text={"white"}
                    bg={"green"}
                    type={"submit"}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="py-3 bg-gray-100 p-[20px] h-[300px] overflow-y-scroll">
            {comments &&
              comments.map((comment: any, index: any) => (
                <div key={index}>
                  <div className="flex">
                    <img
                      src={comment.picture}
                      alt="profile_pic"
                      className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
                    />
                    <h3 className="text-black text-lg pl-2 font-semibold">
                      {comment.name}
                    </h3>
                  </div>
                  <p className="font-Inter">{comment.comment}</p>
                  <div className="flex justify-start font-Inter">
                    <a href="#" className="w-8 h-8">
                      <FaThumbsUp className="" />
                    </a>
                    <a href="#" className="w-8 h-8">
                      <FaThumbsDown className="" />
                    </a>
                    <p>{formatDateTime(comment.comment_time)}</p>
                  </div>
                </div>
              ))}
            {!comments && <p>No comments yet.</p>}
          </div>
          <br />
          <div className="w-full bg-gray-100 overflow-y-scroll p-[20px]">
            <div className="text-gray-900 text-base text-center font-medium leading-snug tracking-tight py-4">
              Purchased Tickets
            </div>
            <table className="w-full overflow-y-scroll text-gray-500 font-Inter text-xs">
              <thead className="w-full">
                <td className="w-1/4">NAME</td>
                <td className="w-1/4">EMAIL</td>
                <td className="w-1/4">DATE PURCHASED</td>
                <td className="w-1/4">TOTAL TICKETS</td>
                <td className="w-1/4">TOTAL AMOUNT</td>
              </thead>
              <br />
              {event.registered_users?.length > 0 ? (
                event.registered_users.map((user: any, index: any) => (
                  <tbody key={index}>
                    <tr className="table-style">
                      <td className="flex">
                        <img
                          src={user.image_of_user}
                          alt="profile_pic"
                          className="w-7 h-7 relative rounded-[200px] border-2 border-gray-300"
                        />{" "}
                        <span className="pl-3">{user.name_of_user}</span>{" "}
                      </td>
                      <td>{user.email_of_user}</td>
                      <td>{formatDateTime(user.date_purchased)}</td>
                      <td>{user.no_of_tickets}</td>
                      <td>{user.total_amount_paid}</td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <p>No Registered Users Yet</p>
              )}
            </table>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal onClose={() => handleClose()} buttons={buttons}>
          <p className="font-Inter text-center">
            <span className="text-red-500">
              Are you sure you want to delete this event?
            </span>
          </p>
        </Modal>
      )}
      {reportModal && (
        <Modal onClose={() => setReportModal(false)}>
          <div className="text-center w-[90%] h-[500px] mt-[20px] mb-[20px] overflow-y-scroll">
            <h1 className="text-[#27AE60]">EVENT REPORTS</h1>
            <hr />
            <div className="text-left bg-gray-100 w-[100%]">
              {getReports ? (
                getReports?.map((repo: any, index: any) => (
                  <>
                    <div
                      key={index}
                      className="border p-[10px] h-[200px] overflow-y-scroll"
                    >
                      <p>
                        <span className="text-[#27AE60]">
                          Name of Reporter:
                        </span>{" "}
                        {repo.owner_name}
                      </p>
                      <p>
                        <span className="text-[#27AE60]">Report:</span>{" "}
                        {repo.report}
                      </p>
                    </div>
                    <br />
                  </>
                ))
              ) : (
                <p>No Reports</p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SingleAdmin;
