document.addEventListener('DOMContentLoaded',()=>{
  //quotes creation ===========================

  let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
  ];
  //function to display a quote randomly ======
  const showRandomQuote = ()=>{
  const quoteDisplay = document.getElementById('quoteDisplay')
  const randomSelector = Math.floor(Math.random()*quotes.length);
  const randomQuote = quotes[randomSelector];
  }
});
