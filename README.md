## 📒 Description

A scalable and modern TypeScript interveiw platform back-end application developed following best practices using NestJS, Node.js and TypeScript. Notable features include authentication, authorization, file upload, + more! Follow the Development section to get started and then navigate to the [SwaggerUI](http://localhost:3000/api/).

## 🥞 Tech Stack

The application was created with:

- Created with [NestJS](https://nestjs.com/), a [Node.js](https://nodejs.org/en/) framework for building efficient, reliable and scalable server-side applications
- Developed in [TypeScript](https://www.typescriptlang.org/).
- [PostgresSQL](https://www.postgresql.org/) database
- Used [TypeORM](https://typeorm.io/#/) to interact with the database
- User authentication built using [Passport.js](http://www.passportjs.org) middleware
- Passwords encrypted/hashed using [bcryptjs](https://www.npmjs.com/package/bcrypt) package
- Incoming data validated using the [class-validator](https://github.com/typestack/class-validator) package
- Audio is transcribed using [IBM Watson Speech to Text API](https://www.ibm.com/cloud/watson-speech-to-text)

## 💡 Project Overview

- Implemented authentication and authorization mechanisms (different users cannot access and delete each others answers)
- Guarded endpoints for authorized users using Guards
- Implemented data validation using Pipes
- Implemented password encryption
- Built file upload functionality
- Added SwaggerUI to to visualize APIs and make it easier to interact with them

## 🚀 Development

To get started:

```sh
git clone https://github.com/j-bunk/interview-platform.git
cd interview-platform
npm install
npm run start
```

SwaggerUI has been set up to make it easier to communicate with the application. Go to http://localhost:3000/api/ to interact with the APIs. Use the `/auth/signup` endpoint to create a user, then sign in with the `/auth/signin` endpoint which will return a JWT access token. Add the JWT token by clicking the Authorize button above the answers section and pasting the access token. This would give full access to the Answers APIs.

_Please note that a local database would need to be set up and configured to use full functionality._

### 📁 Project Structure

The project is split into the following parts:

- `/src` contains most of the code:
  - `/answers` contains code relating to answers management.
  - `/auth` contains code relating to user authentication.
  - `/questions` contains code relating to question management.
- `/uploads/recordings` folder will be generated when audio file is uploaded. Contains all uploaded voice recordings

## 🔮 Future Features

- Improve Swagger API documentation (add clearer API responses and API parameters)
- Achieve 100% testing code coverage
- Build frontend
