import { useMutation, useQueryClient } from 'react-query';
import createConversationMutation from '../../mutations/createConversation';
import { AlertContext } from '../../context/alert';
import { useContext } from 'react';
import { socket } from '../../App';
import { useHistory } from 'react-router-dom';
const CustomItem = ({
  id,
  name = 'Custom list name',
  more = '10+ investors in the list',
}) => {
  const { setOn, setAlertContent } = useContext(AlertContext);
  const queryClient = useQueryClient();
  const history = useHistory();

  //connect two users getting the sender and receiver

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
      const userRole = localStorage.getItem('role');
      if (!data && userRole === 'Founder') {
        setAlertContent({
          title: 'Success!',
          message: data?.message || 'You currently do not have a valid plan',
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
        queryClient.invalidateQueries(['messages']);
        // alert("Conversation Created");
        socket.emit('CONNETION');
      }
      socket.emit('CONNECT_USERS',localStorage.getItem("id"), id)
    },
  });

  return (
    <div className="d-flex align-items-center justify-content-between muon-co-founder">
      <div>
        <div className="d-flex align-items-center muon-result-name-label">
          <a href={`/profile/${id}`}>
            <span className="muon-result-name">
              {name} {/*id+1*/}
            </span>
          </a>
        </div>
        <p className="muon-result-desc w-100">{more}</p>
      </div>
      <button
        className="muon-send-btn"
        onClick={(e) => {
          e.preventDefault();
          mutate({ email: more });
        }}
      >
        <span>
          <p>Connect</p>
        </span>
      </button>
    </div>
  );
};

export { CustomItem };
