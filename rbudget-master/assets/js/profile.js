var db = firebase.firestore();
var user_email = localStorage.getItem("user_Email");

function loadProfile() {
	var profileInfo = document.getElementsByClassName("editable");

	db.collection(user_email).doc("Profile").get().then(function(doc) {
		address = doc.data().address;
		email = doc.data().email;
		name = doc.data().name;
		phone = doc.data().phone;

		// Store current info in browser
		localStorage.setItem("user_Name", name);
		localStorage.setItem("user_Address", address);
		localStorage.setItem("user_Phone", phone);

		profileInfo.namedItem("address").value = address;
		profileInfo.namedItem("email").value = email;
		profileInfo.namedItem("name").value = name;
		profileInfo.namedItem("phone").value = phone;

		profileInfo.namedItem("name").style.fontWeight = "900";
		profileInfo.namedItem("name").style.paddingLeft = "0";
	});
};

function loadProfileImg() {
	var uploadBtn = document.getElementById('upload');
	var profImg = document.getElementById('profileImg');

	uploadBtn.click();
	uploadBtn.onchange = function(event) {
		profImg.src = URL.createObjectURL(uploadBtn.files[0]);
	}
}