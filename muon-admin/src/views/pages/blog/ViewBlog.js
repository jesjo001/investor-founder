import React, { useState, useEffect, useLayoutEffect } from 'react';
import { withRouter, Link, useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'reactstrap';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loader } from '../../../vibe';
import { getAllBlogs, postApproveBlog, getUnapprovedBlogs } from '../../../store/actions/blogActions';

function ViewBlog(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [approveError, setApproveError] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const blogData = blogs && blogs.find(blog => blog._id === id);
    setBlog(blogData);
  }, [id, blogs]);

  // access store to get appropriate data and store in the variable
  // NB: data gotten from store ends with _store for readability
  const blogs_store = useSelector(state => state.blog.blogs);
  const blog_data = blogs_store.blogs;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchAllBlogs();
  }, []);

  // This use effect hook stores the data gotten from
  // the store in the appropriate state when the data arrives
  useEffect(() => {
    setBlogs(blog_data);
  }, [blog_data]);

  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      await dispatch(getAllBlogs());
      setLoading(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoading(false);
      setError(err);
    }
  };

  const handleApproveBlog = async () => {
    setLoadingApprove(true);
    setApproveError(false);
    try {
      await dispatch(postApproveBlog(id));
      props.history.push('/blogs/all');
      setLoadingApprove(false);
    } catch (error) {
      setLoadingApprove(false);
      setApproveError(error.response.data.message);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader type="bars" />
      ) : (
        blog && (
          <Card>
            <div className="view-header-wrapper">
              <div className="pull-left">
                <h2 className="primary-color-text"> View Blog Details</h2>
              </div>
            </div>
            <Col className="col-md-12 view-body-wrapper">
              <label className="fw-bold">
                Date Created: <span className="text-dark fw-100">{moment(blog.createdAt).format('LLLL')}</span>
              </label>
              <br />
              <br />
              {error ||
                (approveError && (
                  <div className="alert alert-danger" role="alert">
                    {error || approveError}
                  </div>
                ))}
              <Row>
                <Col md={12}>
                  <label className="fw-bold">Blog Title</label>
                  <p htmlFor="exampleInputEmail1">{blog.title}</p>
                </Col>
                <Col md={8}>
                  <label className="fw-bold">Blog Content</label>
                  <p htmlFor="exampleInputEmail1">{blog.content}</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <label className="fw-bold">Author</label>
                  <p htmlFor="exampleInputEmail1">{blog.author}</p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold">Status</label>
                  <p htmlFor="exampleInputEmail1">{blog.approved ? 'Approved' : 'Pending'}</p>
                </Col>
              </Row>

              {!blog.approved && (
                <div className="pull-left mt-5">
                  {/* <Link to="/blogs/all"> */}
                  <Button color="" className=" pl-2 btn-sm btn bg-gradient text-white mr-2" onClick={handleApproveBlog}>
                    {loadingApprove ? (
                      <span
                        style={{ width: 25, height: 25 }}
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      <>
                        Approve
                        <span className="fa fa-check text-white m-auto" />
                      </>
                    )}
                  </Button>
                  {/* </Link> */}
                  <Button color="" onClick={toggleDeleteModal} className=" pl-2 btn btn-sm bg-danger text-white">
                    Deny
                    <span className="fa fa-times text-white m-auto" />
                  </Button>
                </div>
              )}
            </Col>
          </Card>
        )
      )}
    </div>
  );
}

export default withRouter(ViewBlog);
