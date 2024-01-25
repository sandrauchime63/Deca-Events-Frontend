import axios from '../../configurations/httpSetup';

export const registerUser = async(body: any)=>{
    try{
        const response = await axios.post("/users/signup", body, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response
    }catch(error:any){
        return error.response
    }
}
export const loginUser = async(body: any)=> {
    try{
        const response = await axios.post("/users/signin", body, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response
    }catch(error:any){
        return error.response
    }
}

export const verifyUser = async(token:string | undefined)=> {
    try{
        const response = await axios.get(`/users/verify/${token}`)
        return response
    }catch(error:any){
        return error.response
    }
}

export const resendVerificationLink = async (body:any)=>{
    try{
        const response = await axios.post("users/resend-verification", body)
          return response;
    }catch(err:any){
        return err.response
    }
  }

  export const fetchData = async()=>{
    try{
        const response = await axios.get("users/get_profile")
          return response.data.data;
    }catch(err:any){
        return err.response
    }
  }

  export const updateUserProfile = async(body:any)=>{
    try{
        const response = await axios.patch("users/update_profile", body)
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const changeProfilePicture = async(pic:any)=>{
    try{
        const response = await axios.patch("users/change_profile_picture", pic)
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const deleteProfileImage = async()=>{
    try{
        const response = await axios.delete("users/delete_profile_image")
          return response.data;
    }catch(err:any){
        return err.response
    }
  }

  export const changePassword = async(body:any)=>{
    try{
      const response = await axios.patch("/users/change_password", body)
      return response
    }catch(error:any){
      return error.response
    }
  }

  export const editUserProfile = async(body:any)=>{
    try{
        const response = await axios.patch("/users/edit_profile", body)
        return response
    }catch(error:any){
        return error.response
    }
  }

  export const addBankAccount = async(body:any) => {
    try{
      const response = await axios.post("/users/add_account", body)
    return response.data
    }catch(error:any){
      return error.response
    }
  }
  
  export const getBankAccount = async() => {
    try{
      const response = await axios.get("/users/get_user_account")
    return response.data
    }catch(error:any){
      return error.response
    }
  }
  export const editAccountDetails = async(body:any) => {
    try{
      const response = await axios.patch("/users/edit_account", body)
    return response
    }catch(error:any){
      return error.response
    }
  }

  export const checkUserDetails = async(body:any) => {
    try{
      const response = await axios.post("/users/check", body)
    return response
    }catch(error:any){
      return error.response
    }
  }

  export const getTicketHistory = async() => {
    try{
      const response = await axios.get("/users/tickets")
    return response.data
    }catch(error:any){
      return error.response
    }
  }

  export const getEarningsHist = async() => {
    try{
      const response = await axios.get("/users/earnings")
    return response
    }catch(error:any){
      return error.response
    }
  }