import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Cards";
import Events from "../components/events";
import { useEffect, useState } from "react";
import { upComingEvents } from "../axiosSettings/events/eventAxios";
import { showErrorToast } from "../utility/toast";
import Adminsidebar from "../components/adminSideBar";

export const UpcomingEvents = () => {
  const user: any = localStorage.getItem("user");
  const newUser = JSON.parse(user);

  const [filters, setFilters] = useState<any>({
    eventType: "",
    location: "",
    date: "",
  });
  const [getEvents, setGetEvents] = useState<any>([]);

  const handleDate = async (e: any) => {
    try {
      e.preventDefault();
      const date = e.target.value;
      const newDate = new Date(date);
      const finalDate = newDate.toISOString();
      setFilters({ ...filters, date: finalDate });
      console.log(finalDate);
    } catch (error: any) {
      console.log(error);
    }
  };

  const params = {
    eventType: filters.eventType,
    location: filters.location,
    date: filters.date,
  };
  const fetchData = async () => {
    try {
      const response = await upComingEvents(params);
      console.log(response.data);
      if (response.data.length !== 0) {
        return setGetEvents(response.data);
      } else {
        return showErrorToast("No upcoming Events found");
      }
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

  useEffect(() => {
    fetchData();
  }, [filters]);
  return (
    <>
      <div className="fixed left-0">
      {newUser.role === "Admin" ? <Adminsidebar /> : <Sidebar />}
      </div>

      <div className="pl-20">
        <Navbar
          name={newUser.first_name}
          image={
            newUser.profile_picture.length === 0
              ? "/images/event1.png"
              : newUser.profile_picture
          }
        />
      </div>

      <div className="pl-[160px] w-[1180px] mt-12 h-10 justify-between items-center inline-flex">
        <div className="flex-col justify-start items-start gap-5 inline-flex">
          <div className="text-green-500 text-2xl font-semibold font-['Inter']">
            Upcoming Events
          </div>
          <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 ">
          <Events
            placeholder={"Any category"}
            text={"text-grey-500 text-xs"}
            h={""}
            onChange={(eventType) => setFilters({ ...filters, eventType })}
          />
          <input
            title={"Location"}
            placeholder={"Enter Location"}
            type={"text"}
            onChange={(location) => setFilters({ ...filters, location })}
            className="self-stretch h-[46px] focus:outline-none p-2.5 bg-gray-50 font-Inter rounded-[5px] border-b-2 border-green-500 items-center gap-2.5 w-full md:w-48"
          />
          <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
            <input
              type="date"
              name=""
              id=""
              className="text-slate-500 text-xs font-normal font-Inter bg-gray-50"
              onChange={handleDate}
            />
          </div>
        </div>
      </div>
      {getEvents.length ? (
        <div className="flex-wrap mt-6 ml-40 gap-3 flex">
          {getEvents.map((event: any) => (
            <div key={event.dataValues.id}>
              <Card
                image={event.dataValues.event_image}
                date={event.event_date}
                ticketsNo={event.dataValues.tickets_bought}
                title={event.dataValues.title}
                description={event.dataValues.description}
                id={event.dataValues.id}
                event_details={event.dataValues}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="ml-[11%] mt-[2%]">No Upcoming Events</p>
      )}
    </>
  );
};
