import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { inputChange, loginUser } from './../../../store/actions/authActions';
import { clearErrors } from './../../../store/actions/errorActions';
import PropTypes from 'prop-types';

const Login = ({ inputChange, email, password, isAuthenticated, error, loginUser, loading, clearErrors,history }) => {
  const { register, handleSubmit} = useForm();
  const [errorMessage, setErrorMessage] =useState('')
  const mounted = useRef(); 
  useEffect(()=>{
      if (!mounted.current) {
          // do componentDidMount logic
          mounted.current = true;             
      } else {
          if(error.id === 'LOGIN_FAILURE'){           
              const message = typeof(error.msg) === 'object' ? error.msg.join('<br/>'): error.msg   
              setErrorMessage(message)              
              clearErrors();
          }  
                  
        } 	       
    })  
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    inputChange(name, value);
  }
  const submitHandler = async () => {
    setErrorMessage('')   
     const data = {
        email,
        password
     }
     await loginUser(data)     
  };

  return (
    <div className="bg-gradient login-class">
      {isAuthenticated? <Redirect to='/dashboard' /> : null}
      <div className="">
        <div
          className="offset-lg-4 col-lg-4 offset-md-3 col-md-6 offset-sm-2 col-sm-8 justify-content-center login-card"
          style={{
            boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            paddingLeft: 50,
            padding: 50,
            borderRadius: 10,
            backgroundColor: '#fff',
          }}
        >
          <h2 className="text-center font-weight-bold primary-color-text mb-0 pb-0">MUON Admin </h2>
          <br />
          <h4 className="text-center font-weight-normal login-text">Login to Your Account</h4>
          <br />
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group col-md-12 ">
              <input
                type="email"
                name="email"
                autoComplete="on"
                ref={register({
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
                })}
                className={'form-control'}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                required
                value={email} onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-12">
              <input
                type="password"
                name="password"
                autoComplete="on"
                ref={register({ required: true })}
                className={'form-control'}
                id="exampleInputPassword1"
                placeholder="Password"
                required
                value={password}
                onChange={handleChange}
              />
            </div>

            <br />
            <div className="form-group col-md-12">
              <button className="btn col-md-12 bg-gradient text-white">
                {loading ? (
                  <span
                    style={{ width: 25, height: 25 }}
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  inputChange: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  email: state.auth.email,
  password: state.auth.password,
  loading: state.auth.loading,
  error: state.error
});
export default connect(mapStateToProps, { inputChange, clearErrors, loginUser })(Login);