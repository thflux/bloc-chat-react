import React, { Component } from 'react';


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
	}
	
componentWillReceiveProps(nextProps) {
		this.showMessages( nextProps.activeRoom );
	}
	
createMessage(newMessageText) {
		this.messagesRef.push({
			username: (this.props.user ? this.props.user : 'Sonia'),
			content: newMessageText,
			sentAt: Date.now(),
			roomId: this.props.activeRoom.key,
		});
		this.setState({ newMessageText: '' });
	}


handleChange(e) {
		this.setState({newMessageText: e.target.value });
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
						<li key={message.key}>
							<div className="username">
								 { message.username }
							</div>
							<div className="content">
								 { message.content }
							</div>
						</li>
					)}
				</ul>
			 <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessageText) } }>
				<input type="text" value={ this.state.newMessageText } onChange={ this.handleChange.bind(this) }  name="newMessageText" placeholder="Type your message here..." />
				<input type="submit" value="Send"/>
			</form>	
			</main>
		);
	}
}

export default Messages;
