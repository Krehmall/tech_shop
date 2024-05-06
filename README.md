This is my first uploaded to GitHub FullStack App 
Made together with another developer named Itshak 
It's computer/mobile shop multipage website 
MongoDB was used as data base
Server part was made with NodeJs+Express+JavaScript
Client part was made with Vanila JS+HTML+SCC
Server and client communicates between them with API

How to run the App:
1.Go to directory modules/dbModule.js in line number 3 you must write: const url = "YourMongoBDLink" .(You must to have MongoDB account)
2.Go to console in app directory enter command: npm i
3.Then in console enter command: node server.js
4.In your browser follow the link: http://localhost:3000

Description:
You can register and then login all new users will be saved in database
At homepage you can see all products, sort and filter them
You can add to cart products, and then pay your order if you enter the cart
If you enter as admin user(look in DB) you may see all orders made by not admin users
