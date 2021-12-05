import Blog from '../../model/blog'

export const deleteBlog = async ( req, res ) => {

    if(!req.params.id) return res.status(404).send('Invalid Query Parameter')
    try{
        const exist = await Blog.exists({_id: req.params.id})
        if(!exist) return res.status(404).send('Blog not found');
    
        const blog = await Blog.findByIdAndDelete(req.params.id)
        if(!blog) return res.status(404).send('Something went wrong');
        return res.status(200).send('Blog deletes successfully')

    } catch( e ){
        console.log(e);
        return res.status(500).send("Something went wrong")
    }
}