//GLOBAL VARIABLES

//var overallBudget;

function deposit(){
	//Getting user information

	var user_email = localStorage.getItem("user_Email");

	//Grabbing variables from fields.
	var depo_budgetInput = +document.getElementById("depositAmnt").value;
	var cat = document.getElementById("drop_deposit_category");
	var depo_category = cat.options[cat.selectedIndex].text;
	var depo_description = document.getElementById("deposit_description").value;
	var total_Budget = +document.getElementById("deposit_budget").value;
	var date = new Date();
	
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var numbers = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
	var d = Date(Date.now()); 
	currDate = d.toString();

	var db = firebase.firestore();

	db.collection(user_email).doc("Budget").collection(months[date.getMonth()]).doc("Day: " + numbers[date.getDate()] + ", " + numbers[date.getHours()] + ":" + numbers[date.getMinutes()] + ":" + numbers[date.getSeconds()]).set({
	    Category: depo_category,
	    Amount: depo_budgetInput,
	    Description: depo_description,
	    Balance: total_Budget,
	    Date: currDate,
		Type: "Deposit",
		Timestamp:firebase.firestore.FieldValue.serverTimestamp()
		})
		.then(function() {
		    console.log("Document successfully written!");
		    location.href='homepage.html';
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);

	});
	alert("Thank You!");
	//location.href = "homepage.html";

}

function withdraw(){
	//Getting user information
	var user_email = localStorage.getItem("user_Email");
	//Grabbing variables from fields.
	var catEntertainment;
	var catHousingRent;
	var catUtilities;
	var catFood;
	var catTransportation;
	var catEducation;
	var catLoanRepay;
	var catChildCare;
	var catSavings;

	var overallbudget = document.getElementById("withdraw_budget").value;
	var with_budgetInput = +document.getElementById("withdrawAmnt").value;
	var cat = document.getElementById("drop_withdraw_category");
	var with_category = cat.options[cat.selectedIndex].text;
	var with_description = document.getElementById("withdraw_description").value;
	var total_Budget = +document.getElementById("withdraw_budget").value;

	var date = new Date();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var numbers = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
	var d = Date(Date.now()); 
	currDate = d.toString();

	var db = firebase.firestore();


	if(overallbudget < with_budgetInput){
		alert("Withdrawing too much!");
		location.href= 'homepage.html';
	}
	else{

		db.collection(user_email).doc("Budget").collection(months[date.getMonth()]).doc("Day: " + numbers[date.getDate()] + ", " + numbers[date.getHours()] + ":" + numbers[date.getMinutes()] + ":" + numbers[date.getSeconds()]).set({
		    Category: with_category.replace(/ /g,"_").toLowerCase(),
		    Amount: with_budgetInput,
		    Description: with_description,
		    Balance: total_Budget,
		    Date: currDate,
			Type: "Withdraw",
			Timestamp:firebase.firestore.FieldValue.serverTimestamp()
			})
			.then(function() {
			    console.log("Document successfully written!");
			    location.href='homepage.html';
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
		});

			db.collection(user_email).doc("Budget").get().then(function(doc) {
				

				catEntertainment = doc.data().entertainment;
				catHousingRent = doc.data().housing;
				catUtilities = doc.data().utilities;
				catFood = doc.data().food;
				catTransportation = doc.data().transportation;
				catEducation = doc.data().education;
				catLoanRepay = doc.data().loan_repayment;
				catChildCare = doc.data().child_care;
				catSavings = doc.data().savings;
				selfRecommended = doc.data().selfRecommend;

				//Recommended Amounts of Budget
				//Entertainment = 10%
				//Housing/Rent = 40%
				//Utilities = 5%
				//Food = 20%
				//Transportation = 5%
				//Debt: Education, Loans, ChildCare = 15%
				//Savings = 5%

				if(selfRecommended == 0){
					if(with_category == "Entertainment"){	//amount to withdraw for a specific Category
						var recomEntertain = overallbudget * .10;	//take the recommended amount from overall
						var tempEntertain = catEntertainment + with_budgetInput;
						if(tempEntertain > recomEntertain){
							alert("Exceeding recommended amount for Entertainment");
						}
					}
					//Savings
					else if(with_category == "Savings"){
						var recomSavings = overallbudget * .05;	//take the recommended amount from overall
						var tempSavings = catSavings + with_budgetInput;
						if(tempSavings > recomSavings){
							alert("Exceeding recommended amount for Savings. Nice Job!");
						}
					}
					//Debts: Child Care & Loans = 10% OR 5% each
					else if(with_category == ("Child Care")){
						var recomChild = overallbudget * .05;
						var tempChild = catChildCare + with_budgetInput;
						if(tempChild > recomChild){
							alert("Exceeding recommended amount for Child Care");
						}
					}//loans
					else if(with_category == ("Loan Repayment")){
						var recomLoans = overallbudget * .05;
						var tempLoans = catLoanRepay + with_budgetInput;
						if(tempLoans > recomLoans){
							alert("Exceeding recommended amount for Loan Repayment");
						}
					}
					//Education
					else if(with_category == ("Education")){
						var recomLoans = overallbudget * .10;
						var tempLoans = catLoanRepay + with_budgetInput;
						if(tempLoans > recomLoans){
							alert("Exceeding recommended amount for Education");
						}
					}
					//Transportation
					else if(with_category == "Transportation"){
						var recomTransportation = overallbudget * .05;	//take the recommended amount from overall
						var tempTransportation = catTransportation + with_budgetInput;
						if(tempTransportation > recomTransportation){
							alert("Exceeding recommended amount for Transportation");
						}
					}

					else if(with_category == "Housing"){
						var recomHousing = overallbudget * .35;
						var tempHousing = catHousingRent + with_budgetInput;
						if(tempHousing > recomHousing){
							alert("Exceeding recommended amount for Housing");
						}
					}

					else if(with_category == "Utilities"){
						var recomUtilities = overallbudget * .05;
						var tempUtilities = catUtilities + with_budgetInput;
						if(tempUtilities > recomUtilities){
							alert("Exceeding recommended amount for Utilities");
						}
					}

					//Food
					else{
						var recomFood = overallbudget * .20;	//take the recommended amount from overall
						var tempFood = catFood + with_budgetInput;
						if(tempFood > recomFood){
							alert("Exceeding recommended amount for Food");
						}
					}
					alert("Thank You");
					//location.href = "homepage.html";
				}
				else{

					db.collection(user_email).doc("Recommendations").get().then(function(doc) {
    // Document was found in the cache. If no cached document exists,
    // an error will be returned to the 'catch' block below.
			   		    education = doc.data().Education;
						entertainment = doc.data().Entertainment;
						food = doc.data().Food;
						housing = doc.data().Housing;
						loans = doc.data().Loans;
						savings = doc.data().Savings;
						transportation = doc.data().Transportation;
						utilities = doc.data().Utilities;
						childCare = doc.data().ChildCare;


						entertainment = entertainment / 100;
						housing = housing / 100;
						utilities = utilities / 100;
						food = food / 100;
						transportation = transportation / 100;
						education = education / 100;
						loans = loans / 100;
						childCare = childCare / 100;
						savings = savings / 100;

					if(with_category == "Entertainment"){	//amount to withdraw for a specific Category
						var recomEntertain = overallbudget * entertainment;	//take the recommended amount from overall
						var tempEntertain = catEntertainment + with_budgetInput;
						if(tempEntertain > recomEntertain){
							alert("Exceeding recommended amount for Entertainment");
						}
					}
					//Savings
					else if(with_category == "Savings"){
						var recomSavings = overallbudget * savings;	//take the recommended amount from overall
						var tempSavings = catSavings + with_budgetInput;
						if(tempSavings > recomSavings){
							alert("Exceeding recommended amount for Savings. Nice Job!");
						}
					}
					//Debts: Child Care & Loans = 10% OR 5% each
					else if(with_category == ("Child Care")){
						var recomChild = overallbudget * childCare;
						var tempChild = catChildCare + with_budgetInput;
						if(tempChild > recomChild){
							alert("Exceeding recommended amount for Child Care");
						}
					}//loans
					else if(with_category == ("Loan Repayment")){
						var recomLoans = overallbudget * loans;
						var tempLoans = catLoanRepay + with_budgetInput;
						if(tempLoans > recomLoans){
							alert("Exceeding recommended amount for Loan Repayment");
						}
					}
					//Education
					else if(with_category == ("Education")){
						var recomLoans = overallbudget * education;
						var tempLoans = catLoanRepay + with_budgetInput;
						if(tempLoans > recomLoans){
							alert("Exceeding recommended amount for Education");
						}
					}
					//Transportation
					else if(with_category == "Transportation"){
						var recomTransportation = overallbudget * transportation;	//take the recommended amount from overall
						var tempTransportation = catTransportation + with_budgetInput;
						if(tempTransportation > recomTransportation){
							alert("Exceeding recommended amount for Transportation");
						}
					}

					else if(with_category == "Housing"){
						var recomHousing = overallbudget * housing;
						var tempHousing = catHousingRent + with_budgetInput;
						if(tempHousing > recomHousing){
							alert("Exceeding recommended amount for Housing");
						}
					}

					else if(with_category == "Utilities"){
						var recomUtilities = overallbudget * utilities;
						var tempUtilities = catUtilities + with_budgetInput;
						if(tempUtilities > recomUtilities){
							alert("Exceeding recommended amount for Utilities");
						}
					}

					//Food
					else{
						var recomFood = overallbudget * food;	//take the recommended amount from overall
						var tempFood = catFood + with_budgetInput;
						if(tempFood > recomFood){
							alert("Exceeding recommended amount for Food");
						}
					}
					alert("Thank You");
					//location.href = "homepage.html";

								console.log("Cached document data:", doc.data());
					}).catch(function(error) {
					    console.log("Error getting cached document:", error);
					}); //first db.collection call
				}
			});
	}
}


function resetFields(element) {
	var clear = document.getElementById(element);
}

function reset_deposit(){
	var clear_deposit = document.getElementById("depositAmnt");		
	var clear_deposit_description = document.getElementById("deposit_description");
	clear_deposit_description.value = '';
	clear_deposit.value = '';
}

function reset_withdraw(){
	var clear_withdraw = document.getElementById("withdrawAmnt");		
	var clear_withdraw_description = document.getElementById("withdraw_description");
	clear_withdraw_description.value = '';
	clear_withdraw.value = '';
}

function getBudget(){

	var user_email = localStorage.getItem("user_Email");
	var budgetSet = document.getElementById("budget");
	var deposit_budget = document.getElementById("deposit_budget");
	var withdraw_budget = document.getElementById("withdraw_budget");

	var db = firebase.firestore();
	
	var docRef = db.collection(user_email).doc("Budget");

	docRef.get().then(function(doc) {

		budgetSet.value = doc.data().overallBudget;
		deposit_budget.value = doc.data().overallBudget;
		withdraw_budget.value = doc.data().overallBudget;

		if(doc.exists){
			console.log("Document data:", doc.data());
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }

		}).catch(function(error) {
		    console.log("Error getting document:", error);
	});
	
}