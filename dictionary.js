
async function searchWord() {
    const inputWord = document.getElementById("word").value;
    if (inputWord.trim() === "") {
        alert("Please enter a word");
        return;
    }
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayMeaning(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError();
    }
}

function displayMeaning(data) {
    const meaningDiv = document.getElementById("meaning");
    meaningDiv.innerHTML = "";

    if (data.length === 0) {
        meaningDiv.innerHTML = "<p>No results found for the entered word.</p>";
        return;
    }
    const entry = data[0];
    const meanings = entry.meanings.map(meaning => {
        const definition = meaning.definitions[0].definition;
        const example = meaning.definitions[0].example;
        let exampleHtml = "";
        if (example) {
            exampleHtml = `<br><strong>Example:</strong> ${example}`;
        }
        return `<p><strong>${meaning.partOfSpeech}:</strong> ${definition}${exampleHtml}</p>`;
    }).join('');

    const resultHtml = `
      <b>Word</b>:<span>${entry.word}</span>
      <h4>Meaning:</h4><div>${meanings}</div>
    `;
    meaningDiv.innerHTML = resultHtml;
}

function displayError() {
    const meaningDiv = document.getElementById("meaning");
    meaningDiv.innerHTML = "<p>Meaning not found.</p>";
}