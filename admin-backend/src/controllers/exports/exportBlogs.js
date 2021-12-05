import Blog from '../../model/blog';

export const exportBlogs = async (req, res) => {
  try {
    //Find Blogs with query parameters
    const blogs = await Blog.find({ approved: true })
      .sort({ createdAt: -1 })
      .exec();

    //if blog not found return 404
    if (!blogs.length)
      return res
        .status(404)
        .json({ status: 404, message: 'No Blog Post Found' });
    else return res.status(200).json({ blogs });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: 500, message: 'Server Error, Try again later..' });
  }
};
