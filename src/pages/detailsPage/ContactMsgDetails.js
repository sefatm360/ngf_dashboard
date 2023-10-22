import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import fetcher from '../../helpers/fetchApi';

const ContactMsgDetails = () => {
  const { id } = useParams();
  const [msgDetails, setMsgDetails] = useState({});
  const [newNote, setNewNote] = useState('');
  const [showNoteField, setShowNoteField] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/api/client/get/single/contact/msg/${id}`,
      });
      if (data.success) {
        setMsgDetails(data.data);
        setNewNote(data.data.note || '');
      }
      setIsLoading(false);
    })();
  }, []);

  const handleSubmit = async () => {
    if (msgDetails.note === newNote) {
      alert('You didnt note anything!');
    } else {
      setIsLoading(true);
      const { data } = await fetcher.put({
        url: `/api/client/update/contact/msg/${id}`,
        cType: 'application/json',
        body: { note: newNote },
      });
      if (data.success) {
        setMsgDetails({ ...msgDetails, note: newNote });
        setShowNoteField(false);
      }
      setIsLoading(false);
    }
  };

  const { name, email, message, msg_date, phone, note } = msgDetails;

  return (
    <div className='content'>
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='contact-msg-details-section'>
            <div className='contact-msg-title'>
              <span>
                Contact Message From <span className='text-bold'>{name}</span>
              </span>
            </div>
            <div className='contact_msg_info'>
              <div className='contact-msg-note'>
                <p>
                  <span className='text-bold'>Date: </span>
                  {moment(msg_date).format('MMM Do YY')}
                </p>
                <p>
                  <span className='text-bold'>Time: </span>
                  {moment(msg_date).format('h:mm a')}
                </p>
                <p>
                  <span className='text-bold'>Email: </span>
                  {email}
                </p>
                <p>
                  <span className='text-bold'>Phone: </span>0{phone}
                </p>
              </div>
              <div className='contact-msg-note'>
                {showNoteField ? (
                  <div>
                    <textarea
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder='Enter some important note for this email'
                      cols='80'
                      rows='5'
                      value={newNote}
                    ></textarea>
                    <div>
                      <button
                        className='contact-note-button'
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                      <button
                        className='contact-note-button'
                        onClick={() => setShowNoteField(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {note ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <small>
                          <span className='text-bold'>Note: </span>
                          <span style={{ color: 'blue' }}>{note}</span>
                        </small>
                        <button
                          className='contact-note-button'
                          onClick={() => setShowNoteField(true)}
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      <button
                        className='contact-note-button'
                        onClick={() => setShowNoteField(true)}
                      >
                        Add Note
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='contact-message'>
              <small>{message}</small>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContactMsgDetails;
