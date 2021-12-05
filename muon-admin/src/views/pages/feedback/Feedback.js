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
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';

import { Loader } from '../../../vibe';
import SearchBox from '../../elements/SearchBox';
import PageHeader from '../../elements/PageHeader';

function Feedback() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(30);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searched, setSearched] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <PageHeader title="Feedback" />
      {loadingData ? (
        <Loader type="bars" />
      ) : (
        <Card className="card-class">
          <CardBody className="view-table-wrapper">
            <div className="pull-left">
              <h3 className="primary-color-text">Total: 100 Record(s)</h3>
            </div>
            <br />
            <br />
            <div className="pull-left">
              {/* Tab navigation Buttons to switch between Founder and Investor Feedback Tables */}
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
            {/* Search for founder/investor Feedback by category */}
            <div className="pull-right">
              <SearchBox
                id="search"
                type="text"
                className="form-control mr-sm-1 searchbox"
                value={searched}
                onChange={e => setSearched(e.target.value)}
                placeholder="Search by keywords"
                onClickBtn={() => console.log(searched)}
              />
            </div>

            <>
              <div className="tab-content" id="pills-tabContent">
                {/* Table for Founder Feedback */}
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
                        <th>Feedback 1</th>
                        <th>Feedback 2</th>
                        <th>Feedback 3</th>
                        <th>Date Posted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(5)].map((n, i) => (
                        <tr key-={i}>
                          <td>{i + 1}</td>
                          <td>This is the first founder feedback</td>
                          <td>This is the second founder feedback </td>
                          <td>This is the third founder feedback </td>
                          <td>Wednesday, August 18, 2021</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table for Investor Feedback */}
                <div className="tab-pane fade " id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                  <table id="founders_table" className="table seventh-col table-hover table-custom">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Feedback 1</th>
                        <th>Feedback 2</th>
                        <th>Feedback 3</th>
                        <th>Date Posted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(5)].map((n, i) => (
                        <tr key-={i}>
                          <td>{i + 1}</td>
                          <td>This is the first investor feedback</td>
                          <td>This is the second investor feedback </td>
                          <td>This is the third investor feedback </td>
                          <td>Wednesday, August 18, 2021</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pull-left">
                <Link to="/feedback/all">
                  <Button onClick={() => {}} color="" size="sm" className="text-white bg-gradient">
                    Back to Feedback Table
                  </Button>
                </Link>
              </div>
              <div className="pull-right">{paginationView}</div>
            </>
          </CardBody>
        </Card>
      )}

      {/* Modal to handle deleting of a feedback */}
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

export default withRouter(Feedback);
