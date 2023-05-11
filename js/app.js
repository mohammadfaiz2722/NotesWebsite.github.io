// localStorage.clear()
shownotes();

//If user add a note, add it to the localStorage
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', () => {
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    let addTxt = document.getElementById('addTxt');
    let addtitle=document.getElementById('addTitle')
    let notesElem = document.getElementById('notes');
    if(addtitle.value=="")
    {
        notesElem.innerHTML=`<div class="alert alert-danger" role="alert">
        OOPs.. Please right your title
      </div>`
}
else if(addTxt.value=="")
{
    // alert("OOPs.. Please right your note")
    notesElem.innerHTML=`<div class="alert alert-danger" role="alert">
    OOPs.. Please right your notes
  </div>`
    }
    else{

        if (notes == null && title==null) {
            notesObj = [];
            titleobj=[];
        }
        else {
            notesObj = JSON.parse(notes);
            titleobj = JSON.parse(title);
        }
        notesObj.push(addTxt.value);
        titleobj.push(addtitle.value);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        localStorage.setItem('title', JSON.stringify(titleobj));
        addTxt.value = "";
        addtitle.value = "";
        shownotes();
    }
})
//Functions to show element from localStorage
function shownotes() {
    let notes = localStorage.getItem('notes');
    let title= localStorage.getItem('title');
    if (notes == null && title==null) {
        notesObj = [];
        titleobj=[];
    }
    else {
        notesObj = JSON.parse(notes);
        titleobj= JSON.parse(title);
    }
    let html = [];
    notesObj.forEach((element, index) => {
        html += `<div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5>${titleobj[index]}</h5>
            <p class="card-text">${element}</p>
            <button  class="btn btn-primary" id="index" onclick="deleteNode(this.id)">Delete Note</button>
        </div>
    </div>`
    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0 && titleobj.length!=0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to the add notes`;
    }
}
//functions to delete a note
function deleteNode(index) {
    let notes = localStorage.getItem('notes');
  
    // console.log("I am deleting",index);
    if (notes == null ) {
        notesObj = [];
        titleobj= [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}
//Searching the notes
let search = document.getElementById('searchtxt');
search.addEventListener('input', () => {

    let inputval = search.value.toLowerCase();
    // console.log("Input event fired!",inputval);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((element) => {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';

        }
    })
})

// Further features
// 1.Add title
// 2.Mark a note as important