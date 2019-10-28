20191028) Modified History
  1) USE YARN INSTEAD NODE FOR MANAGING DEPENDENCY: using npm and yarn together can cause dependency problem.

  2) Added dependency:
  `semantic-ui-react`, `semantic-ui-css`: Use the semantic UI while developing frontend. Additional CSS feature should be handled on later Sprint. Refer to ![Semantic UI official homepage](https://react.semantic-ui.com/usage).
  `react-router` and `react-router-dom` for routing.

  3) Made mock login page: since we will start developing login and user services in sprint 4.

  4) Set Absoulte path to /src : refer to ![How to Setting the absolute path in React](https://stackoverflow.com/questions/56437517/how-to-add-jsconfig-json-to-existing-vscode-project-w-o-breaking-it).

20191029 second commit log

 1) edited travis setting file: use yarn instaed of npm
 
 2) Added dependency: `redux`, `react-redux`, `axios`, `redux-thunk`, `connected-react-router`

 3) Setup Action and Reducer:
  I seperated actionTypes and reducer for three models; user, review, and recommendation.
  Although it might be seem too complicated, I divided it into small parts because it will be easier to test and debug our app, I think.

  I might missed some actions so you guys add / modify at your own and please notify by github issue / commit log / design and implementation wiki file.

  I DID NOT IMPLEMENTED reducers, because it is up to our implementation of each component.

 4) Modified package.json; proxy = "localhost:8000"