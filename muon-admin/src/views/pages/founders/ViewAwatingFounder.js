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
import { isSuperAdmin } from '../../../utils/roles';
import { approveFounder,  denyPendingFounder } from '../../../store/actions/founderAction';

function ViewAwaitingFounder(props) {
  const location = useLocation();
  const dispatch = useDispatch();

  console.log('Location is', location);
  const { data } = location.state;
  const history = useHistory();
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDeny, setLoadingDeny] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [error, setError] = useState(false);
  const [approved, setApproved] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  // const [unapprovedFounder, setUnapprovedFounder] = useState(data);
  const store = useSelector(state => state.founder.approve);
  console.log('store', store);

  useEffect(() => {
    setApproved(store);
    if (store.status == 200) {
      showMessage('Sucess: ', 'Founder Approved');
    }
  }, [store]);

  const toggle = () => setModal(!modal);

  const approveJoinRequest = async id => {
    // console.log(id)
    setLoadingData(true);
    setLoadingApprove(true)
    try {
      await dispatch(approveFounder(id));
      showMessage("success", `Founder has been approved successfully`)
      setLoadingData(false);
    } catch (err) {
      console.log(error.response.data.message)
      showMessage("err", `${error.response.data.message}`)

    }
    history.goBack();
    setLoadingData(false);
    setLoadingApprove(false)
    toggle();
  };

  const denyPending =  async (id) => {
    setLoadingDeny(true)
    setLoadingData(true)

    try {
      await dispatch(denyPendingFounder(id))
      showMessage("success", `Founder has been denied access`)
      setLoadingData(false)
    } catch (err) {
      console.log(error.response.data.message)
      showMessage("err", `${error.response.data.message}`)

    }
    history.goBack()
    setLoadingDeny(false)
    toggle()
  }

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
                <p htmlFor="exampleInputEmail1"> {data.fullName}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Founders Email</label>
                <p htmlFor="exampleInputEmail1">{data.email}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">About Us</label>
                <p htmlFor="exampleInputEmail1">{data.aboutUs}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold">Ticket Size</label>
                <p htmlFor="exampleInputEmail1">${data.amountToRaise}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Year Founded</label>
                <p htmlFor="exampleInputEmail1">{moment(data.established).format("MMM-YYYY")}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Website</label>
                <p htmlFor="exampleInputEmail1">{data.website}</p>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label className="fw-bold">Stage</label>
                <p htmlFor="exampleInputEmail1">{data.companyStage} </p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Paid Plan</label>
                <p htmlFor="exampleInputEmail1">{data.plan ? data.plan : 'No'}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Company Email</label>
                <p htmlFor="exampleInputEmail1">{data.companyEmail}</p>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label className="fw-bold">Company Address</label>
                <p htmlFor="exampleInputEmail1">{data.companyAddress} </p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">No of Co Founder</label>
                <p htmlFor="exampleInputEmail1">{data.numOfCoFounders}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Industry Type</label>
                <p htmlFor="exampleInputEmail1">{data.industryType}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold">Problem Statement</label>
                <p htmlFor="exampleInputEmail1">{data.problemStatement} </p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Company Solution</label>
                <p htmlFor="exampleInputEmail1">{data.companySolution}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Why Our Company</label>
                <p htmlFor="exampleInputEmail1">{data.whyOurCompany}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold">Amount Raised</label>
                <p htmlFor="exampleInputEmail1">{data.amountRaised}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Made Profit</label>
                <p htmlFor="exampleInputEmail1">{data.madeProfit} </p>
              </Col>

              <Col md={4}>
                <label className="fw-bold">Fund Allocation</label>
                <p htmlFor="exampleInputEmail1">{data.fundAllocation}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold">Milestones</label>
                <p htmlFor="exampleInputEmail1">{data.milestones} </p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Approved</label>
                <p htmlFor="exampleInputEmail1">{data.isApproved ? 'Approved' : 'Not Approved'}</p>
              </Col>
              <Col md={4}>
                <label className="fw-bold">Pitch Deck Link</label>
                <p htmlFor="exampleInputEmail1">{data.pitchDeckLink}</p>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label className="fw-bold">Hou did you hear about us?</label>
                <p htmlFor="exampleInputEmail1">{data.source ? data.source : 'N/A'}</p>
              </Col>
            </Row>

            {
              isSuperAdmin() && (
              <div className="pull-left mt-5">

              <Button
                color=""
                data-toggle="modal"
                data-target="#exampleModalAddBus"
                onClick={toggle}
                className=" pl-2 btn-sm btn bg-gradient text-white mr-2"
              >
                Approve Join Request
                <span className="fa fa-check text-white m-auto" />
              </Button>
              <Button color="" onClick={() => denyPending(data._id)} className=" pl-2 btn btn-sm bg-danger text-white">
              {loadingDeny ? (
                <span
                  style={{ width: 25, height: 25 }}
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                ) : (
                  'Deny Join Request'
                )
              }
              </Button>
            </div>)
            }
          </Col>
          <Modal isOpen={modal} toggle={toggle} backdrop="static" keyboard={keyboard} centered={true}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>Are you sure you want to Approve this {data.fullName}</ModalBody>
            <ModalFooter>
            <Button color="danger" onClick={() => approveJoinRequest(data._id)}>
              {loadingApprove ? (
                <span
                  style={{ width: 25, height: 25 }}
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                ) : (
                  'Approve'
                )
              }

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
