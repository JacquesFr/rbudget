# R'Budget
![Hello Page](https://i.imgur.com/dZNVa7q.png)
www.rbudget.xyz

Built by: Ashley McDaniel, Jacques Fracchia, Eric Chaing, Alison Nyguen

R'budget is a budgeting app designed with a simple user interface yet built with similar features as a banking app. Once a new user signs up they will be directed to their homepage which displays $0. The user can deposit and withdraw any sum of money for different expense categories. The app records each deposit and withdraw along with its corresponding category and description. The deposit or withdraw will display a log under 'statements' of the most recent month's transaction history. The user can visually see their expenses for a variety of categories in a pie chart and bar chart under 'visuals'. There is a feature that recommends specific percentages of how much the user should spend for a category. When the user withdraws past that percentage, they will get a warning, they can also see a visual pie chart of their recommended percentages and compare it to their own pie chart. If they do not like the current percentages, there is a feature for the user to set their own recommendations. If the user would like to save up for an item there is a 'goals' page. Inside of the goals page they can set a dollar amount and the percentage of their savings to go towards the goal. If they have saved up enough for that item then the page will notify the user that they have reached their goal and will provide a button to reset the goal once the item is purchased.

This app was built using Firestore for the database, HTML5 and CSS for the website, JavaScript for all scripting functions and is hosted by GitHub pages and go daddy.

Features in the future: 
1. An option to view statements from different months out of the year for different years.
2. Improve the response time from the database for new non-cached visits. 
3. Fix functionality in 'contact' page - currently not working.
_________________________________
![Dependencies UML](https://i.imgur.com/QJ1owtI.png)
_________________________________
**Front End**

Index.html:
* Presents to the user what the web app is about. Displays rbudget and created by money management.
* Has buttons “Intro” “about” “contact”
* Each button are clickable and gives a photo and a brief paragraph for each.
* Taskbar: taskbar at the top has “Home” “login” “signup”

Signup.html:
* After clicking “signup” in the taskbar of the index.html you will be redirected to a sign in page
* Sign in asks a user to plug in a valid email, a password and confirm password.
* This information gets processed in the signup.js file where it gets sent to the backend.

Signin.html:
* After clicking “signin” in the taskbar of the index.html you will be redirected to a loginpage
* Sign in asks a user to plug in a registered email and password
* This information gets processed in the signin.js file where it gets sent to the backend.

Homepage.html:
* After the user clicks submit in either the signup page or login page, and the email and password is a valid user they get sent to the homepage.
* The home page presents the users budget under “My Budget: “
* The user then can type in their budget in the field to add or subtract values. 
* Data gets sent to the database to store the value.
* Keeps a log of each entry to graph out their finances in database. This is shown as statements page similar to bank statement. It shows each date, along with balance amount category type and description.
*	Has clickable buttons below that will display “Statement” “Analytics” “Goals” “Profile”. 
*	When the user refreshes page it pulls budget data from database and puts it in the budget field. 
*	Taskbar is now displaying home and logout. Home takes you back to homepage.html
*	Button for deposit and withdraw. User can enter fields for amount, category and description. This data then gets added as a log in each individual users database. 
*	Profile: the user can save their email, name, house address, phone number, and can plug in a photo of themselves.
*	Statement: Shows the log of the users spending, similar to a bank statement.
*	Analytics: Shows two pie charts and one line graph. The pie charts shows the users recommended spending, their actual spending, and the line graph shows them how close over and under their graph is from recommended amounts.
_________________________________________
![Code UML](https://i.imgur.com/aZZ5RbV.png)
_________________________________________
![Interaction UML](https://i.imgur.com/wcM5aZ6.png)
_________________________________________
**Backend**

Signup.js:
* Uses firebase UI authentication to create a new user. Double checks that all fields are filled and uses a valid email address. If it is sends user to the homepage.

Signin.js:
* Uses firebase UI authentication double check that the email and password provided is a valid email. If it is send user to the homepage.

Budget.js:
* GetBudget() retrieves the latest variable stored in the database under budget. Then displays the latest budget in the user’s field when the first log into the homepage.
* SetBudget() checks if the field has been updated with a new budget. If a new value was entered, this function then sends the data from the field into a new log entry for budget inside of the database. 
* Deposit()
  * Grabs values from the deposit fields: “Amount” “Total Budget” “Description”  and “category”. Plugs into the firestore database in the following hierarchy: email->Budget->Month->day HH::MM->log.
* Withdraw()
  *Grabs values from the withdraw fields: “Amount” “Total Budget” “Description”  and “category”. Plugs into the firestore database in the following hierarchy: email->Budget->Month->day HH::MM->log.

Visual.js (Analytics):
*	Analytics displays three graphs:
  * One over/under display that shows each spending category and whether you went over the recommended amount or not
  * Display Categories: displays the amount of money you are spending for each category in a pie chart. If you hover over it, it shows the amount for each category.
  * Recommendations: Displaying the percentage in a pie chart of the recommended spending for each category. You can compare it with the display categories pie chart   to see if it looks similar or not as well. 
  * We displayed the charts using charts library. Where we can plug in n number of variables to display and can plug in our values. 

![Analytics Page](https://i.imgur.com/IMEY18G.png)

 Statements.js
* Helps the user to see their deposits and withdraws

![Statements Page](https://i.imgur.com/V04l3vm.png)

* Works by retrieving the timestamp variable that is stored in the database for each transaction
*When there is a transaction there is a value saved called Timestamp from firebases server timestamp this was necessary to implement to order the data by time accurately 
* Then each statement is sorted by Timestamp from the newest date to the oldest date

Goals.js
* The user can use the Goals page to organize and keep track of their goals
* The user can create up to 3 goals: Goal #1, Goal #2, Goal #3

![Goals Page](https://i.imgur.com/AcRRmTS.png)
  
* Clicking the submit button will save the users entries to the database and reload back to the homepage
* Submitting a new goal will overwrite the previous goal
* The page will save the users data field entries to a variable so that when they go back to this page their data is still there
* To meet their savings requirement we multiply the value that they have withdrawn to savings * Percentage of Savings 
  * Compare this value to how much they want to save and see if the user meets their goal savings requirement
* When the user meets their savings requirements:
  * When the user meets their savings goal requirement the page will show a message for that particular goal saying: “*You have the savings required for goal #(1/2/3)!*”
  * Also when the user meets their savings a PURCHASED button will appear 
  * Clicking the purchased button will  alert the user to “Enjoy their Purchase!’ and withdraw the requirement amount from the users savings category and reload back to the homepage
  * After clicking the purchased button the data field will be reset telling the user to enter a new goal, have 999999 in the amount, and 0 for the percentage for the user to enter a new goal.
