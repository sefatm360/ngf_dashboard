import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fetcher from '../../helpers/fetchApi';

const TrainingMeeting = () => {
  const [status, setStatus] = useState('Running');
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/otw-training/api/meeting/get/all/by/status-or-all/${status}`,
      });

      if (data.success) {
        setMeetings(data.data);
      }
    })();
  }, [status]);

  // console.log({ meetings });
  return <div>meetings</div>;
};

export default TrainingMeeting;
