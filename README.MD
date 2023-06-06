# Dev-Motivators

Dev-Motivators is an application in the style of Demotivators / Faktopedia but with a programming theme. The backend of the application, previously created in Express.js, can be found [here](https://github.com/Karol-Zysk/Dev-Motivators-Rest-API-). It is currently migrated and being developed in Nest.JS. The frontend is created in React + Vite with ChakraUI as the Component Library.

## Functionalities

### Unregistered User:

- Ability to browse Dev-Motivators on the "Main" page and those aspiring to be in Main: "Staging".

### Registered User:

Unregistered user features, plus:

- Ability to add Dev-Motivators, which after acceptance by Admin/Moderator, go to "Staging", and after achieving a certain number of thumbs up, move to "Main".
- Ability to edit and delete your own Dev-Motivators.
- Ability to vote on Dev-Motivators, both positively and negatively.

### Admin/Moderator:

Registered user features, plus:

- Ability to delete any Dev-Motivators.
- Accepting Dev-Motivators added by users.

**Note**: In addition to Like/Dislike values, Dev-Motivators also have information on how quickly they managed to move from the "Staging" phase to "Main" by collecting a certain number of likes.
