import React, { useState, useEffect, useLayoutEffect } from 'react';
import SingleBlog from "../../assets/images/singleBlog.png";
import { AboutBlogPost } from "../../components";
import { getBlogById } from '../../store/actions/blogActions';
import { useDispatch, useSelector } from 'react-redux';

import "./eachMuonBlogPost.css";

export const EachMuonBlogPost = (props) => {

  const blogs_store = useSelector((state) => state.blog);
  const blog_data = blogs_store.singleBlog;
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();


  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog(props.match.params.id);
  }, []);

  const fetchBlog = async (id) => {
    setLoadingData(true);
    try {
      await dispatch(getBlogById(id));
      setLoadingData(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response);
      setLoadingData(false);
      setErrorMessage(err);
    }
  };
  return (
    <div>
      <section>
        <img src={SingleBlog} alt="single blog" className="muon-post-img" />
      </section>
      <section className="muon-post-content">
        <h2>{blog_data?.title}</h2>
        <AboutBlogPost author={blog_data?.author} />
        <div className="muon-post-text">
          <p>
            {blog_data?.content}
          </p>
        </div>
      </section>
    </div>
  );
};
