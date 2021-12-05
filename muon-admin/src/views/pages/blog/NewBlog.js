import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Card, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';

import PageHeader from '../../elements/PageHeader';
import { postNewBlog } from '../../../store/actions/blogActions';

export default function NewBlog(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: async formValues => {
      setLoading(true);
      try {
        await dispatch(postNewBlog(formValues));
        setLoading(false);
        props.history.push('/blogs/all');
      } catch (error) {
        console.log(1, error.response.data.message);
        setLoading(false);
        setError(error.response.data.message);
      }
    },
  });

  return (
    <div>
      <PageHeader title="New Blog" />
      <Card className="px-2 pt-5">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="col-md-9 ">
            <div className="form-row">
              <div className="form-group col-md-9">
                <label className={'text-dark'} htmlFor="exampleInputEmail1">
                  Blog Title
                </label>
                <input
                  type="text"
                  required
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Blog Title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  className={'form-control'}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-9">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Blog Content
                </label>
                <textarea
                  type="text"
                  required
                  rows="6"
                  name="content"
                  onChange={formik.handleChange}
                  value={formik.values.content}
                  className={'form-control'}
                />
              </div>
            </div>
            <br />

            <Button type="submit" color="" className="form-group btn btn-sm text-white bg-gradient">
              {loading ? (
                <span
                  style={{ width: 25, height: 25 }}
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ' Create Blog'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
