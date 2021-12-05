import React, { useState, useEffect, useLayoutEffect } from 'react';
import './muonBlog.css';
import { BlogCard } from '../../components/blogCard/BlogCard';
// import sampleBlogLg from "../../assets/images/blogSampleLg.png";
// import sampleBlogger from "../../assets/images/sampleBlogger.png";
import { AboutBlogPost, MuonButton } from '../../components/index';
import { getAllBlogs } from '../../store/actions/blogActions';
import { useDispatch, useSelector } from 'react-redux';

export const MuonBlog = () => {
  const data = [1, 2, 3, 4, 5, 6];

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const blogs_store = useSelector((state) => state.blog.blogs);
  const blog_data = blogs_store.blogs;

  const [loadingData, setLoadingData] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchAllBlogs();
  }, [currentPage]);

  // This use effect hook stores the data gotten from
  // the store in the appropriate state when the data arrives
  useEffect(() => {
    setBlogs(blog_data);
  }, [blog_data]);

  const fetchAllBlogs = async () => {
    setLoadingData(true);
    try {
      await dispatch(getAllBlogs(currentPage, limit));
      setLoadingData(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response);
      setLoadingData(false);
      setErrorMessage(err);
    }
  };

  return (
    <div className="muon-blog">
      {/* <div className="muon-new-post-grid">
        <section>
          <span className="muon-new-post-tag hidden-tag">New Post</span>
          <img src={sampleBlogLg} alt="new blog" className="muon-blog-img" />
        </section>
        <section>
          <span className="muon-new-post-tag visible-tag">New Post</span>
          <h3 className="muon-new-post-header">
            Est non odio id sunt officiis
          </h3>
          <p className="muon-new-post-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <AboutBlogPost />
        </section>
      </div> */}
      <div>
        <h2 className="blog-list-title">Latest Blog Articles</h2>
        <section className="blogs-grid">
          {blogs &&
            blogs.map((blog, i) => {
              return (
                <div key={`blog${i}`}>
                  <BlogCard
                    id={`${blog._id}`}
                    title={`${blog.title}`}
                    desc={`${blog.content}`}
                    author={`${blog.author}`}
                  />
                </div>
              );
            })}
        </section>
        <section className="mt-5 text-center">
          {/* <MuonButton content="View More" style={{ borderRadius: 4 }} /> */}
        </section>
      </div>
    </div>
  );
};
