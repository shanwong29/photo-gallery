# Photo Gallery

![Photo Gallery App Demo](/demo.gif)
A photo gallery app to display 3 random sets of photos in two animated layouts: Mosaic and Carousel.

The objective of this project are:

1. to learn automated testing for react by using **Jest**, **Enzyme** and **React Testing Library**;
2. to enhance my CSS skills by using more advanced front-end effects, **CSS grid, animation and transition**;
3. to understand **Docker** & **Docker Compose** better by containerizing both the Node and the React app, and build a connection between them.

The app has been deployed. You may see it on my [deployment page](https://shan-photo-gallery.herokuapp.com/).

## Prerequisites

1. Unsplash API is used for getting the photo data, make sure you have a developer account on [`Unsplash`](https://unsplash.com/developers).

2. Make sure you have [`Docker`](https://www.docker.com/) and [`Docker Compose`](https://docs.docker.com/compose/) installed.

## Run Locally for Development

1. Clone the repository:
```
git clone https://github.com/shanwong29/photo-gallery.git

```

2. Add your `Unsplash Access Key` as an environment variables:
```
export UNSPLASH_ACCESS_KEY=<Your Unsplash Access Key>
```

3. Build Docker images and run the Docker containers:
```
cd photo-gallery/
docker-compose build
docker-compose up
```

The Node app conatiner can be accessed by [http://localhost:5005](http://localhost:5005),
while the react app container can be accessed by [http://localhost:3000](http://localhost:3000).

Every edit in the local IDE will automatically be reflected in the apps running in containers.

### Testing

Once the Docker images are built, you may run the following command to test the React app:
```
docker-compose run client npm test
```

## Built with

- React.js
- Node.js
- Express.js
- Unsplash API
- CSS
- Jest
- Enzyme
- React Testing Library
- Docker & Docker Compose
