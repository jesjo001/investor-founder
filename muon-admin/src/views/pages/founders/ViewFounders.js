import React, { useState, useEffect } from 'react';
import { toastr } from 'react-redux-toastr';
import { withRouter, Link, useLocation, useHistory } from 'react-router-dom';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  Col,
  Row,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loader } from '../../../vibe';
import SearchBox from '../../elements/SearchBox';

import { approveFounder } from '../../../store/actions/founderAction';
import { isSuperAdmin } from '../../../utils/roles';
import { deleteFounder } from '../../../store/actions/founderAction';

function ViewAwaitingFounder(props) {
  const location = useLocation();
  const dispatch = useDispatch();

  // console.log("Location is", location)
  const { data } = location.state;
  const history = useHistory();
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(false);
  const [approved, setApproved] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modal, setModal] = useState(false);
  const [keyboard, setKeyboard] = useState(true);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  // const [unapprovedFounder, setUnapprovedFounder] = useState(data);
  const store = useSelector(state => state.founder.approve);
  // console.log("store", store)

  useEffect(() => {
    setApproved(store);
    if (store.status == 200) {
      showMessage('Sucess: ', 'Founder Approved');
    }
  }, [store]);

  const toggle = () => setModal(!modal);

  const deleteFounderData = async id => {
    setLoadingDelete(true);
    setDeleteErrorMessage(false);
    setLoadingData(true);

    try {
      await dispatch(deleteFounder(id));
      showMessage('success', `Founder has been approved successfully`);
      setLoadingData(false);
    } catch (err) {
      setLoadingDelete(false);
      console.log(error.response.data.message);
      setDeleteErrorMessage(error.response.data.message);
      showMessage('err', `${error.response.data.message}`);
      
    }
    history.goBack();
    toggle();
  };

  const showMessage = (type, message) => {
    if (type === 'err') toastr.error('Error ', `${message}`);
    else toastr.success(`${type}`, `${message}`);
  };

  return (
    <div>
      {!data && !loadingData ? (
        <Loader type="bars" />
      ) : (
        <Card>
          <div className="view-header-wrapper">
            <div className="pull-left">
              <h2 className="primary-color-text">{data.startUpName}</h2>
            </div>
            {isSuperAdmin() && (
              <div className="pull-right mt-5">
                <Button color="" onClick={toggle} className=" pl-2 btn btn-sm bg-danger text-white">
                  Delete Founder
                  <span className="fa fa-times text-white m-auto" />
                </Button>
              </div>
            )}
          </div>
          <Col className="col-md-12 view-body-wrapper">
            <label className="fw-bold">
              Date Created: <span className="text-dark fw-100">{data.createdAt}</span>
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
                <label className="fw-bold">Founders Name</label>
                <p htmlFor="exampleInputEmail1"> {data.name}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Founders Email</label>
                <p htmlFor="exampleInputEmail1">{data.email}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Cool Info</label>
                <p htmlFor="exampleInputEmail1">{data.coolInfo}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold">Start UP Name</label>
                <p htmlFor="exampleInputEmail1">{data.startupName}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Year Founded</label>
                <p htmlFor="exampleInputEmail1">{moment(data.established).format("MMM-YYYY")}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Deck Link</label>
                <p htmlFor="exampleInputEmail1">{data.deckLink}</p>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label className="fw-bold">Stage</label>
                <p htmlFor="exampleInputEmail1">{data.stage} </p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Paid Plan</label>
                <p htmlFor="exampleInputEmail1">{data.plan ? data.plan : 'No'}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Expertise</label>
                <p htmlFor="exampleInputEmail1">{data.expertise}</p>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label className="fw-bold">Company Address</label>
                <p htmlFor="exampleInputEmail1">{data.officeAddress} </p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">No of Co Founder</label>
                <p htmlFor="exampleInputEmail1">{data.num0fCoFounders}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Industry Type</label>
                <p htmlFor="exampleInputEmail1">{data.industryType}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold">Investor</label>
                <p htmlFor="exampleInputEmail1">{data.investor} </p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Ticket Size</label>
                <p htmlFor="exampleInputEmail1">${data.ticketToRaise}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Pitch Deck Link</label>
                <p htmlFor="exampleInputEmail1">{data.pitchDeckLink}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold">Co Founder</label>
                <p htmlFor="exampleInputEmail1">{data.cofounder}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Ticket Raised</label>
                <p htmlFor="exampleInputEmail1">{data.ticketRaised} </p>
              </Col>

              <Col md={4}>
                <label className="fw-bold">Start UP Country</label>
                <p htmlFor="exampleInputEmail1">{data.startupCountry}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold"> </label>
                <p htmlFor="exampleInputEmail1"></p>
              </Col>
              <Col md={4}>
                <label className="fw-bold"></label>
                <p htmlFor="exampleInputEmail1"></p>
              </Col>
              <Col md={4}>
                <label className="fw-bold"></label>
                <p htmlFor="exampleInputEmail1"></p>
              </Col>
            </Row>
          </Col>
          <Modal isOpen={modal} toggle={toggle} backdrop="static" keyboard={keyboard} centered={true}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>Are you sure you want to Approve this {data.fullName}</ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => deleteFounder(data._id)}>
                Delete
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
              <Button color="danger" onClick={() => deleteFounderData(data._id)}>
                Delete
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Card>
      )}
    </div>
  );
}

export default withRouter(ViewAwaitingFounder);
