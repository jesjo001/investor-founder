import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { API_PATH } from '../../utils/constants'
import { MuonEvent } from './MuonEvent'

export function Events(){
    //Get all events

    const [state, setstate] = useState([])

    useEffect(() => {
        getALlEvents()
        
    }, [])

    async function getALlEvents(){
        const fetchAllEvents = await axios.get(`${API_PATH}/events/getall-events`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
        })
        return setstate(fetchAllEvents.data)
    }

    return(
        <>
            <MuonEvent events={state}/>
        </>
    )
}