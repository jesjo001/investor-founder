import React, { useState, useLayoutEffect, useEffect } from 'react';
import { withRouter, Link, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, Button } from 'reactstrap';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loader } from '../../../vibe';
import { getAllUsers, deleteUser } from '../../../store/actions/userActions';

function ViewUser(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const dispatch = useDispatch();
  const { id } = useParams();

  // access store to get appropriate data and store in the variable
  // NB: data gotten from store ends with _store for readability
  const users_store = useSelector(state => state.user.users);
  const user_data = users_store.getAllAdmin;

  useEffect(() => {
    const userData = users && users.find(user => user._id === id);
    setUser(userData);
    console.log(1, users);
  }, [id, users]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchAllUsers();
  }, []);

  // This use effect hook stores the data gotten from
  // the store in the appropriate state when the data arrives
  useEffect(() => {
    setUsers(user_data);
  }, [user_data]);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      await dispatch(getAllUsers());
      setLoading(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoading(false);
      setError(err);
    }
  };

  const handleDeleteUser = async () => {
    setLoadingDelete(true);
    setDeleteErrorMessage(false);
    try {
      await dispatch(deleteUser(id));
      toggleDeleteModal();
      props.history.push('/admin/users/all');
      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
      setDeleteErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader type="bars" />
      ) : (
        user && (
          <Card>
            <div className="view-header-wrapper">
              <div className="pull-left">
                <h2 className="primary-color-text"> User Details </h2>
              </div>
              <div className="pull-right">
                <Button color="" onClick={toggleDeleteModal} className=" pl-2 btn btn-sm bg-danger text-white">
                  Delete <span className="fa fa-trash text-white m-auto" />
                </Button>
              </div>
            </div>
            <Col className="col-md-12 view-body-wrapper">
              <label className="fw-bold">
                Date Created: <span className="text-dark fw-100">{moment(user.createdAt).format('LLLL')}</span>
              </label>
              <br />
              <label className="fw-bold">
                Date Modified: <span className="text-dark fw-100">{moment(user.updatedAt).format('LLLL')}</span>
              </label>
              <br />
              <br />
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <Row>
                <Col md={4}>
                  <label className="fw-bold">Full Name</label>
                  <p htmlFor="exampleInputEmail1">{user.fullName}</p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold"> Email</label>
                  <p htmlFor="exampleInputEmail1">{user.email}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <label className="fw-bold">Phone Number</label>
                  <p className="capitalize" htmlFor="exampleInputEmail1">
                    {user.phone}
                  </p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold">Department</label>
                  <p htmlFor="exampleInputEmail1">{user.department}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <label className="fw-bold">Role</label>
                  <p htmlFor="exampleInputEmail1">{user.role}</p>
                </Col>
              </Row>

              <br />
              <Link to="/admin/users/all">
                <Button color="" size="sm" className="text-white bg-gradient">
                  Back to users
                </Button>
              </Link>
            </Col>
          </Card>
        )
      )}
      {/* Modal to handle deleting of an investor */}
      <Modal className="modal-pos" isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader className="text-danger" toggle={toggleDeleteModal}>
          Delete
        </ModalHeader>
        {deleteErrorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {deleteErrorMessage}
          </div>
        )}
        <ModalBody>
          <h5>Are you sure you want to delete this record?</h5>
          <h6>This action cannot be undone.</h6>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button color="#" onClick={toggleDeleteModal}>
            Cancel
          </Button>

          <Button color="#" className="text-danger" onClick={handleDeleteUser}>
            {loadingDelete ? (
              <span
                style={{ width: 25, height: 25 }}
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Delete'
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default withRouter(ViewUser);
