import PendingFounder from '../../model/pendingFounder'

export const denyPending = async ( req, res ) => {
    try{
        const exist = await PendingFounder.exists({_id: req.params.id})
        if(!exist) return res.status(404).send('Founder not found');
    
        const founder = await PendingFounder.findOneAndUpdate(
            {_id: req.params.id}, 
            { $set: { state: "Denied", isApproved: false }}
            )
        if(!founder) return res.status(404).send('Founder not found');
        return res.status(200).send('Founder Deleted Successfully');

    } catch( e ){
        console.log(e);
        return res.status(500).send("Something went wrong")
    }
}