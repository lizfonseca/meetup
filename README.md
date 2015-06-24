#Meetup Application

##How it Works

#####For admins

The admin can access the application via password. If their phrase does not match the admin password, the app will display an error message.

```'ERROR: Incorrect admin password. Admin access denied. Connection terminated.'```

######Once logged in as an admin, they can perform the following commands:

  **1. list** displays the current meetup details

```'date: 'date' topic: 'topic' people attending: 'list of names' '```

  **2. create** will make new meetup with a date and topic specified

  If information is missing, the app will display an error message.

```'ERROR: Missing information. To create a new meetup, type 'create' 'date' 'topic'. Connection terminated.'```


  **3. clear** will remove all information of the current meetup and allows room for a new one

Once the application runs a command, it will disconnect from the user.

***

#####For users

######Users will have access to the meetup through the following commands:

  **1. list:** displays the current meeptup details
  ```'date: 'date' topic: 'topic' people attending: 'number of people' '```

  **2. RSVP:** adds the user to the list of people who will attend the meetup.

  In order to RSVP, the user _must_ provide their name and email address.

  If information is missing, the app will display an error message.

```'ERROR: Missing information. To RSVP, type 'RSVP' 'name' 'email address'. Connection terminated.'```

Once the application runs a command, it will disconnect from the user.
