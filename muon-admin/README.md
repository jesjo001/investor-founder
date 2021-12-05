# Muon Admin Dashboard App

## Technologies

- React
- Reactstrap
- Bootstrap
- React router dom
- Axios
- Yarn
- Redux

## Structure

The application is structured into pages and Elements/Components

## How to start

- install all packages: run "yarn install" on your terminal

- start server: run "yarn start:dev" on your terminal

## Frontend Src Files & Folder Structures

- assets - holds the images that are used in the application
- configs - holds any configuration files
- layouts - holds the code for everything relating to the side bar and top navigation
- store - holds the files and folders regarding redux
- utils - holds the helpers middleware
- views/elements - holds the different components of the application
- views/pages - holds the different pages of the application, each folder is tied to a side menu tab
- views/pages/default.js - holds code to get you started on a new side menu table
- muon-styles.css - holds styling info for custom components, or if you need to quickly apply some styling to a page
- \_nav.js - holds all the items on the side menu, this is where you go to, to add a new side menu item, and the route to the side bar
- views/index.js - this is where all routes in the application are defined

# QUICK SETUP IMPORTANT TIP

- To find any page on the dashboard, go to `/src/views/pages`
- To create a page on the dashboard, follow the following steps:
  - navigate to `/src/views/pages`
  - open the folder that corresponds to the page you want to create. (i.e. To add page
    for event attendees, go to `/src/view/pages/events`), or create a new folder if it doesn't exist
  - create a file in that folder, and name it with something similar to the folder name. (i.e. EventAttendee.js), then add your code.
  - navigate to `/src/views/index.js`, import the file you created, then add an object containing the
    name, file, and route to the pageList array.
    (i.e.
    {
    name:'', // not complulsory
    component: EventAttendee, // compulsory
    path:'/event/event-attendee' //compulsory
    }
    )

# ADMIN USER OPERATIONS

- To add a user, after logging in with `admin` role, navigate to the `Users` menu under the `Admin` tab on the side menu,
  click on the `New` button on the right side of the page header, then follow the instructions on the next page

- To delete a user, after logging in with `admin` role, navigate to the `Users` menu under the `Admin` tab on the side menu,
  click on the `action` button on the row of the user to be deleted, click on `delete`, then follow the modal prompt.

- To change password, after logging in with `admin` role, navigate to the `Users` menu under the `Admin` tab on the side menu,
  click on the `action` button on the row of the user whose password is to be changed, click on `change password`, then follow the instructions on the next page.
