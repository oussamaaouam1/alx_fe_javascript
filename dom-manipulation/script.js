document.addEventListener('DOMContentLoaded',()=>{
  //quotes creation ===========================

  let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
  ];
  //function to display a quote randomly ======
  const showRandomQuote = ()=>{
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomSelector = Math.floor(Math.random()*quotes.length);
  const randomQuote = quotes[randomSelector];
  quoteDisplay.innerHTML='';
    //creat a parag to display the quote=======
  const quoteTextElement = document.createElement('p');
  quoteTextElement.textContent = `${randomQuote.text}`;
  const quoteCategoryElement = document.createElement('p');
  quoteCategoryElement.textContent = `-${randomQuote.category}`
  //append child to display the quotes============
  quoteDisplay.appendChild(quoteTextElement);
  quoteDisplay.appendChild(quoteCategoryElement);
  }
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
});
