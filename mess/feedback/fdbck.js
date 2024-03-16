 // Select all elements with the "i" tag and store them in a NodeList called "stars"
 const stars1 = document.querySelectorAll(".stars1 i");
 const stars2 = document.querySelectorAll(".stars2 i");
 const stars3 = document.querySelectorAll(".stars3 i");

 // Loop through the "stars" NodeList
 stars1.forEach((star1, index1) => {
   // Add an event listener that runs a function when the "click" event is triggered
   star1.addEventListener("click", () => {
     // Loop through the "stars" NodeList Again
     stars1.forEach((star1, index2) => {
       // Add the "active" class to the clicked star and any stars with a lower index
       // and remove the "active" class from any stars with a higher index
       index1 >= index2 ? star1.classList.add("active") : star1.classList.remove("active");
     });
   });
 });
 // Loop through the "stars" NodeList
 stars2.forEach((star2, index1) => {
   // Add an event listener that runs a function when the "click" event is triggered
   star2.addEventListener("click", () => {
     // Loop through the "stars" NodeList Again
     stars2.forEach((star2, index2) => {
       // Add the "active" class to the clicked star and any stars with a lower index
       // and remove the "active" class from any stars with a higher index
       index1 >= index2 ? star2.classList.add("active") : star2.classList.remove("active");
     });
   });
 });
 // Loop through the "stars" NodeList
 stars3.forEach((star3, index1) => {
   // Add an event listener that runs a function when the "click" event is triggered
   star3.addEventListener("click", () => {
     // Loop through the "stars" NodeList Again
     stars3.forEach((star3, index2) => {
       // Add the "active" class to the clicked star and any stars with a lower index
       // and remove the "active" class from any stars with a higher index
       index1 >= index2 ? star3.classList.add("active") : star3.classList.remove("active");
     });
   });
 });