import React, { useEffect, useState } from 'react';
import { ChatBox, MessageTab } from '../../components/index';
import './chatSpace.css';
import useMessagesQuery from '../../queries/messageTab';
import Participant from '../chatBox/Participant';
import { getFounderPlan } from '../../queries/founderList';
import { useHistory } from 'react-router-dom';

export const ChatSpace = ({ chatWith, setChatWith,step, setStep, open, setOpen }) => {
  const { data, isError, error, isLoading } = useMessagesQuery('messages');
  const [conversations, setConversations] = useState([]);

  const [initConv, setInitConv] = useState(false);
  const [userplan, setuserPlan] = useState(null);

  useEffect(() => {
    setConversations(data);
  }, [conversations, initConv]);

  const checkSubScription = async () => {
    if (localStorage.getItem('role') === 'Founder') {
      const plan = await getFounderPlan();
      return setuserPlan(plan?.data?.active);
    }
    return setuserPlan(true);
  };

  const history = useHistory();

  useEffect(() => {
    checkSubScription();
  }, []);

  if (!userplan && step === 2) {
    history.push('/pricing');
  }

  return (
    <div className="chat-space">
      {step === 1 ? (
        <MessageTab
          setChatWith={setChatWith}
          conversations={conversations}
          isLoading={isLoading}
          isError={isError}
          error={error}
          currentStep={step}
          setCurrentStep={setStep}
          setOpen={setOpen}
          open={open}
          setConversations={setConversations}
        />
      ) : step === 2 ? (
        <ChatBox
          goBack={() => setChatWith({ id: '', name: '' })}
          chatWith={chatWith}
          currentStep={step}
          setCurrentStep={setStep}
          setOpen={setOpen}
          open={open}
          setConversations={setConversations}
          setInitConv={setInitConv}
        />
      ) : (
        <Participant
          chatWith={chatWith}
          currentStep={step}
          setCurrentStep={setStep}
          setOpen={setOpen}
          open={open}
          conversations={conversations}
          setConversations={setConversations}
        />
      )}
    </div>
  );
};
