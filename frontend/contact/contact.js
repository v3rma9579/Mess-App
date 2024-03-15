const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

var phoneInput = document.querySelector('input[name="phone"]');

 
  phoneInput.addEventListener('input', function(event) {
    
    var phone = event.target.value;

    
    var cleaned = phone.replace(/\D/g, '');

    
    if (cleaned.length === 10) {
      
      phoneInput.setCustomValidity('');
    } else {
      
      phoneInput.setCustomValidity('Phone number must be 10 digits');
    }
  });
