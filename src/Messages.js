import { Component } from "react";
import React from "react";

class Messages extends Component {
    render() {
        const { messages } = this.props;
        return (
            <ul className="messages">
                {messages.map((m, index) => this.renderMessage(m, index))}
            </ul>
        );
    }

    renderMessage(message, index) {
        const { member, text } = message;
        const { currentMember } = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe
            ? "messages-message currentMember"
            : "messages-message";
        return (
            <li key={index} className={className}>
                <div className="message-content">
                    <div className="username">{member.clientData.username}</div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }
}

export default Messages;
