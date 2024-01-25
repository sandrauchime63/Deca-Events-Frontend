import axios from '../../configurations/httpSetup';

export const createEvent = async(body:any)=>{
    try {
      const response = await axios.post("events/create", body);
      return response;
    } catch (err: any) {
      return err.response;
    }
}


  export const upComingEvents = async(incomingParams?:any) => {
    try {
        const response = await axios.get("/events/upcoming_events", {
            params:incomingParams
        });
        return response.data;
      } catch (err: any) {
        return err.response;
      }
  }

  export const getSingeEvent = async(id:any)=>{
    try{
        const response = await axios.get(`events/get-single-event/${id}`)
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const addEventComments = async(id:any, comments:any)=>{
    try{
        const response = await axios.post(`events/add-comment/${id}`, comments)
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const getEventComments = async(id:any)=>{
    try{
        const response = await axios.get(`events/comments/${id}`)
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const getHostedevents = async() => {
    try{
      const response = await axios.get(`events/get-my-events`)
        return response;
  }catch(err:any){
      return err.response
  }
  }

  export const getAttendedevents = async() => {
    try{
      const response = await axios.get(`events/attended_events`)
        return response;
  }catch(err:any){
      return err.response
  }
  }
  
  export const userReportEvent = async(id:any, body:any) => {
    try{
      const response = await axios.post(`events/report_event/${id}`, body)
        return response;
  }catch(err:any){
      return err.response
  }
  }

  export const userDeleteEvent = async(id:any) => {
    try{
      const response = await axios.delete(`events/delete_event/${id}`)
        return response;
  }catch(err:any){
      return err.response
  }
  }


  export const paystack = async(body:any) => {
    try{
      const response = await axios.post(`paystack/pay`, body)
      return response
  }catch(err:any){
    return err.response
}
  }

  export const userPays = async(id:any, body:any) => {
    try{
      const response = await axios.post(`events/payment/${id}`, body)
      return response
  }catch(err:any){
    return err.response
}
  }

  export const userLikesAnEvent = async(id:any) => {
    try{
      const response = await axios.post(`events/like/${id}`)
      return response
  }catch(err:any){
    return err.response
}
  }


  export const userDislikesAnEvent = async(id:any) => {
    try{
      const response = await axios.post(`events/dislike/${id}`)
      return response
  }catch(err:any){
    return err.response
}
  }


  export const adminBlocksEvent = async(id:any) => {
    try{
      const response = await axios.post(`admin/block_event/${id}`)
      return response
  }catch(err:any){
    return err.response
}
  }

  export const adminUnblocksEvent = async(id:any) => {
    try{
      const response = await axios.post(`admin/unblock_event/${id}`)
      return response
  }catch(err:any){
    return err.response
}
  }
  export const getEventReport = async(id:any) => {
    try{
      const response = await axios.get(`admin/get_reports/${id}`)
      return response
  }catch(err:any){
    return err.response
}
  }

  export const getFlaggedEvent = async() => {
    try{
      const response = await axios.get(`admin/flagged`)
      return response
  }catch(err:any){
    return err.response
}
  }