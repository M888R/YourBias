
var config = {
  apiKey: "AIzaSyCRIvCVd7eYQrg1lg0c67rXNEwxrN7hbbw",
  authDomain: "yourbias-ff39c.firebaseapp.com",
  databaseURL: "https://yourbias-ff39c.firebaseio.com",
  projectId: "yourbias-ff39c",
  storageBucket: "yourbias-ff39c.appspot.com",
  messagingSenderId: "205620334454"
};

firebase.initializeApp(config);
var companyRef = firebase.database().ref('userfeedback');
document.getElementById("ContactForm").addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  var companyName = getInputVal('cname');
  var rating = getInputVal('alignment');

  saveInput(companyName, rating);
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveInput(companyName, rating) {
  var newCompanyNameRef = companyRef.push();
  newCompanyNameRef.set({
    companyName: companyName,
    rating: rating
  });
}
