## Frontend design
Please update this document whenever design is editted

## View
![1  Log in, Sign up, My Page, and Main-1](https://user-images.githubusercontent.com/43871098/67055504-51fc2680-f183-11e9-8054-ab9ae1476875.png)
![2  Review Upload, Edit, Detail, and Recommendation System-1](https://user-images.githubusercontent.com/43871098/67055518-604a4280-f183-11e9-869a-418687630f33.png)
![3  Adding Friend, and Friend's main-1](https://user-images.githubusercontent.com/43871098/67055626-d6e74000-f183-11e9-8975-509ef646dff7.png) 
#### 1. Login page(/login)
* User can login and go to main page
* User should put correct ID and password to log in
* When user click Login button...
  * if ID and password match...
    * Go to main page
  * else...
    * Alert that ID or password is wrong
    * Stay in `/login` page
* When user clicks Register button...
  * Go to `/sign_up` page
* When user clicks 'sign in with Google' or 'log in with facebook'...
  * With external api pop-up...
  * if user information is not in the server...
    * Web service automatically make the user's account
  * else...
    * Go to `/main` page
#### 2. Sign up page(/sign_up)
* User can register new account
  * ID, password, password confirmation, phone number, nickname are essential inputs
  * email, gender, age, profile image are optional inputs
* Web pops up affairs when typing a field
* When user click Back button...
  * Go to `/login` page again
* When user click Submit button...
  * If essential inputs are not empty and every inputs meet the conditions...
    * Create new account
    * Go to `/main` page
  * Else...
    * Alert the problem('some mandatory inputs are empty', 'password and password confirmation are not equal', etc.)
    * Stay in `/sign_up` page
#### 3. Main page(/main)(#3, #5, #6, #7, #8, #10)
* Users can see their reviews in various ways
  * Default(#3)
    * User can see his/her reviews in most recent order
  * Calendar(#5)
    * If user clicks calendar tab, user can see reviews in calendar
    * If user clicks specific date...
      * user can see reviews he/she wrote at specific date
  * Location(#6)
    * If user clicks location tab, user can see locations of every restaurant which he/she wrote review about
    * If user clicks specific location of restaurant...
      * user can see all reviews of specific he/she wrote
  * Menu Type(#7)
    * If user clicks type tab, user can see list of menu type, such as Chinese food and Korean food
    * If user clicks specific type of menu, user can see list of menus corresponding to its type
    * If user clicks specific menu, then user can see his/her reviews of that specific menu
  * Menu(#8)
    * If user clicks menu tab, user can see list of menu in the order of preference(based on his/her reviews)
    * If user clicks specific menu, then user can see his/her reviews of that specific menu
* When user click See Review button…
  * Go to /main/:id page
* Friends’ list is shown
* User can enter friend’s name on Search text field
* When user click Friend’s profile button…
  * Go to /profile/:id page
* When user click Search button…
  * Friends’ list is replaced by result of search query (#13-1)
* User search result (#13-1) 
  * In user list, user’s profile picture and brief information and Add Friend button is shown
* When user click Add Friend…
  * That user is added as friend
  * Add Friend button is removed
  * Friends’ list is shown again including new friends (#13-2)
#### 4. User Info page(/user_info)
* User can see his/her information
* When user click Back button...
  * Go to `/main` page
* When user click Submit button...
  * If more than one input are changed...
    * Check the conditions
      * If all inputs meet the condition, then edit user info
      * Else, alert and stay in `/user_info` page
    * Go to `/main` page
  * Else...
    * Alert that no input have been changed
    * Stay in `/user_info` page
#### 5. Upload page(/main/upload) (#9)
* User can upload new review
* Food Image, Food Name, Rating are essential inputs
* Comment is an optional input.
* When user click Back button…
  * Go to /main page
* When user click Submit button…
  * If essential inputs are not empty and every inputs meet the conditions…
    * Upload new review
    * Go to /main page
  * Else…
    * Alert the problem(‘food image should be uploaded’, ‘some mandatory inputs are empty’, etc.)
    * Stay in /main/upload page

#### 6. Review page(/main/:id) (#11)
* User can read review in detail
* Detailed information of review is shown
* When user click Back button…
  * Go to /main page 
* When user click Get Recommendation button…
  * Go to /recommendation page
  * Relevant information is passed to recommendation page

#### 7. Recommendation page (/recommendation) (#12)
* When user click Back button…
  * Go to /main/:id page (#12-1)
  * User is moved to previous recommendation page (#12-1 ~ #12-4)
* When user click Next button…
  * User is moved to next recommendation page (#12-1 ~ #12-3)
* Recommendation on selected food (#12-1)
  * User can see list of recommended restaurant for specific food
  * Rating accounted for the recommendation is shown along with restaurants’ names
  * When user click restaurant name…
     * New window about the selected restaurant is shown using Kakaomap API
* Recommendation on Keywords (#12-2)
  * User can see list of recommended food based on keywords of the review
  * When user click Get Recommendation…
     * User will be moved to restaurant recommendation page (#12-1) for the corresponding food
* Recommendation for You (#12-3)
  * User can see list of recommended food based on your reviews
  * When user click Get Recommendation…
     * User will be moved to restaurant recommendation page (#12-1) for the corresponding food
* Recommendation based on friends (#12-4)
  * User can see list of recommended food based on friends’ reviews
  * When user click Get Recommendation…
     * User will be moved to restaurant recommendation page (#12-1) for the corresponding food

#### 8. Friend’s review page(/profile/:id) (#14) 
* User can see friend’s reviews in most recent order
* Review list works like main page
* Home button is shown instead of Logout button.
* When user click Home button…
  * Go to /main page
