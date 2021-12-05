import Connection from '../../../models/connection'

//WHERE USER IS THE RECEIVEING USER
export const getConnections = async(req,res) =>{
    //fetch all users connection where the user loged in is the receiving user
    const getMyconnections = await Connection.find({'receiver.userId':req.user.id}).exec()
    if(!getMyconnections){
        return res.status(404).send({error:'no connections yet'})
    }
    return res.status(200).send({data:getMyconnections})
}

//WHERE USER IS THE SENDER
export const getConnectionsSender = async(req,res) =>{
    //fetch all users connection where the user loged in is the receiving user
    const getMyconnections = await Connection.find({'sender.userId':req.user.id}).exec()
    if(!getMyconnections){
        return res.status(404).send({error:'no connections yet'})
    }
    return res.status(200).send({data:getMyconnections})
}
