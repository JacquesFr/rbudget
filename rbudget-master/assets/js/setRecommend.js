function setRecommend(){
	var user_email = localStorage.getItem("user_Email");
	
	var setHousing = +document.getElementById("setHousing").value;
	var setFood = +document.getElementById("setFood").value;
	var setUtilities = +document.getElementById("setUtilities").value;
	var setSavings = +document.getElementById("setSavings").value;
	var setEducation = +document.getElementById("setEducation").value;
	var setEntertainment = +document.getElementById("setEntertainment").value;
	var setTransportation = +document.getElementById("setTransportation").value;
	var setLoans = +document.getElementById("setLoans").value;
	var setChildCare = +document.getElementById("setChildCare").value;

	var totalPercentage = setHousing + setFood + setUtilities + setSavings + setEducation + setEntertainment + setTransportation + setLoans + setChildCare;
	if(totalPercentage == 100){
		alert("Setting Your New Recommendations");

		var db = firebase.firestore();
		db.collection(user_email).doc("Recommendations").set({
			Housing: setHousing,
			Food: setFood,
			Utilities: setUtilities,
			Savings: setSavings,
			Education: setEducation,
			Entertainment: setEntertainment,
			Transportation: setTransportation,
			Loans: setLoans,
			ChildCare: setChildCare
			})
			.then(function() {
			    console.log("Document successfully written!");
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
		});

		db.collection(user_email).doc("Budget").update({
			selfRecommend: 1
			})
			.then(function() {
			    console.log("Document successfully written!");
			    location.href='homepage.html';
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
		});
	}
	else{
		alert("Values need to add up to 100");
	}

}

function resetCategories(){
	
	var user_email = localStorage.getItem("user_Email");
	var db = firebase.firestore();
	
	db.collection(user_email).doc("Budget").update({
		entertainment: 0,
		housing: 0,
		utilities: 0,
		food: 0,
		transportation: 0,
		education: 0,
		loan_repayment: 0,
		child_care: 0,
		})
		.then(function() {
		    console.log("Document successfully written!");
		    alert("Categories Reset");
		    location.href='homepage.html';
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
	});
}