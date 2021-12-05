import API from './../../assets/api';
import axios from 'axios';
import {
    GET_FOUNDERS,
    SELECT_FOUNDER,
    SELECT_UNAPPROVED_FOUNDERS,
    GET_UNAPPROVED_FOUNDERS,
    APPROVED_FOUNDERS,
    EXPORT_ALL_FOUNDERS,
    APPROVE_FOUNDER,
    DELETE_FOUNDER
} from './types';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


export const getFounder = (page, limit) => {
   return async dispatch => {
    const response = await API.getFounder(page, limit);
    const { data } = response;

    dispatch({
        type:GET_FOUNDERS,
        payload: data,
    })
   }
};

// export const selectedFounder = (id) => {
//     return async dispatch => {
//         const response = await API.getInvestors(page, limit);
//         const { data } = response;
    
//         dispatch({
//             type:GET_FOUNDERS,
//             payload: data,
//         })
//     }
// };

export const exportFounders = () => {
    return async dispatch => {
      const response = await API.exportFounders();
      const { data } = response;
      dispatch({
        type: EXPORT_ALL_FOUNDERS,
        payload: data,
      });
    };
  };


export const getUnapprovedFounder = (page, limit) => {
    return async dispatch => {
        const response = await API.getUnapprovedFounder(page, limit);
        const { data } = response;
    
        dispatch({
            type:GET_UNAPPROVED_FOUNDERS,
            payload: data,
        })
       }
}

export const approveFounder = (id) => {
    return async dispatch => {
        const response = await API.approveFounder(id);
        const res = await response;
        console.log('RESPONSE: ', res);
    }
}


export const deleteFounder = (id) => {
    return async dispatch => {
        const response = await API.deleteFounder(id);
        const  res =  await response;
    }
}

export const denyPendingFounder = (id) => {
    return async dispatch => {
        const response = await API.denyPendingFounder(id);
        const  res =  await response;
    }
}