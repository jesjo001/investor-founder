import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Card, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';

import PageHeader from '../../elements/PageHeader';
import { postNewUser } from '../../../store/actions/userActions';

export default function NewUser(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [revealPassword, setRevealPassword] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      department: '',
      role: '',
    },
    onSubmit: async formValues => {
      setLoading(true);
      try {
        await dispatch(postNewUser(formValues));
        setLoading(false);
        props.history.push('/admin/users/all');
      } catch (error) {
        console.log(1, error.response.data.error);
        setLoading(false);
        setError(error.response.data.error);
      }
    },
  });

  return (
    <div>
      <PageHeader title="New User" />
      <Card className="px-2 pt-5">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="col-md-9 ">
            <div className="form-row">
              <div className="form-group col-md-5">
                <label className={'text-dark'} htmlFor="exampleInputEmail1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Full name"
                  name="fullName"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  className={'form-control'}
                />
              </div>

              <div className="form-group col-md-5">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Email
                </label>
                <input
                  type="text"
                  id="exampleInputPassword1"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={'form-control'}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="exampleInputPassword1"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className={'form-control'}
                />
              </div>
              <div className="form-group col-md-5">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Department
                </label>
                <select
                  id="exampleInputPassword1"
                  placeholder="Department"
                  name="department"
                  onChange={formik.handleChange}
                  value={formik.values.department}
                  className={'form-control'}
                >
                  <option />
                  <option key="sales" value="sales">
                    Sales
                  </option>
                  <option key="it" value="it">
                    IT
                  </option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-10">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Role
                </label>
                <select
                  id="exampleInputPassword1"
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  className={'form-control'}
                >
                  <option />
                  <option key="admin" value="615d4c47eabf723fd9598425">
                    Admin
                  </option>
                  <option key="superadmin" value="615d4cb73821e98c06dd8df9">
                    Super Admin
                  </option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label className={'text-dark'} htmlFor="exampleInputEmail1">
                  Password
                </label>
                <input
                  type={revealPassword ? 'text' : 'password'}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className={'form-control'}
                />
                <Link onClick={() => setRevealPassword(!revealPassword)} to="#">
                  <small className="">{revealPassword ? 'Hide' : 'Reveal'} Password</small>
                </Link>
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
                ' Create User'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
