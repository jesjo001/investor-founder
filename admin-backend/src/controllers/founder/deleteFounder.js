import Founders from '../../model/founders'


export const deleteFounder = async ( req, res ) => {
    try{
        const exist = await Founders.exists({_id: req.params.id})
        if(!exist) return res.status(404).send('Founder not found');
    
        const founder = await Founders.findByIdAndDelete(req.params.id)
        if(!founder) return res.status(404).send('Founder not found');
        return res.status(200).send('Founder Deleted Successfully');

    } catch( e ){
        console.log(e);
        return res.status(500).send("Something went wrong")
    }
}