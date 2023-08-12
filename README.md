<div align="center">

<img width="1512" alt="Screen Shot 2023-08-12 at 1 43 31 PM" src="https://github.com/felipeaocampo/snowmies/assets/95617522/b5b059a3-2023-44d3-b7fd-197085fd307d">
<br>
<br>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) <br/>
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

</div>
<hr>

<p align="center" class="toc">
<strong><a href="#Tech-Stack">Tech Stack</a></strong>
•
<strong><a href="#Features">Features</a></strong>
•
<strong><a href="#Contributing">Contributing</a></strong>
</p>

<hr>

## What is Snowmies?

Snowmies is a social media application for skiers and snowboarders who share the same home mountain. It allows users to log in to a Mountain Feed page, which is essentially n online community board that allows users to interact with other through comments and likes. The Moutain Feed page also allows users to update their profile description and upload a profile picture. Users also have the option of logging out or refreshing the comments to see if any new comments can be retrieved. Lastly, the app also has a dedicated sign up page for users who are using the app for the first time to provide the necessary information and most importantly choose their home mountain.

## Getting Started

To initiate Snowmies, first fork and clone this repo.  Navigate to the root directory and install the dependencies 
e.g:
```
npm install
```
then 
```
npm run dev
```
Make sure you make your own .env file and fill it with the variables found in the .env.example file in the root directory!

## Tech Stack

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Webpack](https://webpack.js.org/)

This application chose React for its frontend development because the project demanded quick development and an efficient infrastructure. The modular and reusable code comprising the frontend ensures a very scaleable application. The Framer Motion library was used to add dynamic effects to the frontend and form validation was included whenever user submits any data. For state management, since the current iteration of this app is of smaller scale, instead of using Redux, React's context API was used to maintain app wide state. Of course each necessary component maintained its own state.

Prioritizing development speed and app-wide cohesion, Node.js was chosen for the backend and was build upon a layer of abstraction provided by Express. The backend provides a RESTful API that also implements the MVP pattern in its infrastructure. A NoSQL (MongoDB) was chosen to store the user information needed by the frontend in order to properly display the user's Mountain Feed. Multiple collections were created for this, such as the users and comments collection. Further, another layer of abstraction was added by the inclusion of Mongoose, which was helpful to ensure security and consistency in the users data.

The latest piece added to the backend is facilitated by <a href="https://www.npmjs.com/package/multer">Multer</a>. Multer is a Node.js package that allows for files to be stored in the backend directory, provides a url for the file, which was then passed on to the database. From there, the frontend is updated in order for the user's profile picture to accurately display.

Check the links above or the <a href = "#Editorial">editorial</a> if you are interested in learning more about any of the tools we used

## Features

### Login Page

https://github.com/felipeaocampo/snowmies/assets/95617522/82dd49ed-d5c1-44d0-ba01-7492e8d19e88

### Sign Up Page

https://github.com/felipeaocampo/snowmies/assets/95617522/2032fe36-7815-4e73-a483-a5fd55ac0652


### Mountain Feed Page

#### - Upload profile pic, update profile description, and log out

https://github.com/felipeaocampo/snowmies/assets/95617522/1c859bd1-a5ae-44aa-b7af-be5fa26e0c30

#### - Like and unlike comments, add comment to mountain feed board, delete comments posted by same user

https://github.com/felipeaocampo/snowmies/assets/95617522/a1d86023-8210-4b21-b44c-9a9d85f32b5b

## Contributing

If you are interested in contributing, feel free to submit an issue or a pull request! Snowmies is open source and any contributions from other developers excited about the project are welcome!
