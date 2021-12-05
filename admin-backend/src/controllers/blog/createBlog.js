import Blog from '../../model/blog';


export const createBlog = async(req, res) => {

    //check for request body if no body return error code 
    if(!req.body.title || !req.body.content) return res.status(404).send("Invalid Query Parameter");

    const { title, content } = req.body;
    const createdAt = new Date();
    const createdBy = req.user.id;
    const { fullName } = req.user

    try {
        // Create a new Blog in Db
        //automatically approve for admin
        const createBlog = await Blog.create({ title, content, createdBy, approved: true, createdAt: new Date(createdAt), author: fullName });

        // if create successful return blog
        if(createBlog) return res.status(200).json({ status: 200, message:"Blog Post Created Successfully", blog: createBlog});
            else return res.status(500).json({ status: 500, message: "Something went wrong. Could'nt Create Blog Post"});
        
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ status: 500, message: "Ops Something went wrong!! Try again later"})
    }
}