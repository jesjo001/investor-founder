import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Pagination,
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
import { getAllInvestors, deleteInvestor, exportInvestors } from '../../../store/actions/investorActions';
import { getSearchResult } from '../../../store/actions/searchActions';
import { isSuperAdmin } from '../../../utils/roles';

function Investors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searched, setSearched] = useState('');
  const [investors, setInvestors] = useState([]);
  const [investorId, setInvestorId] = useState('');
  const [hidePagi, setHidePagi] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(false);

  const toggleDeleteModal = id => {
    setDeleteModal(!deleteModal);
  };

  const dispatch = useDispatch();

  // access store to get appropriate data and store in the variable
  // NB: data gotten from store ends with _store for readability
  const search_result_store = useSelector(state => state.search.searchResults);
  const search_data = search_result_store.data;
  const total_search_records = search_result_store.count;

  const investors_store = useSelector(state => state.investor.investors);
  const investors_export = useSelector(state => state.investor.investorsExport);
  const investor_data = investors_store.investors;
  const total_records = investors_store.count;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchAllInvestors();
    exportAllInvestors();
  }, [currentPage]);

  // This use effect hook stores the data gotten from
  // the store in the appropriate state when the data arrives
  useEffect(() => {
    if (!searched.length) {
      setHidePagi(false);
      setTotalRecords(total_records);
      return setInvestors(investor_data);
    }
    setHidePagi(true);
    setInvestors(search_data);
    setTotalRecords(total_search_records);
  }, [investor_data, search_data]);

  //Pagination config
  useEffect(() => {
    var total_pages = Math.ceil(totalRecords / limit);
    setTotalPages(total_pages);
  }, [totalRecords]);

  const fileName = 'investors';
  const exportType = 'xls';

  const exportToExcel = () => {
    exportFromJSON({ data: investors_export.investors, fileName, exportType });
  };

  const handleSearch = () => {
    if (searched.length) {
      return fetchSearchResults();
    }
    fetchAllInvestors();
  };

  const handleReset = () => {
    setSearched('');
    fetchAllInvestors();
  };

  const fetchAllInvestors = async () => {
    setLoadingData(true);
    setErrorMessage(false);
    try {
      await dispatch(getAllInvestors(currentPage, limit));
      setLoadingData(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoadingData(false);
      setErrorMessage(err);
    }
  };

  const exportAllInvestors = async () => {
    setLoadingData(true);
    setErrorMessage(false);
    try {
      await dispatch(exportInvestors());
      setLoadingData(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoadingData(false);
      setErrorMessage(err);
    }
  };

  const fetchSearchResults = async () => {
    setLoadingData(true);
    setErrorMessage(false);
    try {
      await dispatch(getSearchResult('investors', searched, 1, ''));
      setLoadingData(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoadingData(false);
      setErrorMessage(err);
    }
  };

  const handleDeleteInvestor = async () => {
    setLoadingDelete(true);
    setDeleteErrorMessage(false);
    try {
      await dispatch(deleteInvestor(investorId));
      toggleDeleteModal();
      await fetchAllInvestors();
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
    <div className="pagi_wrapper">
      <div className="pagi_show">
        <p>
          Showing {limit * currentPage - limit + 1} -{' '}
          {limit * currentPage > totalRecords ? totalRecords : limit * currentPage} of {totalRecords} record(s)
        </p>
      </div>
      <div>
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
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader title="Investors" />
      {loadingData ? (
        <Loader type="bars" />
      ) : (
        <Card className="card-class">
          <CardBody>
            <div className="pull-left">
              <h4>{totalRecords} record(s)</h4>
            </div>

            {/* Search for Investors */}
            <div className="pull-right d-flex">
              <SearchBox value={searched} onChange={e => setSearched(e.target.value)} onClickBtn={handleSearch} />
              <Button onClick={handleReset} id="searchBtn" className="d-none d-sm-block search-btn ml-1">
                <i className="fa fa-repeat" />
              </Button>
            </div>
            <div className="pull-right mr-5">
            {isSuperAdmin() && (
              <Button onClick={exportToExcel} color="" size="sm" className="text-white bg-gradient">
                Export Investors
              </Button>
            )}
            </div>
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}

            <>
              {/* Investors Table */}
              <table id="founders_table" className="table sixth-col table-hover table-custom">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Investor Name</th>
                    <th>Investor Email</th>
                    <th>Industry</th>
                    <th>Action</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {investors &&
                    investors.map((investor, i) => (
                      <tr key={investor._id}>
                        <td>{i + 1}</td>
                        <td>
                          <Link className="primary-color-text" to={`/investor/view/${investor._id}`}>
                            {investor.name}
                          </Link>
                        </td>
                        <td>{investor.email}</td>
                        <td>{investor.industryType}</td>
                        <td>
                          <div className="btn-group">
                            <Button data-toggle="dropdown" className="dropdown-toggle">
                              Action
                            </Button>
                            <div className="dropdown-menu">
                              <UncontrolledDropdown>
                                <DropdownItem>
                                  <Link className="primary-color-text" to={`/investor/view/${investor._id}`}>
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
                                        onClick={() => {
                                          toggleDeleteModal();
                                          setInvestorId(investor._id);
                                        }}
                                      >
                                        Delete
                                      </Link>
                                    </DropdownItem>
                                  </>
                                )}
                              </UncontrolledDropdown>
                            </div>
                          </div>
                        </td>
                        <td>{moment(investor.createdAt).format('LL')}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {!hidePagi && <div className="pull-right">{paginationView}</div>}
            </>
          </CardBody>
        </Card>
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

export default withRouter(Investors);
