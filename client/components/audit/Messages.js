import React, { PropTypes } from 'react';
import moment from 'moment';
import MessagesFooterContainer from '../../containers/audit/MessagesFooterContainer';
import MessagesTableHeaderContainer from '../../containers/audit/MessagesTableHeaderContainer';
import MessageSearchContainer from '../../containers/audit/MessagesSearchContainer';

const Messages = ({ requesting, messages }) => (
    <div>
        <MessageSearchContainer/>
        <table>
            <MessagesTableHeaderContainer />
            <tbody>
            {
                requesting ?
                    <tr><td colSpan="6">Loading..</td></tr>
                    :
                    messages.map(m =>
                        <tr key={m._id}>
                            <td>{m.TypeName}</td>
                            <td>{moment(m.TimeSent).format("DD/MM/YYYY HH:mm:ss")}</td>
                            <td>{moment(m.TimeReceived).format("DD/MM/YYYY HH:mm:ss")}</td>
                            <td>{m.SourceAddress}</td>
                            <td>{m.DestinationAddress}</td>
                        </tr>
                    )
            }
            </tbody>
        </table>
        <MessagesFooterContainer />
    </div>
)

Messages.propTypes = {
    messages: PropTypes.array.isRequired,
    requesting: PropTypes.bool.isRequired
};

export default Messages;