# WebbChat

WebbChat is a web-based chat application designed to provide a simple and efficient platform for real-time communication. This project leverages modern web technologies to enable users to connect, chat, and receive instant notifications.

## Features

- **Real-Time Communication**: Uses WebSockets for instant messaging between users.
- **User Authentication**: Allows users to enter a username and join a chatroom.
- **Multiple Chatrooms**: Users can join different chatrooms to keep conversations organized.
- **Message Notifications**: Plays a notification sound when a new message is received.
- **User-Friendly Interface**: Simple and intuitive design for ease of use.

## Technology Stack

- **HTML5**: Provides the structure of the web application.
- **CSS3**: Used for styling the user interface.
- **JavaScript**: Implements the client-side logic for the chat functionality.
- **Socket.IO**: Facilitates real-time, bidirectional communication between the client and server.
- **Node.js**: Server-side JavaScript environment (not included in the provided code, but typically used with Socket.IO).

## Installation and Setup

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/webbchat.git
   cd webbchat
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Then, install the necessary dependencies:
   ```sh
   npm install
   ```

3. **Start the Server**:
   Run the server to start the chat application:
   ```sh
   node server.js
   ```

4. **Open the Application**:
   Open your web browser and navigate to `http://localhost:3000` to start using WebbChat.

## Usage

- **Joining a Chatroom**:
  - Enter your username.
  - Enter the chatroom name (or use the default "All").
  - Click the "Connect" button to join the chatroom.

- **Sending Messages**:
  - Type your message in the input field.
  - Click the "Send" button or press Enter to send your message.

- **Receiving Notifications**:
  - A notification sound will play whenever a new message is received.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the developers of [Socket.IO](https://socket.io/) for providing an excellent library for real-time web applications.
- Inspiration for this project came from the need for simple, effective real-time communication tools.

For any questions or support, please contact [patilyasshh@gmail.com](patilyasshh).
