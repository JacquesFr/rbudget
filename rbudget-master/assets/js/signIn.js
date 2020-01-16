/* Validate registered user sign in via Firebase */
var mainEmail;

function signIn() {
	email = document.getElementById("login_email").value;
	password = document.getElementById("login_password").value;
	setEmail(email);
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		// Successful login
		//alert("logging in as: " + email);
		location.href = "homepage.html";
	}).catch(function(error) {
	// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
    });
};

function setEmail(email){
	mainEmail = email;
	localStorage.setItem("user_Email", mainEmail);
};

function logout(){
	//alert("Logging out");
	localStorage.clear();
 	firebase.auth().signOut();
 	location.href = "index.html";
};
