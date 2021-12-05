import React, { useState, useLayoutEffect, useEffect } from 'react';
import { withRouter, Link, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, Button } from 'reactstrap';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loader } from '../../../vibe';
import { getAllInvestors, deleteInvestor } from '../../../store/actions/investorActions';
import { isSuperAdmin } from '../../../utils/roles';

function ViewInvestor(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [investors, setInvestors] = useState([]);
  const [investor, setInvestor] = useState({});

  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const dispatch = useDispatch();
  const { id } = useParams();

  // access store to get appropriate data and store in the variable
  // NB: data gotten from store ends with _store for readability
  const investors_store = useSelector(state => state.investor.investors);
  const investor_data = investors_store.investors;

  useEffect(() => {
    const investorData = investors && investors.find(investor => investor._id === id);
    setInvestor(investorData);
  }, [id, investors]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchAllInvestors();
  }, []);

  // This use effect hook stores the data gotten from
  // the store in the appropriate state when the data arrives
  useEffect(() => {
    setInvestors(investor_data);
  }, [investor_data]);

  const fetchAllInvestors = async () => {
    setLoading(true);
    try {
      await dispatch(getAllInvestors());
      setLoading(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoading(false);
      setError(err);
    }
  };

  const handleDeleteInvestor = async () => {
    setLoadingDelete(true);
    setDeleteErrorMessage(false);
    try {
      await dispatch(deleteInvestor(id));
      toggleDeleteModal();
      props.history.push('/investors/all');
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
        investor && (
          <Card>
            <div className="view-header-wrapper">
              <div className="pull-left">
                <h2 className="primary-color-text"> Investor Details </h2>
              </div>
              {isSuperAdmin() && (
                <div className="pull-right">
                  <Button color="" onClick={toggleDeleteModal} className=" pl-2 btn btn-sm bg-danger text-white">
                    Delete <span className="fa fa-trash text-white m-auto" />
                  </Button>
                </div>
              )}
            </div>
            <Col className="col-md-12 view-body-wrapper">
              <label className="fw-bold">
                Date Created: <span className="text-dark fw-100">{moment(investor.createdAt).format('LLLL')}</span>
              </label>
              <br />
              <label className="fw-bold">
                Date Modified: <span className="text-dark fw-100">{moment(investor.updatedAt).format('LLLL')}</span>
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
                  <label className="fw-bold">Investor Name</label>
                  <p htmlFor="exampleInputEmail1">{investor.name}</p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold">Investor Email</label>
                  <p htmlFor="exampleInputEmail1">{investor.email}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <label className="fw-bold">Investor Type</label>
                  <p className="capitalize" htmlFor="exampleInputEmail1">
                    {investor.type}
                  </p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold">Expertise</label>
                  <p htmlFor="exampleInputEmail1">{investor.expertise}</p>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <label className="fw-bold">Personal Information</label>
                  <p htmlFor="exampleInputEmail1">{investor.personal}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <label className="fw-bold">Invests In</label>
                  <p htmlFor="exampleInputEmail1">{investor.investedIn}</p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold">Ticket Size</label>
                  <p htmlFor="exampleInputEmail1">{investor.ticketSize}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <label className="fw-bold">Stage</label>
                  <p htmlFor="exampleInputEmail1">{investor.stage}</p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold">Industry Type</label>
                  <p htmlFor="exampleInputEmail1">{investor.industryType}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <label className="fw-bold">Industry Location</label>
                  <p htmlFor="exampleInputEmail1">{investor.industryLocation}</p>
                </Col>
              </Row>
              <br />
              <Link to="/investors/all">
                <Button color="" size="sm" className="text-white bg-gradient">
                  Back to Investors
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

          <Button color="#" className="text-danger" onClick={handleDeleteInvestor}>
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

export default withRouter(ViewInvestor);
