//This function is for the user to set their goals and save it to the firestore database
function setGoal1(){
    //Goal #1
    var db = firebase.firestore();

    var user_email = localStorage.getItem("user_Email");
    var goal_deposit = +document.getElementById("deposit_budget_goal").value;
    var goalDescription = document.getElementById("goal_description").value;
    var goalPercentage = document.getElementById("percentage_goal").value;
    db.collection(user_email).doc("Budget").collection("goals").doc("Goal_1").set({
        //inputs
     GoalAmount: goal_deposit,
     GoalDescription1: goalDescription,
     goalPercentage1: goalPercentage,

    })
        .then(function() {
		    console.log("Document successfully written!");
            alert("You Have Set A Budget For Goal #1!");
		    location.href='homepage.html';
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
    });

}//function

function setGoal2(){
     ///Goal#2
    var user_email = localStorage.getItem("user_Email");
    var goal_deposit2 = +document.getElementById("deposit_budget_goal2").value;
    var goalDescription2 = document.getElementById("goal_description2").value;
    var goalPercentage2 = document.getElementById("percentage_goal2").value;
    db.collection(user_email).doc("Budget").collection("goals").doc("Goal_2").set({
        //inputs
     GoalAmount: goal_deposit2,
     GoalDescription1: goalDescription2,
     goalPercentage1: goalPercentage2
    })
        .then(function() {
            console.log("Document successfully written!");
            alert("You Have Set A Budget For Goal #2!");
            location.href='homepage.html';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
    });

}

function setGoal3(){
     ///Goal#3
    var user_email = localStorage.getItem("user_Email");
    var goal_deposit3 = +document.getElementById("deposit_budget_goal3").value;
    var goalDescription3 = document.getElementById("goal_description3").value;
    var goalPercentage3 = document.getElementById("percentage_goal3").value;
    db.collection(user_email).doc("Budget").collection("goals").doc("Goal_3").set({
        //inputs
     GoalAmount: goal_deposit3,
     GoalDescription1: goalDescription3,
     goalPercentage1: goalPercentage3
    })
        .then(function() {
            console.log("Document successfully written!");
            alert("You Have Set A Budget For Goal #3!");
            location.href='homepage.html';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
    });
    //Let the user know they have made a goal
}

//the getGoals function will be called when the goals page is loaded
function getGoals(){
    //This will allow the page to display the users info that they previously wrote

    //get the database
    var db = firebase.firestore();
    //Goal#1 Pull Information
    var user_email = localStorage.getItem("user_Email");
    var goal_deposit = document.getElementById("deposit_budget_goal");
    var goalPercentage =  document.getElementById("percentage_goal");
    var goalDescription = document.getElementById("goal_description");
    var savingsAmount;
   
    db.collection(user_email).doc("Budget").get().then(function(doc) {

        savingsAmount = doc.data().savings;

        db.collection(user_email).doc("Budget").collection("goals").doc("Goal_1").get().then(function(doc) {
            goal_deposit.value = doc.data().GoalAmount;
            goalPercentage.value = doc.data().goalPercentage1;
            goalDescription.value = doc.data().GoalDescription1;

            percentage = +doc.data().goalPercentage1;
            amount = doc.data().GoalAmount;
            percentage = percentage / 100;
            perchased1 = doc.data().purchased1;

    		if(doc.exists){
    			console.log("Document data:", doc.data());
                ////Generate An html statement if the user has met their goal reqs////
                //Check the users savings to see if the user has met their goal
                if(((savingsAmount * percentage) >= amount)){
                    var newDiv = document.createElement("h2");
                    var newContent = document.createTextNode("*You have the savings required for Goal #1 !*");
                    newDiv.appendChild(newContent);
                    var element1 = document.getElementById("goal1");
                    element1.appendChild(newDiv);
                    

                    var newButton = document.createElement("button");
                    var buttonContent = document.createTextNode("Purchased");
                    newButton.appendChild(buttonContent);
                    var button1 = document.getElementById("submitPurchaseButton1");
                    button1.style.float = 'left';
                    button1.style.display = 'inline-block';
                    button1.style.position = 'relative';
                    button1.appendChild(newButton);


                    button1.addEventListener("click", purchase1);
   
                } 

    	    } else {
    	        // doc.data() will be undefined in this case
    	        console.log("No such document!");
    	    }

    		}).catch(function(error) {
    		    console.log("Error getting document:", error);
        });

    console.log("Cached document data:", doc.data());
    }).catch(function(error) {
        console.log("Error getting cached document:", error);
    }); //first db.collection call

    function purchase1(){
         db.collection(user_email).doc("Budget").get().then(function(doc) {

            savingsAmount = doc.data().savings;

            db.collection(user_email).doc("Budget").collection("goals").doc("Goal_1").get().then(function(doc) {
                amount = doc.data().GoalAmount;

                savingsAmount = savingsAmount - amount;

                db.collection(user_email).doc("Budget").update({
                    savings: savingsAmount

                });

                db.collection(user_email).doc("Budget").collection("goals").doc("Goal_1").set({
                     GoalAmount: 999999,
                     GoalDescription1: "Enter New Goal",
                     goalPercentage1: 0,

                    })
                    .then(function() {
                        console.log("Document successfully written!");
                        alert("Enjoy Your New Purchase")
                        location.href='homepage.html';
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                });


            });
        });
        
    }

    //GOAL#2/////////////////////////////////////////////////////////////
     //Goal#2 
     var user_email = localStorage.getItem("user_Email");
     var goal_deposit2 = document.getElementById("deposit_budget_goal2");
     var goalDescription2 = document.getElementById("goal_description2");
     var goalPercentage2 = document.getElementById("percentage_goal2");
     db.collection(user_email).doc("Budget").get().then(function(doc) {

        savingsAmount = doc.data().savings;

        db.collection(user_email).doc("Budget").collection("goals").doc("Goal_2").get().then(function(doc) {
            goal_deposit2.value = doc.data().GoalAmount;
            goalPercentage2.value = doc.data().goalPercentage1;
            goalDescription2.value = doc.data().GoalDescription1;

            percentage = +doc.data().goalPercentage1;
            amount = doc.data().GoalAmount;
            percentage = percentage / 100;
            
    		if(doc.exists){
    			console.log("Document data:", doc.data());
                ////Generate An html statement if the user has met their goal reqs////
                //Check the users savings to see if the user has met their goal
                if((savingsAmount * percentage) >= amount){
                    var newDiv = document.createElement("h2");
                    var newContent = document.createTextNode("*You have the savings required for Goal #2 !*");
                    newDiv.appendChild(newContent);
                    var element1 = document.getElementById("goal2");
                    element1.appendChild(newDiv);
                    

                    var newButton = document.createElement("button");
                    var buttonContent = document.createTextNode("Purchased");
                    newButton.appendChild(buttonContent);
                    var button2 = document.getElementById("submitPurchaseButton2");
                    button2.style.float = 'left';
                    button2.style.display = 'inline-block';
                    button2.style.position = 'relative';

                    button2.appendChild(newButton);

                    button2.addEventListener("click", purchase2);

                    
                } 

    	    } else {
    	        // doc.data() will be undefined in this case
    	        console.log("No such document!");
            }
        

    		}).catch(function(error) {
    		    console.log("Error getting document:", error);
        });

    console.log("Cached document data:", doc.data());
    }).catch(function(error) {
        console.log("Error getting cached document:", error);
    }); //first db.collection call

    function purchase2(){
         db.collection(user_email).doc("Budget").get().then(function(doc) {

            savingsAmount = doc.data().savings;

            db.collection(user_email).doc("Budget").collection("goals").doc("Goal_2").get().then(function(doc) {
                amount = doc.data().GoalAmount;

                savingsAmount = savingsAmount - amount;

                db.collection(user_email).doc("Budget").update({
                    savings: savingsAmount

                });

                db.collection(user_email).doc("Budget").collection("goals").doc("Goal_2").set({
                     GoalAmount: 999999,
                     GoalDescription1: "Enter New Goal",
                     goalPercentage1: 0,
                    
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                        alert("Enjoy Your New Purchase")
                        location.href='homepage.html';
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                });
            });
        }); 
        
    }



    //////////////////
    //Goal#3/////////////////////////////////////////////////
    
     var user_email = localStorage.getItem("user_Email");
     var goal_deposit3 = document.getElementById("deposit_budget_goal3");
     var goalDescription3 = document.getElementById("goal_description3");
     var goalPercentage3 = document.getElementById("percentage_goal3");

     db.collection(user_email).doc("Budget").get().then(function(doc) {

        savingsAmount = doc.data().savings;

        db.collection(user_email).doc("Budget").collection("goals").doc("Goal_3").get().then(function(doc) {
            goal_deposit3.value = doc.data().GoalAmount;
            goalPercentage3.value = doc.data().goalPercentage1;
            goalDescription3.value = doc.data().GoalDescription1;

            percentage = +doc.data().goalPercentage1;
            amount = doc.data().GoalAmount;
            percentage = percentage / 100;
            
    		if(doc.exists){
    			console.log("Document data:", doc.data());
                ////Generate An html statement if the user has met their goal reqs////
                //Check the users savings to see if the user has met their goal
                if((savingsAmount * percentage) >= amount){
                    var newDiv = document.createElement("h2");
                    var newContent = document.createTextNode("*You have the savings required for Goal #3 !*");
                    newDiv.appendChild(newContent);
                    var element1 = document.getElementById("goal3");
                    element1.appendChild(newDiv);
                    

                    var newButton = document.createElement("button");
                    var buttonContent = document.createTextNode("Purchased");
                    newButton.appendChild(buttonContent);
                    var button3 = document.getElementById("submitPurchaseButton3");
                    button3.style.float = 'left';
                    button3.style.display = 'inline-block';
                    button3.style.position = 'relative';

                    button3.appendChild(newButton);

                    button3.addEventListener("click", purchase3);
                    
                } 

    	    } else {
    	        // doc.data() will be undefined in this case
    	        console.log("No such document!");
            }
        

    		}).catch(function(error) {
    		    console.log("Error getting document:", error);
        });

    console.log("Cached document data:", doc.data());
    }).catch(function(error) {
        console.log("Error getting cached document:", error);
    }); //first db.collection call

    function purchase3(){
        db.collection(user_email).doc("Budget").get().then(function(doc) {

            savingsAmount = doc.data().savings;

            db.collection(user_email).doc("Budget").collection("goals").doc("Goal_3").get().then(function(doc) {
                amount = doc.data().GoalAmount;

                savingsAmount = savingsAmount - amount;

                db.collection(user_email).doc("Budget").update({
                    savings: savingsAmount
                });

                db.collection(user_email).doc("Budget").collection("goals").doc("Goal_3").set({
                     GoalAmount: 999999,
                     GoalDescription1: "Enter New Goal",
                     goalPercentage1: 0,
                })
                    .then(function() {
                        console.log("Document successfully written!");
                        alert("Enjoy Your New Purchase")
                        location.href='homepage.html';
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                });
            });
        }); 
    }
}
    