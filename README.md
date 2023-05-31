# Music Analysis Using Spotify API

This is a simple web application that allows users to authenticate with their Spotify account and access various features of the Spotify API. It is built using Node.js and the Express framework.

## Prerequisites

Before running the application, make sure you have the following:

- Node.js installed on your machine
- Spotify developer account credentials (client ID and client secret)
  - Go to [developer.spotify.com](https://developer.spotify.com/) > Dashboard > Create new project > Set Redirect URI to ```http://localhost:3000/callback``` > Go to settings > Copy client ID and client secret.

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install the required dependencies by running the following command:
3. Open the `server.js` file and replace the placeholders `client_id` and `client_secret` with your Spotify developer account credentials.
4. Start the application by running the following command in the terminal: 'npm run start'

5. Once the server is running, you can access the application by visiting [http://localhost:3000](http://localhost:3000) in your web browser.

## Usage

The application provides the following routes:

- `/`: The home page of the application.
- `/authorize`: Initiates the Spotify authentication process.
- `/callback`: The callback URL that Spotify redirects to after authentication.
- `/dashboard`: Displays user information and a list of their top tracks.
- `/recommendations`: Generates song recommendations based on an artist and track.

## Dependencies

The application uses the following dependencies:

- [Express](https://expressjs.com/): A fast, unopinionated web framework for Node.js.
- [node-fetch](https://www.npmjs.com/package/node-fetch): A module that brings window.fetch to Node.js, allowing you to make HTTP requests.

## Notes

- This application is for demonstration purposes only and may not adhere to best practices for production environments.
- Make sure to keep your Spotify client secret secure and avoid committing it to version control systems.

## License

This project is licensed under the [MIT License](LICENSE).
