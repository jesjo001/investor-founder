import Blog  from '../../model/blog';

//Approve blog route
export const approveBlog = async(req, res) => {
    // check for id in params. if no id return invalid query parameters
    if(!req.params.id) return res.status(404).send("Invalid Query Parameter")
    
    const { id } = req.params

    try {    
        //find blog by id
        const blog = await Blog.findOne({_id: id})
        if(!blog) return res.status(404).json({status: 404, message: "Invalid Blog"})

        //check if blog has been approved 
        if(blog.approved === true) return res.status(404).json({status: 404, message: "Blog has been previously Approved."})
        
        //if blog post is not yet approved, Approve Blog Post.
        const approveBlog = await Blog.findByIdAndUpdate({_id: id}, { $set: { approved: true } });

        if(approveBlog)
        return res.status(200).send({ status: 200, message: 'Blog Approved' })        
            
    } catch (e) {
        console.log(e);
        return res.status(500).send("Something went wrong")
    }
}

