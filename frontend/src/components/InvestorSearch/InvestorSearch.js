import React, { useState, useEffect, useContext } from 'react';
import './investorSearch.css';
import person from '../../assets/images/samplePerson.png';
import avatar from '../../assets/images/man.svg';
import { InviteModal } from '../index';
import useUserSearchQuery from '../../queries/userSearch';
import { useMutation, useQueryClient } from 'react-query';
import createConversationMutation from '../../mutations/createConversation';
import { AlertContext } from '../../context/alert';
import { useHistory } from 'react-router-dom';

const InvestorSearch = ({ filters }) => {
  const { setOn, setAlertContent } = useContext(AlertContext);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useState({
    ...filters,
    name: searchQuery,
  });
  const history = useHistory();
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useUserSearchQuery([
    'userSearch',
    searchQuery,
  ]);
  const { mutate } = useMutation(createConversationMutation, {
    onError: (error) => {
      console.error(error.response.data);
      console.error(error.response.status);
      setAlertContent({
        title: 'Error!',
        message:
          error?.response?.data?.message ?? 'Could not create conversation',
        success: false,
      });
      setOn(true);
      // alert("Could not create conversation");
    },
    onSuccess: (data) => {
      if (!data && localStorage.getItem('role') === 'Founder') {
        setAlertContent({
          title: 'Success!',
          message: data?.message || 'You currently do not have an active plan',
          success: false,
        });
        setOn(true);
        history.push('/pricing');
      } else {
        setAlertContent({
          title: 'Success!',
          message: data?.data?.message || 'Conversation Created',
          success: true,
        });
        setOn(true);
        queryClient.invalidateQueries(['messages']);
      }
    },
  });

  useEffect(() => {
    setSearching(true);
    if (!isLoading || !isError) {
      setSearchResult(data);
      setSearching(false);
    }
  }, [isLoading, isError, data]);

  const handleQuery = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="muon-search-wrap">
      <input
        type="search"
        className="muon-search"
        placeholder="Search for investors"
        onChange={handleQuery}
      />

      <section className="muon-search-result">
        <InviteModal />
        {searchQuery?.length >= 1 && searchResult?.length > 0 && !searching
          ? searchResult.map((result, i) => {
              return (
                <div className="muon-searched-investor" key={`${result}${i}`}>
                  <section className="d-flex align-items-center">
                    <img src={person} alt="person" />
                    <div>
                      <div className="d-flex align-items-center muon-result-name-label">
                        <span className="muon-result-name">{result.name}</span>
                        <div className="muon-person-label">
                          <p>Fintech</p>
                        </div>
                      </div>
                      <p className="muon-result-desc">{result.email}</p>
                    </div>
                  </section>

                  <div>
                    <button
                      className="muon-send-btn"
                      // data-toggle="modal"
                      // data-target="#inviteModal"
                      onClick={(e) => {
                        e.preventDefault();
                        mutate({ email: result.email });
                      }}
                    >
                      <span>
                        <p>Create Conversation</p>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          : !searching &&
            searchQuery?.length > 3 && (
              <section className="muon-no-result d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="muon-no-result-avatar">
                    <img src={avatar} alt="avatar" />
                  </div>
                  <p className="muon-result-name mb-0">{searchQuery}</p>
                </div>

                <button
                  className="muon-send-btn"
                  data-toggle="modal"
                  data-target="#inviteModal"
                >
                  <span>
                    <p>Send Invite</p>
                  </span>
                </button>
              </section>
            )}
      </section>
    </div>
  );
};

export { InvestorSearch };
