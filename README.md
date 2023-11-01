# Cricket-Player

This is frontend and backend application

Steps to setup the project
1.Take pull of the main branch
2.Open the project in a code editor
3.Install npm using "npm i" command for both backend and frontend
4.For running project
  a.For Backend run "node server.js" or "nodemon server.js" command
  b.For Frontend run "ng serve" command"
5.When both backend and frontend are running succefully then go to "localhost:4200" on your browser
6.It will land on Home Page, from here you can navigate to various pages from headers or you can click on see players button on home page.
7.On navigating to All Players page you will see list players which are present locally in the backend in csv file.
8.You can sort, filter the player in the table.
9.You can also add, delete or edit the player in the table, in order to perform these actions you need to login with email and password.
10.If you dont have the login credentials then you can register with sign up option on login page where you need to enter first name, last name, email and password.
11.The above steps will store your details in a user file inside data folder.
12.Here I have used Authguard and lazy loading also.
13.With authguard if you are not logged in then you cant visit Add Player Page.
14.You can edit player also, when you click on edit a dialog with form opens & that players info gets filled in the form and you can edit whichever field you want.


*I have used Angular as frontend and NodeJs & Expressjs as backend
*Performed CRUD operations on a csv file.
