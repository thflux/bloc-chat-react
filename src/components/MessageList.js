import React, { Component } from 'react';
import Moment from 'react-moment';
import {Button} from 'react-bootstrap';


class Messages extends Component {
	constructor (props) {
		super(props)
		this.state = {
			allMessages: [],
			displayedMessages: [],
			newMessageText: ''
		}
		this.messagesRef = this.props.firebase.database().ref('messages')
	}
	
componentDidMount() {
		this.messagesRef.on('child_added', snapshot  => {
		const message = snapshot.val();
		message.key = snapshot.key;
		this.setState({ allMessages: this.state.allMessages.concat( message ) }, () => {
			this.showMessages( this.props.activeRoom )
		});
	});
	this.messagesRef.on('child_removed', snapshot  => {
		this.setState({ allMessages: this.state.allMessages.filter( message => message.key !== snapshot.key )  }, () => {
			this.showMessages( this.props.activeRoom )
		});
	});
}
	
componentWillReceiveProps(nextProps) {
		this.showMessages( nextProps.activeRoom );
	}
	
createMessage(newMessageText) {
	this.messagesRef.push({
			username: this.props.user ? this.props.user.displayName : 'Guest',
			content: newMessageText,
			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
			roomId: this.props.activeRoom.key,
		});
	this.setState({ newMessageText: '' });
}


handleChange(e) {
		e.preventDefault();
		this.setState({newMessageText: e.target.value });
	}
	
removeMessage(activeRoom) {
	this.messagesRef.child(activeRoom.key).remove();
}

showMessages(activeRoom) {
		this.setState({ displayedMessages: this.state.allMessages.filter( message => message.roomId === activeRoom.key ) });
	}
				
render() {
	return (
		<main id="messages-component">
			<h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
			<ul id="message-list">
				{this.state.displayedMessages.map( message => 
					<li className="message-info" key={message.key}>
			<div className="username">
				{ message.username }
			</div>
			<div className="content">
				{ message.content }
			</div>
			<Moment element="span" format="MM/DD/YY hh:mm A" className="sent-at">
				{ message.sentAt }
			</Moment>
			<Button type="button" className="btn-remove-msg" onClick={() => this.removeMessage(message)}> Delete Message </Button>
		</li>
	)}
	</ul>
	<form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessageText) } }>
			<input type="text" value={ this.state.newMessageText } onChange={ this.handleChange.bind(this) } name="newMessageText" placeholder="Write your message here..." />
			<input type="submit" value="Send"/>
		</form>
			</main>
		);
	}
}

export default Messages;
