import Comment from '../../../models/comment';

export const approveComment = async(req, res) => {

    if(!req.params) return res.status(500).send("Invalid Query Parameter");

     //retrieve Comment Id
     const { id } = req.params

     try {

        //Get comment
        //if no comment return not found
        const comment = await Comment.findOne({ _id: id})
        if(!comment) return res.status(404).send("Comment Not Found")

        //If Comment is already approved exit with message Comment already approve
        if(comment && comment.approved) return res.status(200).send("Comment have been previously approved")
         
        //if comment Exist and has not been approved, Approve Comment.
        if(comment && !comment.approved) {
            const approve = await Comment.updateOne({ _id: id }, { $set :{ approved: true, approvedAt: new Date(), updatedAt: new Date()} })
            if (approve) return res.status(200).send("Comment approved")
        }

     } catch (e) {
         console.log(e);
         return res.status(500).send("Something went wrong!!!");
     }
}
