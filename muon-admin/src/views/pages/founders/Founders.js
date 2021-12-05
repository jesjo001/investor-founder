import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import exportFromJSON from 'export-from-json';

import { Loader } from '../../../vibe';
import SearchBox from '../../elements/SearchBox';
import PageHeader from '../../elements/PageHeader';
import { getFounder, getUnapprovedFounder, approveFounder, exportFounders } from '../../../store/actions/founderAction';
import { getSearchResult } from '../../../store/actions/searchActions';
import { isSuperAdmin } from '../../../utils/roles';

function Founders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searched, setSearched] = useState('');
  const [limit, setLimit] = useState(10);
  const [founders, setFounders] = useState([]);
  const [count, setCount] = useState(0);
  const [founderId, setFounderId] = useState('');
  const [hidePagi, setHidePagi] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);

  const toggleDeleteModal = id => setDeleteModal(!deleteModal);
  const dispatch = useDispatch();

  const search_result_store = useSelector(state => state.search.searchResults);
  const search_data = search_result_store.data;
  const store = useSelector(state => state.founder.founders);
  const founders_export = useSelector(state => state.founder.foundersExport);
  console.log(store)

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllFounders();
    exportAllFounders();
  }, [currentPage]);

  useEffect(() => {
    if (!searched.length) {
      setHidePagi(false);
      setFounders(store.founders);
      setCount(store.count);
      return;
    }
    setHidePagi(true);
    setFounders(search_data);
  }, [store, search_data]);

  const handleReset = () => {
    setSearched('');
    fetchAllFounders();
  };

  const exportAllFounders = async () => {
    setLoadingData(true);
    setErrorMessage(false);
    try {
      await dispatch(exportFounders());
      setLoadingData(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoadingData(false);
      setErrorMessage(err);
    }
  };

  const fileName = 'founders';
  const exportType = 'xls';

  const exportToExcel = () => {
    exportFromJSON({ data: founders_export.founders, fileName, exportType });
  };

  const handleDeleteClick = async () => {
    $('.close').click();
  };

  const handleSearch = () => {
    if (searched.length) {
      return fetchSearchResults();
    }
    fetchAllFounders();
  };

  const fetchAllFounders = async () => {
    setLoadingData(true);
    setErrorMessage(false);
    try {
      await dispatch(getFounder(currentPage, limit));
      setLoadingData(false);
    } catch (e) {
      const err = e.response.data.message;
      console.log('error is ', e.response.data.message);
      setLoadingData(false);
      setErrorMessage(err);
    }
  };

  const fetchSearchResults = async () => {
    setLoadingData(true);
    setErrorMessage(false);
    console.log('cp:', currentPage);
    try {
      await dispatch(getSearchResult('founders', searched, 1, ''));
      setLoadingData(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoadingData(false);
      setErrorMessage(err);
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
      <PageHeader title="Founders" />
      {loadingData ? (
        <Loader type="bars" />
      ) : (
        <Card className="card-class">
          <CardBody>
            <div className="pull-left">
              <h4>{count} record(s)</h4>
            </div>
            {/* Search for Founders */}
            <div className="pull-right d-flex">
              <SearchBox value={searched} onChange={e => setSearched(e.target.value)} onClickBtn={handleSearch} />
              <Button onClick={handleReset} id="searchBtn" className="d-none d-sm-block search-btn ml-1">
                <i className="fa fa-repeat" />
              </Button>
            </div>
            <div className="pull-right mr-5">
              {isSuperAdmin() && (
              <Button onClick={exportToExcel} color="" size="sm" className="text-white bg-gradient">
                Export Founders
              </Button>
              )}
            </div>
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
            <>
              {/* Founders Table */}
              <table id="founders_table" className="table sixth-col table-hover table-custom">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Founder Name</th>
                    <th>Founder Email</th>
                    <th>Ticket Size</th>
                    <th>Year Founded</th>
                    {/* <th>Stage</th> */}
                    <th>Paid Plan</th>
                    <th>Action</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {founders &&
                    founders.map((founder, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <Link
                            className="primary-color-text"
                            to={{ pathname: `/founder/view/${founder._id}`, state: { data: founder } }}
                          >
                            {founder.name}
                          </Link>
                        </td>
                        <td>{founder.email}</td>
                        <td>{founder.ticketToRaise}</td>
                        <td>{moment(founder.established).format('MMM-YYYY')}</td>
                        {/* <td>{founder.stage}</td> */}
                        <td>{founder.planName.length ? founder.planName : 'None'}</td>
                        <td>
                          <div className="btn-group">
                            <Button data-toggle="dropdown" className="dropdown-toggle">
                              Action
                            </Button>
                            <div className="dropdown-menu">
                              <DropdownItem>
                                <Link
                                  className="primary-color-text"
                                  to={{ pathname: `/founder/view/${founder._id}`, state: { data: founder } }}
                                >
                                  View
                                </Link>
                              </DropdownItem>
                              {isSuperAdmin() && (
                                <>
                                  {' '}
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <Link
                                      className="text-danger"
                                      to="#"
                                      type="button"
                                      data-toggle="modal"
                                      data-target="#exampleModal22"
                                      onClick={() => {
                                        toggleDeleteModal();
                                        setFounderId(founder._id);
                                      }}
                                    >
                                      Delete
                                    </Link>
                                  </DropdownItem>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{moment(founder.createdAt).format('LLLL')}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {!hidePagi && <div className="pull-right">{paginationView}</div>}
            </>
          </CardBody>
        </Card>
      )}

      {/* Modal to handle deleting of a founder */}
      <Modal className="modal-pos" isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader className="primary-color-text" toggle={toggleDeleteModal}>
          Delete
        </ModalHeader>
        <ModalBody>
          <h5>Are you sure you want to delete this record?</h5>
          <h6>This action cannot be undone.</h6>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button color="#" onClick={toggleDeleteModal}>
            Cancel
          </Button>

          <Button color="#" className="text-danger" onClick={toggleDeleteModal}>
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

export default withRouter(Founders);
