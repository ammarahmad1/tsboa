# MERN Application

This repository contains a MERN (MongoDB, Express.js, React.js, Node.js) application. Follow the instructions below to set up and run the application locally.

## Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/mern-application.git
    ```

2. Navigate to the project directory:

    ```bash
    cd TSBOA
    ```

3. Install server dependencies:

    ```bash
    cd api
    npm install
    ```

4. Install client dependencies:

    ```bash
    cd ../tsboa-final
    npm install
    ```

## Setting Up MongoDB

1. Start your MongoDB server.

2. Create a `.env` file in the `server` directory with the following content:

    ```env
    MONGO_URI="mongodb+srv://tsboadb:tsboadb@tsboa.9rqwqev.mongodb.net/tsboa?retryWrites=true&w=majority"
    ```

    
## Running the Application

1. Start the server:

    ```bash
    cd ../api
    npm start
    ```

    The server will run on http://localhost:5000.

2. Start the client:

    ```bash
    cd ../tsboa-final
    npm start
    ```

    The client will run on http://localhost:3000.

3. Open your web browser and navigate to http://localhost:3000 to view the application.

## Additional Information

- The server code is located in the `api` directory.
- The client code is located in the `tsboa-final` directory.

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the TSBOA License
