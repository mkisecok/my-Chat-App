import moment from 'moment';
import { useEffect, useState } from 'react';

const formatter = (timestamp) =>
{
    return moment(timestamp).fromNow();
};

export const ChatTimeUpdater = ({ timestamp, interval }) =>
{
    const [ timestampString, setTimestampString ] = useState('');

    useEffect(() =>
    {
        const timer = setInterval(() => setTimestampString(formatter(timestamp)), interval);

        setTimestampString(formatter(timestamp));
        
        return () => clearInterval(timer);
    }, []);
    return timestampString;
};
