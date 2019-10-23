## Backend design
Please update this document whenever design is editted

This is Django API for our application.

| Model | API | GET | POST | PUT | DELETE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| User | ``` api/sign_up ``` | X | Create new user | X | X |
| | ``` api/sign_in ``` | X | Log in | X | X |
| | ``` api/sign_out ``` | Log out | X | X | X |
| | ``` api/user ``` | Get user info | X | Edit user info | X |
| | ``` api/friend ``` | Get friend list | Add new friend | X | X |
| | ``` api/friend/:friend_id ``` | Get specified friend | X | X | Delete specified friend |
| Review | ``` api/review ``` | Get review list | Create new review | X | X |
| | ``` api/review/:review_id ``` | Get specified review | X | Edit specified review | Delete specified review |
| Restaurant | ``` api/restaurant ``` | Get restaurant recommendation list | X | X | X |

