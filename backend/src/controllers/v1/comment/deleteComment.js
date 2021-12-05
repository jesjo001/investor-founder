import Comment from '../../../models/comment';

export const deleteComment = async(req, res) => {
    
    if(!req.params) return res.status(500).send("Invalid Query Parameter");
    
    //retrieve Blog Id
    const { id } = req.params

    try {
        //check if comment exist
        const comment = await Comment.findOne({ _id: id})

        //if comment doesn't exist fail with error message
        if(!comment) return res.status(500).send("Comment not found")

        //if comment exist, delete comment
        if(comment){
            const deleteComment = await Comment.deleteOne({ _id: id })
            return res.status(200).send('Comment deleted successfully')
        }

    } catch (e) {
        console.log(e)
        return res.status(500).send("Ops!! Something went wrong")
    }
}
