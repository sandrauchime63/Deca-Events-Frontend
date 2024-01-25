import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Card from '../components/Cards';
import Events from "../components/events";
import { showErrorToast } from "../utility/toast";
import { getAttendedevents, getHostedevents } from "../axiosSettings/events/eventAxios";
import { useEffect, useState } from "react";
import Adminsidebar from "../components/adminSideBar";

export const HostedEventPage = () => {
    const user:any = localStorage.getItem("user")
    const newUser = JSON.parse(user)
    const [getEvents, setGetEvents] = useState([])
    const [attendedEvents, setAttendedEvents] = useState([])

    const getHostedEvents = async() => {
        try{
            const response = await getHostedevents()
            setGetEvents(response.data.getMyEvents)
        }catch (error: any) {
            if (error.response) {
              return showErrorToast(error.response.data.message);
            } else if (error.request) {
              return showErrorToast('Network Error. Please try again later.');
            } else {
              return showErrorToast('Error occurred. Please try again.');
            }
          }
    }

    const getAttendedEvents = async() => {
        try{
            const response = await getAttendedevents()
            setAttendedEvents(response.data.userEvents)
            console.log(response.data)
        }catch (error: any) {
            if (error.response) {
              return showErrorToast(error.response.data.message);
            } else if (error.request) {
              return showErrorToast('Network Error. Please try again later.');
            } else {
              return showErrorToast('Error occurred. Please try again.');
            }
          }
    }

    useEffect(()=>{
        getHostedEvents()
        getAttendedEvents()
    }, [])

    function formatDate(dateString:any) {
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
    return (
        <>
        <div className="fixed left-0">
        {newUser.role === "Admin" ? <Adminsidebar /> : <Sidebar />}
        </div>
        <div className="pl-20 pb-10">
        <Navbar name={newUser.first_name} image={newUser.profile_picture.length === 0 ? "/images/event1.png" : newUser.profile_picture} />
        </div>
        <div className="flex justify-center">
            <div className="w-[80%]">
                <Tabs className="flex flex-col">
                    <div className="flex justify-between">
                        <TabList>
                            <Tab>Hosted Events</Tab>
                            <Tab>Attended Events</Tab>
                        </TabList>
                        <div className="h-10 flex flex-col md:flex-row gap-5 ">
                            <Events
                                    placeholder={"Any category"}
                                    text={"text-grey-500 text-xs"}
                                    h={""} 
                                    onChange={function (selectedEvent: any): void {
                                        throw new Error("Function not implemented.");
                                    } }                            />
                            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
                                <input
                                type="date"
                                name=""
                                id=""
                                className="text-slate-500 text-xs font-normal font-Inter bg-gray-50"
                                />
                            </div>
                        </div>
                    </div>
            
                    <TabPanel>
                        {getEvents?.length ? (
                        <div className="mt-6 flex-wrap grid grid-cols-3 gap-8 flex">
                            {getEvents?.map((event:any)=>(
                                <div key={event.id}>
                            <Card
                                image={event.event_image}
                                date={formatDate(event.event_date)}
                                ticketsNo={event.tickets_bought}
                                title={event.title}
                                description={event.description}
                                id={event.id}
                                event_details={event}
                            />
                            </div>
                            ))}
                        </div>
                        ):(<p className="ml-[11%] mt-[2%]">You have not hosted any events yet</p>)
                        }
                    </TabPanel>
                    <TabPanel>
                    {attendedEvents?.length ? (
                        <div className="mt-6 flex-wrap grid grid-cols-3 gap-8 flex">
                            {attendedEvents?.map((event:any)=>(
                                <div key={event.id}>
                            <Card
                                image={event.event_image}
                                date={formatDate(event.event_date)}
                                ticketsNo={event.tickets_bought}
                                title={event.title}
                                description={event.description}
                                id={event.id}
                                event_details={event}
                            />
                            </div>
                            ))}
                        </div>
                        ):(<p className="ml-[11%] mt-[2%]">You have not attended any events yet</p>)
                        }
                    </TabPanel>
                </Tabs>
            </div>
        </div>
        </>
    )
}