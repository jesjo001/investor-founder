import React, { useState, useContext, useEffect } from 'react';
import Select, { components } from 'react-select';
import search from '../../../assets/images/connectSearchIcon.svg';
import person from '../../../assets/images/avatarHolder.webp';
import checkmark from '../../../assets/images/checkmark.svg';
import useUserSearchQuery from '../../../queries/userSearch';
import createConversationMutation from '../../../mutations/createConversation';
import { useMutation, useQueryClient } from 'react-query';
import { AlertContext } from '../../../context/alert';
import { useHistory } from 'react-router-dom';
import sample from '../../../assets/images/avatarHolder.webp';
import { MuonButton } from '../../../components';

export const StartAChat = ({
  setInitializing,
  initializing,
  setConversationId,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const { setOn, setAlertContent } = useContext(AlertContext);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const { isLoading, isError, data } = useUserSearchQuery([
    'userSearch',
    searchInput,
  ]);
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();
  const queryClient = useQueryClient();
  const [tempConvId, setTempConvId] = useState(null);

  // useEffect(() => {
  //   // console.log(data);
  // }, [tempConvId]);

  const { mutate } = useMutation(createConversationMutation, {
    onError: (error) => {
      console.log(error);
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
      const userRole = localStorage.getItem('role');
      if (!data && userRole === 'Founder') {
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
          message: 'Conversation Created',
          success: true,
        });
        setOn(true);
        console.log(data);
        setTempConvId(data?.data?._id);
        queryClient.invalidateQueries(['messages']);
      }
    },
  });

  const handleCreateConversation = async () => {
    setSearchInput('');
    setInitializing(true);
    selectedOption.length > 1
      ? await mutate({ ids: selectedOption?.map((option) => option.value.id) })
      : await mutate({ email: selectedOption[0]?.value.email });
    // await mutate({ email: connect?.email });
    setInitializing(false);
    setSelectedOption([]);
  };

  // const createConv = async (data) => {
  //   const conv = await createConversationMutation(data);
  //   console.log(conv?.message);
  //   return conv;
  // };

  useEffect(() => {
    setSearching(true);
    if (!isLoading || !isError) {
      setSearchResult(data);
    }
    setSearching(false);
    setConversationId(tempConvId);
  }, [isLoading, isError, data]);

  const handleSearch = (e) => {
    setSearchInput(e);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'red' : 'blue',
      paddingLeft: '5%',
      marginRight: '5%',
    }),
    control: (styles) => ({
      ...styles,
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0,
      boxShadow: 'none',
    }),
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <MuonButton
          content="Start Conversation"
          onClick={handleCreateConversation}
          disabled={selectedOption.length < 1}
        />
      </components.DropdownIndicator>
    );
  };

  return (
    <section className="muon-message-space px-0">
      {/* <div className="d-flex align-items-center muon-search-connect">
        <section>
          <img src={search} alt="search" />
        </section>
        <input
          type="search"
          name="connects"
          id="connects"
          className=""
          placeholder="Type name or multiple names to start a conversation"
          onChange={handleSearch}
        />
      </div> */}
      <Select
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
          MenuList: () => (
            <SearchedConnects
              connect={{ name: 'samu' }}
              mutate={mutate}
              setIsChecked={setIsChecked}
              setSearchInput={setSearchInput}
              searchResult={searchResult}
              searchInput={searchInput}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              setInitializing={setInitializing}
              initializing={initializing}
            />
          ),
        }}
        styles={customStyles}
        isMulti
        placeholder="Type name or multiple names to start a conversation"
        onChange={(val, triggeredAction) => {
          if (triggeredAction.action === 'remove-value') {
            const newOption = selectedOption.filter(
              (option) => option.value !== triggeredAction.removedValue.value
            );
            setSelectedOption(newOption);
          }
        }}
        onInputChange={handleSearch}
        value={selectedOption}
        inputValue={searchInput}
        isClearable={false}
      />

      {/* {searchInput?.length > 3 && (
        <div>
          {searchResult?.map((res, i) => {
            return (
              <div key={'res' + i}>
                <SearchedConnect
                  connect={res}
                  mutate={mutate}
                  setIsChecked={setIsChecked}
                  setSearchInput={setSearchInput}
                  setSelectedOption={setSelectedOption}
                  selectedOption={selectedOption}
                  setInitializing={setInitializing}
                  initializing={initializing}
                />
              </div>
            );
          })}
        </div>
      )} */}
    </section>
  );
};

const SearchedConnects = ({ selectProps, ...props }) => {
  const {
    searchResult,
    searchInput,
    setSearchInput,
    setSelectedOption,
    selectedOption,
    mutate,
    setIsChecked,
    initializing,
    setInitializing,
  } = props;
  const renderConnects = () => {
    return (
      searchInput?.length >= 3 && (
        <div>
          {searchResult?.map((res, i) => (
            <SearchedConnect
              selectProps={selectProps}
              connect={res}
              mutate={mutate}
              setIsChecked={setIsChecked}
              setSearchInput={setSearchInput}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              setInitializing={setInitializing}
              initializing={initializing}
            />
          ))}
        </div>
      )
    );
  };
  return <>{renderConnects()}</>;
};

const SearchedConnect = ({
  selectProps,
  connect,
  mutate,
  setIsChecked,
  setSearchInput,
  setInitializing,
  setSelectedOption,
  selectedOption,
  initializing,
}) => {
  // const handleCreateConversation = async (e) => {
  //   e.preventDefault();
  //   setIsChecked(e.target.checked);
  //   setSearchInput('');
  //   setInitializing(true);
  //   await mutate({ email: connect?.email });
  //   setInitializing(false);
  // };
  const addDefaultSrc = (ev) => {
    ev.target.src = sample;
  };
  return (
    <div
      className="d-flex align-items-center justify-content-between muon-searched-messenger"
      onClick={() => {
        setSelectedOption([
          ...selectedOption,
          {
            value: { email: connect.email, id: connect._id },
            label: connect.name,
          },
        ]);
        setSearchInput('');
      }}
      style={{ cursor: 'pointer' }}
    >
      <section className="d-flex align-items-center">
        <img
          src={connect?.profileImage || person}
          alt="sample"
          className="muon-searched-messenger-img"
          onError={addDefaultSrc}
        />
        <div>
          <p className="mb-0 name">{connect?.name}</p>
          <p className="mb-0 designation">{connect?.role}</p>
        </div>
      </section>
      <section className="position-relative muon-search-check">
        <input
          type="checkbox"
          name="selectedMessenger"
          id="selectedMessenger"
          // onClick={handleCreateConversation}
        />
        <span>{/* <img src={checkmark} alt="checked" /> */}</span>
      </section>
    </div>
  );
};
