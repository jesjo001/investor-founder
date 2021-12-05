import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import PageHeader from '../elements/PageHeader';

import copy from 'copy-to-clipboard';

export default function Invite() {
  const [founderCopyMessage, setFounderCopyMessage] = useState('');
  const [investorCopyMessage, setInvestorCopyMessage] = useState('');

  const handleFounderCopy = () => {
    copy('http://beta.muon.club/founder/signup', {
      onCopy: setFounderCopyMessage('Link has been copied to the clipboard!'),
    });
  };

  const handleInvestorCopy = () => {
    copy('http://beta.muon.club/investors', {
      onCopy: setInvestorCopyMessage('Link has been copied to the clipboard!'),
    });
  };

  return (
    <div>
      <PageHeader title="Invite" />
      <div className="invite_container">
        <div className="invite_wrapper pull-left">
          <h3>Investors</h3>
          <Button onClick={handleInvestorCopy} color="" size="sm" className="text-white bg-gradient">
            Get Invitation Link
          </Button>
          <small className="copy_msg">{investorCopyMessage}</small>
        </div>
        <div className="invite_wrapper pull-left">
          <h3>Founders</h3>
          <Button onClick={handleFounderCopy} color="" size="sm" className="text-white bg-gradient">
            Get Invitation Link
          </Button>
          <small className="copy_msg">{founderCopyMessage}</small>
        </div>
      </div>
    </div>
  );
}
