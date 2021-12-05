import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, CardHeader, CardBody, Progress, Button } from 'reactstrap';
import PageHeader from '../../elements/PageHeader';

export default function ChangePassword(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);

  const { register, handleSubmit, errors, getValues } = useForm();

  // Function to handle submission of form
  const submitHandler = async result => {
    props.history.push('/events/all');
  };

  return (
    <div>
      <PageHeader title="Change Password" />
      <Card className="px-2 pt-5">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="col-md-9 ">
            <div className="form-row">
              <div className="form-group col-md-5">
                <label className={errors.fullname ? ' errorText' : 'text-dark'} htmlFor="exampleInputEmail1">
                  Current Password
                </label>
                <input
                  type="text"
                  name="fullname"
                  ref={register({ required: false })}
                  className={!errors.fullname ? 'form-control' : 'form-control error'}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="*****"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label className={errors.email ? ' errorText' : 'text-dark'} htmlFor="exampleInputPassword1">
                  New Password
                </label>
                <input
                  type="text"
                  name="email"
                  ref={register({ required: false })}
                  className={!errors.email ? 'form-control' : 'form-control error'}
                  id="exampleInputPassword1"
                  placeholder="*****"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label className={errors.email ? ' errorText' : 'text-dark'} htmlFor="exampleInputPassword1">
                  Confirm New Password
                </label>
                <input
                  type="text"
                  name="email"
                  ref={register({ required: false })}
                  className={!errors.email ? 'form-control' : 'form-control error'}
                  id="exampleInputPassword1"
                  placeholder="*****"
                />
              </div>
            </div>
            <br />

            <Link to="/admin/users/all">
              <Button color="" className="form-group btn btn-sm text-white bg-gradient">
                {loading ? (
                  <span
                    style={{ width: 25, height: 25 }}
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ' Confirm New Password'
                )}
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
