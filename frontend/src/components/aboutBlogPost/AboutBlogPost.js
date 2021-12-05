import React from "react";
import Sample from "../../assets/images/sampleBlogger.png";

export const AboutBlogPost = ({
  author,
  readTime = "5",
  postTime = "2 days ago",
  sampleBlogger = Sample,
}) => {
  return (
    <div className="d-flex align-items-center about-post">
      <section className="d-flex align-items-center mr-3">
        <img
          src={sampleBlogger}
          alt="blogger"
          className="blog-card-blogger-img"
        />
        <p className="mb-0 ml-2 blog-card-blogger">{author ? author : "Andrea Wise"}</p>
      </section>
      <section className="d-flex align-items-center wrapped-about">
        <p className="mb-0 mr-3 muon-new-post-read-time d-flex align-items-center">
          <span className="read-time-dash"></span> {readTime} mins read
        </p>
        <p className="mb-0 blog-card-time">{postTime}</p>
      </section>
    </div>
  );
};
