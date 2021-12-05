 import Blog from '../../../models/blog';

export const getBlogsById = async (req,res)  =>{
    try{
        // find blog by id 
        const blogById = await Blog.findOne({_id: req.params.id})

        if(blogById){
            let updateView = await Blog.updateOne({_id: blogById}, { $set: { lastViewedAt: new Date()}})

            return res.status(200).send(blogById)
        }
        
        return res.status(404).send('Blog not found')

    } catch(e){
        console.log(e.message)
        res.status(500).send('Ops Something Went Wrong. Try again.')
    }
}