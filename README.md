# MERN Stack Memoria

Memoria is a social media application where users can register, log in, connect with other users, and share their memories through images and text. This repository contains the source code and necessary files for running the Memoria application.

## Features

- User registration and login: Users can create a new account or log in using their credentials.
- User profiles: Each user has a profile page that displays their information and shared memories/post.
- Follow system: Users can follow other users to stay updated with their shared memories.
- Memory creation: Users can create and share memories by uploading images and adding descriptive text.
- News feed: The home page displays a news feed that shows memories from the users that the logged-in user follows.
- Like and comment: Users can like and comment on memories shared by other users.

## Technologies Used

- Node.js: A JavaScript runtime environment that allows running JavaScript code on the server-side.
- Express.js: A web application framework for Node.js used for building the backend of the application.
- MongoDB: A NoSQL database used to store user information, memories, and other data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB that provides a higher-level abstraction for database interactions.
- React: A JavaScript library for building user interfaces.
- Redux: A state management library for JavaScript applications, used for managing the application state.
- JWT (JSON Web Tokens): A mechanism for securely transmitting information between parties as a JSON object, used for user authentication and authorization.
- HTML/CSS: Markup and styling languages used for creating web pages.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Rabin-Osti/MERN-Stack-Memoria-App.git
```

2. Change into the project directory:

```bash
cd MERN-Stack-Memoria-App
```

3. Install the dependencies for the server-side:

```bash
cd server
npm install
```

4. Change into the client directory:

```bash
cd ..
cd client
```

5. Install the dependencies for the client-side:

```bash
npm install
```

6. Go back to the project root directory:

```bash
cd ..
```

7. Set up the environment variables:

   - Create a `.env` file in the project server directory.
   - Specify the required environment variables in the `.env` file (e.g., MongoDB connection string, JWT secret key).

8. Start the development server:

```bash
npm run start
```

9. Open your web browser and visit `http://localhost:3000` to access the Memoria application.

## Contributing

Contributions to the Memoria project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes in your branch.
4. Commit your changes and push the branch to your forked repository.
5. Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Memoria Feature Preview

https://github.com/Rabin-Osti/MERN-Stack-Memoria-App/assets/117830519/6d696715-b90b-42bb-bbf6-1277c5433539

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [JWT](https://jwt.io/)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Contact

For any questions or inquiries, please contact [Rabin Osti](mailto:emperoromega10@gmail.com).
