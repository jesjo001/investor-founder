import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Card, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';

import PageHeader from '../../elements/PageHeader';
import { postNewEvent } from '../../../store/actions/eventActions';

export default function NewEvent(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [imgState, setImgState] = useState({
    path: '',
  });

  const [imageState, setImageState] = useState({
    image: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    formik.setFieldValue('image', imageState && imageState.image);
  }, [imageState]);

  const handleFileChange = e => {
    setImageState({
      image: e.target.files[0],
    });
    setImgState({
      ...imgState,
      path: URL.createObjectURL(e.target.files[0]),
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      availability: '',
      category: '',
      from: '',
      to: '',
      hostName: '',
      specialization: '',
      workPlace: '',
      country: '',
      state: '',
      venue: '',
      regLink: '',
      vidLink: '',
    },
    onSubmit: async formValues => {
      let formdata = new FormData();
      formdata.append('name', formValues.name);
      formdata.append('desc', formValues.desc);
      formdata.append('availability', formValues.availability);
      formdata.append('category', formValues.category);
      formdata.append('to', formValues.to);
      formdata.append('from', formValues.from);
      formdata.append('hostName', formValues.hostName);
      formdata.append('specialization', formValues.specialization);
      formdata.append('workPlace', formValues.workPlace);
      formdata.append('country', formValues.country);
      formdata.append('state', formValues.state);
      formdata.append('venue', formValues.venue);
      formdata.append('avatar', imageState.image);
      formdata.append('registrationLink', formValues.regLink);
      formdata.append('videoLink', formValues.vidLink);

      setLoading(true);
      try {
        await dispatch(postNewEvent(formdata));
        setLoading(false);
        props.history.push('/events/all');
      } catch (error) {
        console.log(1, error.response.data.message);
        setLoading(false);
        setError(error.response.data.message);
      }
    },
  });

  return (
    <div>
      <PageHeader title="New Event" />
      <Card className="px-2 pt-5">
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="col-md-9 ">
            <div className="form-row">
              <div className="form-group col-md-4">
                <label className={'text-dark'} htmlFor="exampleInputEmail1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className={'form-control'}
                  aria-describedby="emailHelp"
                  placeholder="Event name"
                />
              </div>

              <div className="form-group col-md-5">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Event Category
                </label>
                <select
                  id="exampleInputPassword1"
                  name="category"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  className={'form-control'}
                >
                  <option />
                  <option key="seminar" value="seminar">
                    Seminar
                  </option>
                  <option key="conference" value="conference">
                    Conference
                  </option>

                  <option key="workshop" value="workshop">
                    Workshop
                  </option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-9">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Event Description
                </label>
                <textarea
                  type="text"
                  name="desc"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.desc}
                  className={'form-control'}
                  aria-describedby="emailHelp"
                  placeholder="Event Description"
                  rows="3"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Event Date (from):
                </label>
                <input
                  type="date"
                  name="from"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.from}
                  className={'form-control'}
                  id="exampleInputPassword1"
                  placeholder="Event Date"
                />
              </div>
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Event Date (to):
                </label>
                <input
                  type="date"
                  name="to"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.to}
                  className={'form-control'}
                  id="exampleInputPassword1"
                  placeholder="Event Date"
                />
              </div>
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Available Slots
                </label>
                <input
                  type="number"
                  required
                  id="exampleInputPassword1"
                  placeholder="Available Slots"
                  name="availability"
                  onChange={formik.handleChange}
                  value={formik.values.availability}
                  className={'form-control'}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-9">
                <input required type="file" name="image" onChange={handleFileChange} className={'form-control'} />
                {imgState && imgState.path && <img src={imgState && imgState.path} alt="img" />}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Host name:
                </label>
                <input
                  type="text"
                  name="hostName"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.hostName}
                  className={'form-control'}
                  id="exampleInputPassword1"
                  placeholder="Event Host"
                />
              </div>
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Specialization:
                </label>
                <input
                  type="text"
                  name="specialization"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.specialization}
                  className={'form-control'}
                  id="exampleInputPassword1"
                  placeholder="Specialization"
                />
              </div>
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Workplace
                </label>
                <input
                  type="text"
                  id="exampleInputPassword1"
                  placeholder="Workplace"
                  name="workPlace"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.workPlace}
                  className={'form-control'}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Venue:
                </label>
                <input
                  type="text"
                  name="venue"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.venue}
                  className={'form-control'}
                  id="exampleInputPassword1"
                  placeholder="Event Venue"
                />
              </div>
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  State:
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  className={'form-control'}
                  id="exampleInputPassword1"
                  placeholder="State"
                />
              </div>
              <div className="form-group col-md-3">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Country
                </label>
                <input
                  type="text"
                  id="exampleInputPassword1"
                  placeholder="Country"
                  name="country"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  className={'form-control'}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Registration Link:
                </label>
                <input
                  type="text"
                  name="regLink"
                  onChange={formik.handleChange}
                  value={formik.values.regLink}
                  className={'form-control'}
                  id="exampleInputPassword1"
                  placeholder="Registration Link"
                />
              </div>
              <div className="form-group col-md-5">
                <label className={'text-dark'} htmlFor="exampleInputPassword1">
                  Video Link:
                </label>
                <input
                  type="text"
                  name="vidLink"
                  onChange={formik.handleChange}
                  value={formik.values.vidLink}
                  className={'form-control'}
                  id="exampleInputPassword1"
                  placeholder="Video Link"
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
                ' Create Event'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
