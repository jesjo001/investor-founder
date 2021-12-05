import Comment from '../../../models/comment';

export const getComments = async(req, res) => {

    if(!req.params) return res.status(500).send("Invalid Query Parameter");

    //retrieve Comment Id
    const { id } = req.params

    try {
        //get comments by blog id
        const comments = await Comment.find({ blogId: id})
        .sort({ createdAt: -1 })
        .exec();
        
        // if no comment return "No comments Found"
        //else return Comments
        if(!comments.length)return res.status(404).send("No Comments found")
        else return res.status(200).send(comments)
        
    } catch (e) {
        console.log(e);
        return res.status(500).send("Something went wrong")
    }

}
