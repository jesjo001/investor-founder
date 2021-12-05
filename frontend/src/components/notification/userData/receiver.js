import React, { useEffect, useState } from 'react'
import { API_PATH } from "../../../utils/constants";

const Receiver = ({data})=>{
const [userData,setUser] = useState([])
    useEffect(()=>{
        // create function to fetch user details using props passed
        async function getUser(){
            const fetchAll = await fetch(`${API_PATH}/getUser/${data.receiverId}`,{
            headers:{authorization:`Bearer ${localStorage.getItem("token")}`}
        })
        const res = await fetchAll.json()
        setUser(res)
        }
        getUser()
    },[])

    return(
           <>
            <section style={{ flexBasis: "18%" }}>
        <img
          src={`${API_PATH}/${userData.profileImage}`}
          alt="user"
          className="muon-messaged-notice-img"
        />
      </section>
      <section className="w-100 mr-1" style={{ flexBasis: "40%" }}>
        <p className="mt-0 muon-main-content muon-notice-from">
          <a href={`/profile/${userData._id}`}>{userData.name}</a>
        </p>

          <p className="muon-event-notice-txt m-0">
            {data.message} {
              data.type === "EVENT_INVITATION"?<span>Event Name</span>
                : null
            }
        </p>
          
        
      </section>
           </>
    )
}
export default Receiver