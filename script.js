
document.addEventListener("DOMContentLoaded", () => {
    const div = document.createElement("div");
    div.style.textAlign = "center";
  
    const input = document.createElement("input");
    input.type = "text";
    input.id = "books";
    input.className="input";
    input.style.marginRight = "10px"; 
  
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.innerHTML = "Search";

    button.addEventListener("click", getData);
  
    const space = document.createTextNode(" "); 
  
   
  
    div.append(input, space, button); 
    document.body.append(div);
  
    const resultContainer = document.createElement("div");
    resultContainer.id = "result-container";
  
    div.append(input, button, resultContainer);
    document.body.append(div);
  
    async function getData() {
      const inputVal = document.getElementById("books").value;
      const url = `https://anapioficeandfire.com/api/books/${inputVal}`;
  
      try {
        const response = await fetch(url);
        const bookData = await response.json();
        
        const bookName = DisplayResultContainer("Book name", bookData.name);
        const isbn = DisplayResultContainer("ISBN", bookData.isbn);
        const numberOfPages = DisplayResultContainer("Number of Pages", bookData.numberOfPages);
        const authors = DisplayResultContainer("Authors", bookData.authors.join(", "));
        const publisher = DisplayResultContainer("Publisher", bookData.publisher);
        const releaseDate = DisplayResultContainer("Release Date", bookData.released);

        const characters = await Promise.all(
            bookData.characters.slice(0, 5).map(async (characterURL, index) => {
              const characterResponse = await fetch(characterURL);
              const characterData = await characterResponse.json();
              return DisplayResultContainer(`Character ${index + 1}`, characterData.name);
            })
          );
          
  
        resultContainer.innerHTML = "";
        resultContainer.append(bookName, isbn, numberOfPages, authors, publisher, releaseDate,...characters);
      } catch (error) {
        console.log(error);
        resultContainer.innerHTML = "Error occurred .Enter valid book Number";
      }
    }
  
    function DisplayResultContainer(label, value) {
      const element = document.createElement("div");
      element.innerHTML = `<strong>${label}:</strong> ${value}`;
      element.style.textAlign="center";
      return element;
    }
  });
  


  