import React, { useMemo } from 'react';
import './searchFilter.css';
import filterIcon from '../../assets/images/filterIcon.svg';

export const SearchFilter = ({ filters, setFilters }) => {
  const industries = useMemo(
    () => [
      'Enterprise Software',
      'Fintech',
      'Health',
      'Transportation',
      'Marketing',
    ],
    []
  );

  const ticketSizes = useMemo(
    () => [
      '0K - 100K',
      '100K - 500K',
      '500k - 1MIL',
      '1MIL - 5MIL',
      '5MIL - 10MIL',
    ],
    []
  );

  // console.log(filters);
  const handleSelectFilter = (event) => {
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="d-flex align-items-center muon-filter">
      <section className="d-flex align-items-center">
        <img src={filterIcon} alt="Icon" />
        <p className="mb-0">Filter By:</p>
      </section>
      <select
        name="industry"
        id="industry"
        className="muon-input muon-select"
        onChange={
          handleSelectFilter
          // (e) =>
          //   setFilters((prev) => ({
          //     ...prev,
          //     industry: e.target.value,
          //   }))
        }
      >
        <option value="industry" disabled selected hidden>
          Industry
        </option>
        {industries.map((industry, i) => (
          <option value={industry} key={'ind' + i}>
            {industry}
          </option>
        ))}
      </select>

      <select
        name="ticketSize"
        id="industry"
        className="muon-input muon-select"
        onChange={handleSelectFilter}
      >
        <option value="ticket" disabled selected hidden>
          Ticket Size
        </option>
        {ticketSizes.map((ticket, i) => (
          <option value={ticket} key={'ticket' + i}>
            {ticket}
          </option>
        ))}
      </select>
    </div>
  );
};
