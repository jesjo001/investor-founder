# Muon App



## Technologies
* React
* React router dom
* Axios
* Yarn

## Structure
The application is structured into pages and Components

## How to start

 * install all packages: run "yarn" on your terminal

 * start server: run "yarn start:dev" on your terminal


## FUNCTIONS? INTEGRATIONS

# CONNECTIONS
The connection function integrated on muonclub is a similar functions that allows two users get connected to each other. in this case when user A get connected to user B they receive all notification, blog post and other details from user B, but user B doesn't get these same features from user A because user B hasn't connected back, but if a connection is made back from user B to A then they can share a network where each user can see or receive notification from the other. Take in the case of twitter when you follow someone you get every info posted by that person to your feed, but the other person does not. they only receive a notification that someone just followed them and they can follow back. but they won't receive feeds posted by you except they also follow you.

# EVENTS
Events are being created by muonclub team when an event is created it triggers a notification to every user on the website that a new event has been created.
Users can register for this event either as founder or as Investor, except the investors get registered without paying but the founders have to pay for the event before being registered on the event.
users can also share an invitation of event to every user on their account online or offline. when a user clicks on share to my network the system search for every user connected to the requested user and share to their notification board or mail.

# NOTIFICATION
The notification pannel is a realtime feature integrated with socket.io this feature using the help of socket detects if a user is online or offline, if the user is online its emit notification to that user in realtime else if the users are offline its emit the notification to their mail and when they login they get in on their notification board. When a user looks up another user profile that user get notified that some just viewed their profile and a link to the persons profile also, when a connection is made you get notified and it checks if you are already connected with this person if not ask you to connect back, and lots more.

# RESET/CHANGE PASSWORD
The change password feature is a different model from the forgot password here the user has to be logged in to change their password by inserting the old password and then the new password and confirm it, after validation if the password meets the requirement of the site it get set as new password else throw and error of whatever.

