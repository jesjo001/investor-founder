import React, { useState, useEffect, useLayoutEffect } from 'react';
import { withRouter, Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  Button,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import SearchBox from '../../elements/SearchBox';
import { Loader } from '../../../vibe';
import { getAllEvents, deleteEvent } from '../../../store/actions/eventActions';
import { isSuperAdmin } from '../../../utils/roles';

function ViewEvent(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(30);
  const [selectedPage, setSelectedPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState();

  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);

  const [eventShowMore, setEventShowMore] = useState(false);
  const [searched, setSearched] = useState('');

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const dispatch = useDispatch();
  const { id } = useParams();

  // access store to get appropriate data and store in the variable
  // NB: data gotten from store ends with _store for readability
  const events_store = useSelector(state => state.event.events);
  const event_data = events_store.getAllEvent;

  useEffect(() => {
    const eventData = events && events.find(event => event._id === id);
    setEvent(eventData);
  }, [id, events]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchAllEvents();
  }, []);

  // This use effect hook stores the data gotten from
  // the store in the appropriate state when the data arrives
  useEffect(() => {
    setEvents(event_data);
  }, [event_data]);

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      await dispatch(getAllEvents());
      setLoading(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoading(false);
      setError(err);
    }
  };

  const handleDeleteEvents = async () => {
    setLoadingDelete(true);
    setDeleteErrorMessage(false);
    try {
      await dispatch(deleteEvent(id));
      toggleDeleteModal();
      props.history.push('/events/all');
      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
      setDeleteErrorMessage(error.response.data.message);
    }
  };

  // Pagination View,handleClick, renderpageNumbers are all part
  // of the pagination Logic, will break into a seperate
  // file once i'm working with APIs
  const paginationView = (
    <Pagination aria-label="Page navigation example">
      <PaginationLink
        disabled={currentPage === 1}
        style={{ color: currentPage === 1 ? 'lightgrey' : '#4453a8 ' }}
        previous
        onClick={() => {
          setCurrentPage(currentPage - 1);
          setSelectedPage(currentPage - 1);
        }}
      />
      {renderPageNumbers}
      <PaginationLink
        disabled={currentPage === totalPages}
        style={{ color: currentPage === totalPages ? 'lightgrey' : '#4453a8 ' }}
        next
        onClick={() => {
          setCurrentPage(currentPage + 1);
          setSelectedPage(currentPage + 1);
        }}
      />
    </Pagination>
  );

  const handleClick = event => {
    setCurrentPage(Number(event.target.id));
    setSelectedPage(Number(event.target.id));
  };

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let c = 1; c <= Math.ceil(totalPages); c++) {
    pageNumbers.push(c);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <PaginationItem key={number} style={{ color: 'red' }} active={selectedPage === number}>
        <PaginationLink
          style={{
            backgroundColor: selectedPage === number && '#4453a8 ',
            borderColor: selectedPage === number && '#4453a8 ',
            color: selectedPage === number ? '#fff' : '#4453a8 ',
          }}
          onClick={handleClick}
          id={number}
        >
          {number}
        </PaginationLink>
      </PaginationItem>
    );
  });

  return (
    <div>
      {loading ? (
        <Loader style={{ marginTop: '5%' }} type="bars" />
      ) : (
        event && (
          <Card>
            <div className="view-header-wrapper">
              <div className="pull-left">
                <h2 className="primary-color-text"> Event Details </h2>
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
                Date Created: <span className="text-dark fw-100">{moment(event.createdAt).format('LLLL')}</span>
              </label>
              <br />
              <label className="fw-bold">
                Date Modified: <span className="text-dark fw-100">{moment(event.createdAt).format('LLLL')}</span>
              </label>
              <br />
              <label className="fw-bold">
                Created By: <span className="text-dark fw-100">{event.createdBy}</span>
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
                  <label className="fw-bold">Event Name</label>
                  <p htmlFor="exampleInputEmail1">{event.name}</p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold">Location</label>
                  <p className="capitalize" htmlFor="exampleInputEmail1">
                    {event.address && `${event.address.venue}, ${event.address.state}, ${event.address.country}.`}
                  </p>
                </Col>
                <Col md={4}>
                  <label className="fw-bold">Event Category</label>
                  <p className="capitalize" htmlFor="exampleInputEmail1">
                    {event.category}
                  </p>
                </Col>
              </Row>

              {eventShowMore && (
                <>
                  <Row>
                    <Col md={12}>
                      <label className="fw-bold">Description</label>
                      <p htmlFor="exampleInputEmail1">{event.desc}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <label className="fw-bold">Event Date</label>
                      <p htmlFor="exampleInputEmail1">{`${moment(event.date.from).format('LL')} - ${moment(
                        event.date.to
                      ).format('LL')}`}</p>
                    </Col>
                    <Col md={4}>
                      <label className="fw-bold">Available Slots</label>
                      <p htmlFor="exampleInputEmail1">{event.availability}</p>
                    </Col>
                    <Col md={4}>
                      <label className="fw-bold">Remaining Slots</label>
                      <p htmlFor="exampleInputEmail1">140</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-5" md={6}>
                      <label className="fw-bold">Event Image</label>
                      <br />
                      <img src={(event.resource && event.resource.image) || 'N/A'} alt="Not Available" />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-5" md={4}>
                      <label className="fw-bold">Registration Link</label>
                      <br />
                      <a target={'_blank'} href={event.registrationLink}>
                        {event.registrationLink || 'N/A'}
                      </a>
                    </Col>
                    <Col className="mb-5" md={4}>
                      <label className="fw-bold">Video Link</label>
                      <br />
                      <a target="_blank" href={event.videoLink}>
                        {event.videoLink || 'N/A'}
                      </a>
                    </Col>
                  </Row>
                </>
              )}

              <Button
                onClick={() => setEventShowMore(!eventShowMore)}
                color=""
                size="sm"
                className="text-white bg-gradient"
              >
                {eventShowMore ? 'Show Less...' : 'Show More...'}
              </Button>
            </Col>
          </Card>
        )
      )}

      {!loading && event && (
        <Card className="card-class">
          {event.guests && event.guests.length ? (
            <CardBody className="view-table-wrapper">
              {console.log(1, Boolean(event.guests && event.guests.length))}
              <div className="pull-left">
                <h3 className="primary-color-text">Event Attendees: 5</h3>
              </div>
              <br />
              <br />
              <div className="pull-left">
                {/* Tab navigation Buttons to switch between Founder and Investor Attendee Tables */}
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item mr-2" role="presentation" onClick={() => {}}>
                    <Button
                      className="text-white bg-gradient pills-class nav-link active"
                      id="pills-home-tab"
                      size="sm"
                      data-toggle="pill"
                      href="#pills-home"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                      color=""
                    >
                      Founders
                    </Button>
                  </li>

                  <li className="nav-item" role="presentation" onClick={() => {}}>
                    <Button
                      className="pills-class nav-link"
                      id="pills-profile-tab"
                      data-toggle="pill"
                      href="#pills-profile"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                      size="sm"
                      color=""
                    >
                      Investors
                    </Button>
                  </li>
                </ul>
              </div>
              {/* Search for founder/investor Attendees */}
              <div className="pull-right">
                <SearchBox
                  id="search"
                  type="text"
                  className="form-control mr-sm-1 searchbox"
                  value={searched}
                  onChange={e => setSearched(e.target.value)}
                  placeholder="Search by email"
                  onClickBtn={() => console.log(searched)}
                />
              </div>

              <>
                <div className="tab-content" id="pills-tabContent">
                  {/* Table for Founder Attendees */}
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table id="founders_table" className="table seventh-col table-hover table-custom">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Fullname</th>
                          <th>Email</th>
                          <th>Date Registered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(5)].map((n, i) => (
                          <tr key-={i}>
                            <td>{i + 1}</td>
                            <td>
                              <Link className="primary-color-text" to="#">
                                Founders Event 123
                              </Link>
                            </td>
                            <td>foundersevent@gmail.com</td>
                            <td>Monday, July 18, 2021</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table for Investor Attendees */}
                  <div
                    className="tab-pane fade "
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <table id="founders_table" className="table seventh-col table-hover table-custom">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Fullname</th>
                          <th>Email</th>
                          <th>Date Registered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(5)].map((n, i) => (
                          <tr key-={i}>
                            <td>{i + 1}</td>
                            <td>
                              <Link className="primary-color-text" to="#">
                                Investors Event 123
                              </Link>
                            </td>
                            <td>investorsevent@gmail.com</td>
                            <td>Monday, July 18, 2021</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pull-left">
                  <Link to="/events/all">
                    <Button onClick={() => {}} color="" size="sm" className="text-white bg-gradient">
                      Back to Events
                    </Button>
                  </Link>
                </div>
                <div className="pull-right">{paginationView}</div>
              </>
            </CardBody>
          ) : (
            <Row>
              <Col md={12} className="text-center">
                <h5>No Participants have registered for this event.</h5>
              </Col>
            </Row>
          )}
        </Card>
      )}

      {/* Modal to handle deleting of an event */}
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

          <Button color="#" className="text-danger" onClick={handleDeleteEvents}>
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

export default withRouter(ViewEvent);
