import React, { useState, useEffect } from 'react';
import { toastr } from 'react-redux-toastr';
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
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loader } from '../../../vibe';
import SearchBox from '../../elements/SearchBox';
import PageHeader from '../../elements/PageHeader';
import { getUnapprovedFounder } from '../../../store/actions/founderAction';
import ViewAwatingFounder from './ViewAwatingFounder';
import { getSearchResult } from '../../../store/actions/searchActions';

function AwaitingApproval() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searched, setSearched] = useState('');
  const [limit, setLimit] = useState(10);
  const [unapprovedFounders, setUnapprovedFounders] = useState([]);
  const [count, setCount] = useState(0);
  const [founderId, setFounderId] = useState('');
  const [hidePagi, setHidePagi] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const dispatch = useDispatch();

  const search_result_store = useSelector(state => state.search.searchResults);
  const search_data = search_result_store.data;
  const store = useSelector(state => state.founder.unapproved);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUnapprovedFounders();
  }, [currentPage]);

  useEffect(() => {
    if (!searched.length) {
      setHidePagi(false);
      setUnapprovedFounders(store.pendingFounders);
      setCount(store.count);
      return;
    }
    setHidePagi(true);
    setUnapprovedFounders(search_data);
  }, [store, search_data]);

  const handleSearch = () => {
    if (searched.length) {
      return fetchSearchResults();
    }
    fetchUnapprovedFounders();
  };

  const handleDeleteClick = async () => {
    $('.close').click();
  };

  const fetchUnapprovedFounders = async () => {
    setLoadingData(true);
    setErrorMessage(false);
    try {
      await dispatch(getUnapprovedFounder(currentPage, limit));
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
      await dispatch(getSearchResult('unapprovedFounders', searched, 1, ''));
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
      <PageHeader title="Founders Awaiting Approval" />
      {loadingData ? (
        <Loader type="bars" />
      ) : (
        <Card className="card-class">
          <CardBody>
            <div className="pull-left">
              <h4>{count} record(s)</h4>
            </div>
            <div className="pull-right">
              {/* search for awaiting founders*/}
              <SearchBox value={searched} onChange={e => setSearched(e.target.value)} onClickBtn={handleSearch} />
            </div>

            <>
              {/* Awaiting Founder's table */}
              <table id="founders_table" className="table sixth-col table-hover table-custom">
                <thead>
                  <tr>
                    <th>#</th>
                    <th> Name</th>
                    <th> Email</th>
                    <th>Year Founded</th>
                    <th>Source</th>
                    <th>Stage</th>
                    <th>Action</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {unapprovedFounders &&
                    unapprovedFounders.map((founder, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <Link
                            className="primary-color-text"
                            to={{ pathname: `/founders/awaiting-approval/${founder._id}`, state: { data: founder } }}
                          >
                            {founder.fullName}
                          </Link>
                        </td>
                        <td>{founder.email}</td>
                        <td>{moment(founder.established).format('MMM-YYYY')}</td>
                        <td>{founder.source? founder.source : "N/A"}</td>
                        <td>{founder.companyStage}</td>
                        <td>
                          <div className="btn-group">
                            <Button data-toggle="dropdown" className="dropdown-toggle">
                              Action
                            </Button>
                            <div className="dropdown-menu">
                              <DropdownItem>
                                <Link
                                  className="primary-color-text"
                                  to={{ pathname: `/founders/awaiting-approval/${founder._id}`, state: { data: founder } }}
                                >
                                  View
                                </Link>
                              </DropdownItem>
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

      {/* Modal to handle deleting of a founder awaiting approval */}
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

export default withRouter(AwaitingApproval);
