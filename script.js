// Function to handle note upload
function uploadNote() {
    let fileInput = document.getElementById("uploadNotes");
    let file = fileInput.files[0];

    if (file) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        let fileURL = URL.createObjectURL(file); // Create a Blob URL

        notes.push({ name: file.name, url: fileURL });
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}

// Function to display saved notes
function displayNotes(filteredNotes = null) {
    let notesList = document.getElementById("notesList");
    notesList.innerHTML = "";
    let notes = filteredNotes || JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${note.url}" target="_blank">${note.name}</a> 
                        <button onclick="deleteNote(${index})">🗑 Delete</button>`;
        notesList.appendChild(li);
    });
}

// Function to delete a note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

// Function to search notes by name
function searchNotes() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = notes.filter(note => note.name.toLowerCase().includes(query));
    displayNotes(filteredNotes);
}

// Load saved notes when page loads
window.onload = displayNotes;
