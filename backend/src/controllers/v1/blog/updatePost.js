import Blog from '../../../models/blog';

export const updatePost = async(req,res)=>{

    if(!req.params.id || !req.body.content || !req.body.title) 
    return res.status(500).send("Invalid Query Parameter");

    const postId = req.params.id
    const userId = req.user.id

    //Check if user has permission to update the Blog Post
    //Check if user is the owner of the post
    const blogToUpdate = await Blog.findOne({_id: postId });

    if(!blogToUpdate || blogToUpdate.createdBy.toString() !== userId.toString()) 
    return res.status(404).send('You do not have access to update this blog')

    const myObject = Object.assign({}, req.body);

    try{
        // find blog by id and update
        const updatedBlog = await Blog.findByIdAndUpdate( postId, {$set:{ ...myObject, updatedAt:  Date.now()}}).exec();

        if(updatedBlog) return res.status(200).send("Blog Post Updated")
            else return res.status(404).send('Blog not found')

    } catch(e){
        console.log(e.message)
        res.status(500).send('Ops Something Went Wrong. Try again.')
    }
}
