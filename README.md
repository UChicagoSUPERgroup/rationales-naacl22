  # How to install

To work with only the React app, type ``` npm install ``` to install in the command line to install the dependencies.

The web app is ready to run. To run in the browser, type ```npm start``` in the command line. The app is now running at localhost:3000

## Url Parameters

There are 4 different url parameters that control different functions of the application. To use a parameter, add
"/?" at the end of the url, and separate parameters with a "&" (no spaces).

| Parameter                 | Usage                              | Description                                                                                        |
|---------------------------|------------------------------------|----------------------------------------------------------------------------------------------------|
| shouldShowAttentionLevels | "attLevels"                        | Determines if users should be able to select multiple attention levels. The default value is false |
| shouldShowConfusingWords  | "showConfusing"                    | Determines if the user should be able to select confusing words. The default value is false        |
| numReviews                | "numReviews=<integer>"             | Determines the number of reviews a user labels. The default value is 10                            |
| userId                    | "userId=<integer>"                 | Determines the user id. The default value is a random 10 digit integer                             |
| onlyLabel                 | "onlyLabel"                        | Determines if the user only selects a label. The default is false                                  |
| combinedInterface         | "combined"                         | Combines the label and selection interfaces                                                        |
| additionalInstructions    | "additionalInstructions=<integer>" | Displays additional instructions for the user if needed                                            |
 
Example: "localhost:3000/?attLevels&numReviews=20"
  
## Cookies! 🍪
Cookies are used to prevent users from having multiple review sets. The appropriately named ```CookieJar.ts``` file contains a 
wrapper around the cookie Web API. In the ```urlParameters.ts``` file, there exists a debug section to test multiple review sets
(which would require deleting an already existing userId cookie).

The functions of the ```CookieJar``` object are documented in ```CookieJar.ts``` 

## Data
The user data can be accessed at this [link](https://super.cs.uchicago.edu/featurefeedback/get_all_data.php). The data is formatted as
follows

| Name | Type | Purpose |
|-|-|-|
|instructions | number | ID of instruction set that the participants receives |
| shouldLabelOpposite | boolean | Changes interface to allow participants to label words of opposite sentiment |
| noDrag | boolean | Changes the interface to prevent participants from dragging to select phrases of words. |
| shouldOnlyLabel | boolean | Changes the interface to prevent participants from selecting words that was indicative of the review sentiment|
| pageTimes | Array<string> | The time that the participant spent on every page of the survey. _**This is a string array because json does not handle floats well.**_ |
| reviewIds | Array<number> | The list of review IDs that the reviewer will be labeling|
|sessionData | ICurrentSessionData | Contains all information about the participants actions. Will be explained in the following table|
| userId | number | The id that is generated to keep track of the user's responses|

The data above primarily contains information about the testing conditions.



# Useful Resources

Links to the different libraries used in the web app.

- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Typescript Docs](https://www.typescriptlang.org/docs/home.html)
- [React Context API article](https://medium.com/@mtiller/react-16-3-context-api-intypescript-45c9eeb7a384)
- [React Context API for Typescript article](https://medium.com/@mtiller/react-16-3-context-api-intypescript-45c9eeb7a384)
- [React Typescript HOC article](https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb)
- [Material UI Components](https://material-ui.com/)
- [Installing Docker](https://docs.docker.com/compose/install/)
- [Using Docker-Compose](https://medium.com/@paigen11/docker-101-fundamentals-the-dockerfile-b33b59d0f14b)
- [General info for parsing the Dockerfile](https://gist.github.com/remarkablemark/aacf14c29b3f01d6900d13137b21db3a)
