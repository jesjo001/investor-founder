import Events from '../../../models/events';

export const getAllEvents = async (req, res) => {
  const getAllEvent = await Events.find();
  return res.status(200).json(getAllEvent);
};

export const getEventById = async(req,res)=>{
  try{
    const getbyid = await Events.findOne({_id:req.params.id})
    if(getbyid){
      return res.status(200).send(getbyid)
    }
    return res.status(404).send('not found')

  }catch(e){
    console.log(e.message)
  }
}
