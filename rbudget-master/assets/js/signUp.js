/* Create new password based user on Firebase */
var mainEmail;

document.getElementById("signUp_password1")
	.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("enterButton").click();
		}
});

function signUp() {
	email = document.getElementById("signUp_email").value;
	password = document.getElementById("signUp_password0").value;
	confirmPw = document.getElementById("signUp_password1").value;
	
	if (password !== confirmPw) {
		alert("Passwords don't match");
	}
	else if (password.length < 8) {
		alert("Your password must be at least 8 characters long.");
	}
	else {
		//alert("starting firestore");
		var db = firebase.firestore();


		setEmail(email);
		//var budget = 0;


		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function() {
			//alert('registered as: ' + email);
			location.href = 'homepage.html';
		})
		.catch(function(error) {
	  		// Handle Errors here.
	  		var errorCode = error.code;
	  		var errorMessage = error.message;
	  		// github didn't deploy new code
	  		alert(errorMessage);
	  		// ...
		});
	}
};

function setEmail(email){
	mainEmail = email;
	localStorage.setItem("user_Email", mainEmail);
}
