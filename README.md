# Rhythms of Us

Welcome to **Rhythms of Us**! This project is a Node.js application built with Express that showcases a dynamic web application for music lovers. You can check out the live version [here](https://rhythmsofus.up.railway.app/).

## Features

- **Express Server**: A robust server setup using Express.
- **Body Parsing**: Handles incoming request bodies in a middleware before your handlers, available under the `req.body` property.
- **Static File Serving**: Serves static files from the `public` directory.
- **Custom Routes**: Provides custom routes to handle different requests.
- **404 Handling**: Custom 404 error page for unknown routes.
- **Music Library**: Load and play different songs.
- **Album Display**: Showcase various albums with cover images.
- **Interactive Buttons**: Controls to play, pause, and navigate through songs.
- **Playlist Management**: Create and manage custom playlists.
- **Search Functionality**: Search for songs, artists, or albums.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/rhythms-of-us.git
   cd rhythms-of-us
   ```

2. Install the dependencies for both the root and backend directories:

   ```sh
   npm install
   cd backend
   npm install
   cd ..
   ```

### Running Locally

1. Start the server:

   ```sh
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application running locally.

## Deployment

This project is deployed on [Railway](https://railway.app). You can view the live version [here](https://rhythmsofus.up.railway.app/).

## Contributing

1. Fork the repository.
2. Create your feature branch:

   ```sh
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```sh
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```sh
   git push origin feature/YourFeature
   ```

5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

- [Express](https://expressjs.com/)
- [Railway](https://railway.app)
