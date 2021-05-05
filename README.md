# Link Social Media

## Project Description
Link is the second iteration of a social media application created by Team Avatar as part of the Revature Full Stack Angular training program in April 2021. Developed with a microservice architecture, this web application allows every user to follow each other and view each other's posts. Each user has their own account that they can customize with their own information. Within this network, users can interact with each other through comments, likes, and a global chatroom. This social media application is meant to ease the transition of becoming a Revature employee.

The FrontendClient contains the web page developed in Angular and TypeScript.

## Technologies Used

- Angular - version 8
- TypeScript
- HTML5
- CSS3
- Jasmine
- Karma
- StompJS - version 2.3.3
- SockJS - version 1.5.1
- SweetAlert2 - version 10.16.0

## Features

- Register an account and login.
- Create posts and interact with other posts.
- Search for users.
- View posts made by followed accounts.
- Create and edit personal profile information (bio, profile pic, email, password, etc).
- Chat with others in a global chatroom.
- Upload and share images and media.
- Receive personalized notifications.

### To-do list:

- TODO

## Getting Started
   
> Clone all service repositories
```
git clone https://github.com/LinkSocialNetwork/Eureka.git
git clone https://github.com/LinkSocialNetwork/Gateway.git
git clone https://github.com/LinkSocialNetwork/UserService.git
git clone https://github.com/LinkSocialNetwork/PostService.git
git clone https://github.com/LinkSocialNetwork/NotificationService.git
git clone https://github.com/LinkSocialNetwork/ChatService.git
git clone https://github.com/LinkSocialNetwork/FrontendClient.git
```

> npm install in angular project folder
```
npm i FrontendClient/Angular
```

## **Usage**

> Run all services sequentially
```
Euerka > Gateway > UserService > PostService > NotificationService > ChatService
```

> Run angular project
```
cd FrontendClient/Angular
npm run start
```

> Visit the url
```
http://localhost:4200
```

## **License**

This project uses the following license: [<The MIT License>](https://www.mit.edu/~amini/LICENSE.md).
