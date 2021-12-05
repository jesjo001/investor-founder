import Blog from '../../../models/blog';

export const getBlogs = async (req, res) => {
    try {
      const count = await Blog.find({ approved: true }).countDocuments({});
      //set Pagination Parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 100;
      const skipIndex = (page - 1) * limit;
  
      //Find Blogs with query parameters
      const blogs = await Blog.find({ approved: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skipIndex)
        .exec();
  
      //if blog not found return 404
      if (!blogs.length)
        return res
          .status(404)
          .json({ status: 404, message: 'No Blog Post Found' });
      else
        return res
          .status(200)
          .json({ status: 200, blogs, count, message: 'Success' });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ status: 500, message: 'Server Error, Try again later..' });
    }
  };