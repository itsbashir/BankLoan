// listen for submit 
// document.getElementById('loan-form').addEventListener('submit', calculateResults); // old way without the animation a
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // hide results 
  document.getElementById('results').style.display = 'none'; 

  // show loader 
  document.getElementById('loading').style.display = 'block'; 
  // after 2 seconds show results 
  setTimeout(calculateResults , 2000);

  e.preventDefault(); 
}); // show the loader as soon as the submit button is clicked 


// calculate results function 

function calculateResults() {
  console.log('calculating some maths');
  // UI variables 
  const amount = document.getElementById('amount') ;
  const interest = document.getElementById('interest') ;
  const years = document.getElementById('years') ;
  const monthlyPayment = document.getElementById('monthly-payment') ;
  const totalPayment = document.getElementById('total-payment') ;
  const totalInterest = document.getElementById('total-interest') ;


  // formula's 
  // amount as flot with decials to calculate 
  const principle = parseFloat(amount.value); // taking the amount value inputted by client and turning it to a decimel 
  // calculte interest 
  const calculatedInterest = parseFloat(interest.value) / 100 /12 ; // returns that calculted interest per month 

  // calculated payments 
  const calculatedPayments = parseFloat(years.value) *12; 

  // monthly payment 
  const x = Math.pow(1 + calculatedInterest, calculatedPayments) ; // 
  const monthly = (principle*x*calculatedInterest)/ (x-1) ; // return the our monthely payment 

  // check the monthly number if its finite
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2); //fix to two decimals to return the value 
    totalPayment.value = (monthly * calculatedPayments).toFixed(2); // returns total payment
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2) ; // returns totoal interest amount  

    // results to show after 2s
    document.getElementById('results').style.display = 'block'; 
    // hide loading 
  document.getElementById('loading').style.display = 'none'; 
  } else {

    console.log('incorrect ');

    // create element with custom function 

    showError('Please double check your numbers?');
  } 

  
  // // prevent default behavior 
  // e.preventDefault();
};

// show Erro 
function showError(error) {
    // hide results
    document.getElementById('results').style.display = 'none'; 
    // hide loading 
    document.getElementById('loading').style.display = 'none'; 
  // create div in the dom 
  const errorDiv = document.createElement('div');
  
  // Get elements

  const card = document.querySelector('.card');
  const heading= document.querySelector('.heading');
  

  // with Bootstap add class 
  errorDiv.className = 'alert alert-danger';

  // creat textNode
  errorDiv.appendChild(document.createTextNode(error)); // append child to insert something to it. create text node, what ever the text was passed ia the error 

  // insert error above heading 
  card.insertBefore(errorDiv, heading); // take the parent which is the card and you pass the element you want to add/put in and what you want to insert 

  // clear the warning 
  setTimeout(clearError, 3000); // setTimeout and remove to from the window 

}

// clear error function 
function clearError() {
  document.querySelector('.alert').remove();
;}

// 