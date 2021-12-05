import Comment from '../../../models/comment';


export const addComment = async(req, res) => {
    // if no query parameters return Invalid Query Parameters
    if(!req.body.comment || !req.body.createdBy || !req.body.blogId )
    return res.status(500).send("Invalid Query Parameter");

    //get query parameters
    const { comment, createdBy, blogId } = req.body;

    try {
        //add comment to database
        const addComment = await Comment.create({ comment, createdBy, blogId });

        //if successful return comment added successfully
        //else fai with error message 
        if(addComment) return res.status(200).send({ message: 'Comment added successfully', comment: addComment });
        else return res.status(500).send("Something went wrong. Could'nt add Comment");
        
    } catch (e) {
        console.log(e);
        return res.status(500).send("Ops Something went wrong!! Try again later")
    }
}
