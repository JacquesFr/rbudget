const statementlist = document.querySelector('#statements_log');

//create the element and render the log of statements 
function renderStatement(doc){
	//use li as a tag to identify the document
	 //list

	//Ordering of Statement: date balance amount category type description
	//set attributes of li tag to the id of the document

	//get the date
	let li = document.createElement('dt');
	li.setAttribute('data-id', doc.id); 
	li.setAttribute('id', 'statementlist');
	li.textContent = "Date: " + doc.data().Date ;
	statementlist.appendChild(li);

	//make an unordered list (indents from the main list)

	//get the Balance
	let lis0 = document.createElement('dd');
	lis0.setAttribute('data-id', doc.id); 
	lis0.setAttribute('id', 'statementlist');
	lis0.textContent = "Balance: " + doc.data().Balance;
	statementlist.appendChild(lis0);
	//get the Amount
	let lisA = document.createElement('dd');
	lisA.setAttribute('data-id', doc.id); 
	lisA.setAttribute('id', 'statementlist');
	lisA.textContent = "Amount: " + doc.data().Amount ;
	statementlist.appendChild(lisA);
	//get the Category
	let lisC = document.createElement('dd');
	lisC.setAttribute('data-id', doc.id); 
	lisC.setAttribute('id', 'statementlist');
	lisC.textContent = "Category: " + doc.data().Category ;
	statementlist.appendChild(lisC);
	//get the type
	let lis2 = document.createElement('dd');
	lis2.setAttribute('data-id', doc.id); 
	lis2.setAttribute('id', 'statementlist');
	lis2.textContent = "Type: " + doc.data().Type + " " ;
	statementlist.appendChild(lis2);
	//get the description
	let lis = document.createElement('dd');
	lis.setAttribute('data-id', doc.id); 
	lis.setAttribute('id', 'statementlist');
	lis.textContent =  "Description: " + doc.data().Description ;
	statementlist.appendChild(lis);
	

	//Order: date 
	

}//renderStatement

function statement(){

	var db = firebase.firestore();
	var user_email = localStorage.getItem("user_Email");
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var date = new Date();

	//getting the data from this collection orderBy('Date', 'desc')
	db.collection(user_email).doc("Budget").collection(months[date.getMonth()]).orderBy("Timestamp", "desc").get().then(snapshot => {
	
		// get snapshot of data for each allows us to cycle through each document
		snapshot.docs.forEach(doc => { 
			renderStatement(doc);
			console.log(doc.id);
		})
	})
}

function  deleteStatements(){
	alert("inside delete");
	//this function is needed to clean the old elements off the document 
	//this helps to ensure that there are not repeat elements on the statements log
	document.getElementById("statementlist").reset();
	
	alert("after remove");


}

