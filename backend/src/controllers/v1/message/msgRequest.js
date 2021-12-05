import { Notify } from "../Notification/notification"

export const MessageRequest = async(req,res)=>{
    if(req.user.id === req.params.receiver){
        return null
    }

     Notify(req.user.id,req.params.receiver,'MESSAGE_REQUEST',null,req.user.id)
     return res.status(200).send({message:'request sent'})
}