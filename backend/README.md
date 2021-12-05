## Install Dependencies

> yarn add

## Launch Server

> yarn dev

## List of .env

- JWT_SECRET=
- JWT_EXPIRY=
- PORT=
- DB_URL=
- EMAIL=
- PASSWORD=
- GOOGLE_CLIENT_ID =
- GOOGLE_CLIENT_SECRET=
- STRIPE_SECRET_KEY=
- STRIPE_PUBLISHABLE_KE

## Backend Src Folder Structures

- configs - holds the db connection
- controllers - holds middlemares that interacts with the servers
- middlewares - holds the authentications, verification, and media-files middlewares
- models - holds the schemas
- routes - holds the routers of the controller middleware
- utils - holds the helpers middleware
- Please create a temp local storage folder named "uploads" in the backend root folder

---

## Description of Used Functions

---

### @source

### index.js

> starting point of application
> connection setup for db
> created a rest api for testing

## controller

### conversation.js

> -> preConversation()

    checks wheather users does have any valid plan for messaging feature or not. if not it will show message that your plan is expired.

> -> getConversation()

    return the history of current user make chats with others

> -> creatConversation()

    will initialize the new conversation between users. if they doesnt have valid plan then if suggest all messageing plans to users.

> -> other than this it will return conversation is already exist or they cannot create conversation.

### founder.js

> -> refer()

    referal function for founder. it limit the founder that he can only refers the 10 users. Before refer someone it will check for that particular user is already refered, if it is then ask to choose another one.

> -> signup()

    signup feature for founder will active after he is invited by another user. after invitation here user completed their questionaire.

> ~~-> updatePlan()~~

    ~~with it user can purchase messaging features.~~

> -> updateProfile()

    using updateProfile method one can update their each profile information. even profile image too.

> -> charge()

    charge is using for payment purpose. Here user can activate their message service. Here stripe payment gateway is used to make payment. Message subscription is like $12 for monthy, $27 for quaterly and $58 for anual plan. after successful purchasing of subscription it will response `payment successful` otherwise `payment failed`.

### investor.js

> -> refer()

    investor doesnt have limitation to invite users. with it investor can invite multiple number of users.

> -> signup()

    signup feature for investor. after filling the questionaire investor completed their signup process.

> -> updateProfile()

    using updateProfile method one can update their each profile information. even profile image too.

### messaging.js

> -> \_preMessage()

    function checks user is making valid conversation or not.

> -> preMessage()

       according to _preMessage function it will response. checks the access is authorized or not.

> -> getMessage()

    getMessage method popualte the message to specific user by referencing the conversation id.

> -> postMessage()

    it not a valid text, response is valid text expected.  or after another some issue  can not store message.

> -> streamMessage()

    it serves the messges between users.

### rest.js

> -> getUsers()

    by using this method user can search for any type of user weather it is investor or founder.

> -> getInvestors()

    find investor of their interest.

> -> getFounder()

    Here investor and founder can search for founder.

> -> getStartUpCount()

    counts the number of startups the founder have.

---

## models

### conversation.js

> -> conversationSchema

    store the objectId of users

### founder.js

> -> founderSchema

    stores founders questionaires.

### investor.js

> -> investorSchema

    store investor questionaire at the time of investor singup

### message.js

> -> messageSchema

    store the message with object id messages and conversation

### rest.js

> -> referSchema

    stores the info about refered users.

### user.js

> -> userSchema

    store the credential of users log signup purpose.

---

## routes

### conversation.js

> contain routes for making new conversation or getting old conversation.

### founder.js

> contain routes for founder `signup, signin, update new plans, subscribing new message plan, refer users`, and info about founders.

### googleAuth.js

> here all user can signup using google authorization.

### index.js

> contain routes for authorization, getting investors, investor dashboard, founder dashboard, messaging and other features.

### index.js

> contain routes for `signin, info, get new users, get founder, get investor, startup counting, investor/founder, messaging and getting conversation` of users.

### investor.js

> contains routes for investor `signup, update profile and refering to another user`.

### messaging.js

> help to messaging feature for `making new conversation, getting existing conversation, and serving messages between users`.

---

## utils

### auth.js

> -> newToken()

    generate new token for signin purpose.

> -> verifyToken()

    it verify tokens

> -> signin()

    helps to fulfil users signin features. validate login credential at the time of signup

> -> token()

    generate new token for signup purpose

### constant.js

> contain information for questionaires like user type, ticket size investment type, industry type, industry location, plan type.

### db.js

> connection string for db connectivity

### emitter.js

> emits responses for messaging service.

### mail.js

> nodemail service for refers and token generation purpose.

### upload.js

> -> uploader()

    function helps to upload media tupe file to db.

---

### connection 
The connection scheme works most like every social network, if a user A followers another user B there get all info the other user B post but the user B doesn't, becuse the reason for following is so you dont get random feeds from users you dont want. so if user B follows user A back they start getting feeds from them. these relates to our conection if user A connects with user B they get notifications, invites, event, and more from user B but user B gets details from user A if there choose to follow user A back. the connection takes the parameters ID of the user logged in and the ID of the user the connction is meant for. this route and function is being perform on the notification controller. Because the notification has to be thrown to the receiving user in realtime.

The model stores the sender.userID and ther receiver.userID as well as their names and role.

getConnections()-> populate the userid of the followers or users connected to the logged in user.

getConnectionsSender()-> populate the userid of the users the loggin user connected with in this case you are the sender the person who started the connection.



### events 
events are created by our admin and stored in the database when an event is created we get some info like the name of the event cover-art and so on and notify every user on the site that an event is created. users can join this event for free (only to role investors) or by paying for it (only to role founders).

getAllEvents()
inviteTOevent()
postevent()

### login 
the login feature helps the user to be at alert if there is an intrusion in their account if they logg in the system gets the ip of the device loggein with and store to the database, if that device is being used again a notification will be thrown to the user telling them they jus logged in to their muonclub account, else if the user loggin with a different device or someone tries to loggin to their account from a different device they get mail that someone with the following ip is trying to access their muonclub account.

`this is done on the sign in controller.`


### notification 
This part is being controlled by real-time the system gets the information from the frontend which is being processed from the socket checking if the user the notification is meant for is online or offline, if online send emit to the database and the socket handles the rest displaying the notification to the user else if offline jus send it to their mail.
Notifications ==>
1. event invite
2. event join
3. connection
4. plan
5. login
6. change password
7. forgot password
8. message request
9. profile notification (profile lookup)

### change password
This documentation can be found on the frontend.

### plans 
This part handles every plan on the website, when a user subscribe to a package the plan updates the collections.
and also populate the uer type of plan, users have different plan suggestions
    'Monthly', 
    'Quarterly',  
    'Annually',
  

### forgot password
the forgot password helps users gain access to make a change in password, here if users click forgot password from the frontend this route sends a reset token to the users email, this token helps identify which password is meant to be change, and also server as authorization for users to access the reset password page.

### reset password
The reset password handles the change in password for the user who requested a reset when a forgot password token is being verified, users gain access to this route which takes the new password and change the old one from the DB collection and update with the new one (password).

