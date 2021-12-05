import React from 'react';
import { useHistory } from 'react-router';
import './blogCard.css';
import sampleImg from '../../assets/images/blogSampleSm.png';
import sampleBlogger from '../../assets/images/sampleBlogger.png';

export const BlogCard = ({
  id,
  title,
  desc,
  readTime = '5 mins read',
  postTime = '2 days ago',
  author,
}) => {
  const history = useHistory();
  return (
    <div className="muon-blog-card" onClick={() => history.push(`/blogs/${id}`)}>
      <section>
        <img src={sampleImg} alt="blog" className="blog-card-img" />
      </section>
      <section className="blog-card-highlight">
        <p className="blog-card-read-time d-flex align-items-center">
          <span className="read-time-dash"></span> {readTime}
        </p>
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-desc">{`${desc.substring(0, 100)}...`}</p>
      </section>

      <section className="blog-card-footer">
        <div className="d-flex align-items-center justify-content-between">
          <section className="d-flex align-items-center">
            <img
              src={sampleBlogger}
              alt="blogger"
              className="blog-card-blogger-img"
            />
            <p className="mb-0 ml-2 blog-card-blogger">{author}</p>
          </section>
          <p className="mb-0 blog-card-time">{postTime}</p>
        </div>
      </section>
    </div>
  );
};
