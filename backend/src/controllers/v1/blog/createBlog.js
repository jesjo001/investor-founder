import Blog from '../../../models/blog';

export const createBlog = async(req, res) => {

    if(!req.body.title || !req.body.content) return res.status(500).send("Invalid Query Parameter");

    const { title, content } = req.body;
    const createdAt = new Date()
    const createdBy = req.user.id 
    const author = req.user.name;

    try {
        // Create a new Blog in Db
        const createBlog = await Blog.create({ title, content, createdBy, author, createdAt: new Date(createdAt)})

        // if create successful return blog
        if(createBlog) return res.status(200).send({message:"Blog Post Created Successfully", blog: createBlog});
            else return res.status(500).send("Something went wrong. Could'nt Create Blog");
        
    } catch (e) {
        console.log(e.message)
        return res.status(500).send("Ops Something went wrong!! Try again later")
    }
}