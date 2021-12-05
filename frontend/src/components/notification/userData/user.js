import React, { useEffect, useState } from 'react'
import { API_PATH } from "../../../utils/constants";
import person from '../../../assets/images/avatarHolder.webp';
const User = ({ data }) => {
  const [userData, setUser] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);

  console.log("data ", data.sender.id)
  useEffect(() => {
    // create function to fetch user details using props passed
    setDoneLoading(false);
    async function getUser() {
      const fetchAll = await fetch(`${API_PATH}/getUser/${data.sender.id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      const res = await fetchAll.json()
      console.log("res ", res)
      setUser(res)
    }
    getUser()
    setDoneLoading(true)
    // console.log("data ", data)
    // console.log("pImage: ",`${userData?.profileImage}`)
    console.log("userdata ",userData)
  }, [data])

  const addPlaceholder = (e) => {
    e.target.src = person;
  };

  return (    
    <>
    { doneLoading && (<><section><img
          src={`${API_PATH}/${userData?.profileImage}`}
          alt="user"
          className="muon-messaged-notice-img"
          onError={addPlaceholder}
        /></section><section className="w-100 mr-1" style={{ flexBasis: "60%" }}>
        <p className="mt-0 muon-main-content muon-notice-from">
          <a href={`/profile/${userData?._id}`}>{data.sender.fullName}</a>
        </p>

        <p className="muon-event-notice-txt m-0">
          {data?.message} {
            data.type === "EVENT_INVITATION" ? <span>Event Name</span>
              : null
          }
        </p>


      </section></>)}
      {/* <section style={{ flexBasis: "18%" }}>
        <img
          src={`${API_PATH}/${userData?.profileImage}`}
          alt="user"
          className="muon-messaged-notice-img"
          onError={addPlaceholder}
        />
      </section>
      <section className="w-100 mr-1" style={{ flexBasis: "60%" }}>
        <p className="mt-0 muon-main-content muon-notice-from">
          <a href={`/profile/${userData?._id}`}>{data.sender.fullName}</a>
        </p>

        <p className="muon-event-notice-txt m-0">
          {data?.message} {
            data.type === "EVENT_INVITATION" ? <span>Event Name</span>
              : null
          }
        </p>


      </section> */}
    </>
  )
}
export default User