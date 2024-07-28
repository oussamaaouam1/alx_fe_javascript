document.addEventListener('DOMContentLoaded',()=>{
  //quotes creation ===========================

  let quotes =  [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
  ] && JSON.parse(localStorage.getItem('quotes'));

  // Function to save quotes to local storage
  const saveQuotes = ()=>{
    localStorage.setItem('quotes',JSON.stringify(quotes));
    console.log(quotes);
  }

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
  //creat a function to add quotes by the user======
  const createAddQuoteForm = ()=>{
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText && newQuoteCategory) {
      //if the input is true===
      //add the txt and category vaalues to the quotes array =====
      quotes.push({text:newQuoteText , category:newQuoteCategory});
      if (newQuoteCategory!==''&&newQuoteText!=='') {
        alert('quotes add successfully');
      }
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
    }
    else if (newQuoteCategory =="" || newQuoteText =="") {
      alert('please enter a valid text and category')
    };
  }
      // Function to export quotes to a JSON file
  const exportQuotes = () => {
    const jsonString = JSON.stringify(quotes);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  };

  //emplement filter by categories function

  const filterQuotes = ()=>{
    const populateCategories = document.getElementById('categoryFilter');
    const selectedCategory = [...new Set(quotes.map(quote => quote.category))];
    selectedCategory.forEach(category => {
      const option = document.createElement('option');
      option.value=category;
      option.textContent= category;
      populateCategories.appendChild(option);
    });
  }
  //fetch the data from the server and return an array contain text and category
  const fetchQuotesFromServer = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();
        return serverQuotes.map(quote => ({ text: quote.body, category: 'General' }));
    } catch (error) {
        console.error('Failed to fetch quotes from the server:', error);
        return [];
    }
  };
  //sync the local quotes with server quotes
  const syncQuotes = async () => {
    const serverQuotes = await fetchQuotesFromServer();
    const newQuotes = [...new Set([...serverQuotes, ...quotes])];
    quotes.length = 0;
    quotes.push(...newQuotes);
    saveQuotes();
    alert('Quotes synced successfully!');
    showRandomQuote();
  };
  // Function to periodically sync quotes
  const startPeriodicSync = (interval = 60000) => {
    setInterval(async () => {
        await syncQuotes();
    }, interval);
  };


  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteButton').addEventListener('click',createAddQuoteForm);
  document.getElementById('addQuoteButton').addEventListener('click',saveQuotes);
  document.getElementById('exportQuotes').addEventListener('click',exportQuotes);
  document.getElementById('importFile').addEventListener('click',importFromJsonFile);
  filterQuotes();
});
