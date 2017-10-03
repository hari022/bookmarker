document.getElementById('myForm').addEventListener('submit', saveData);
var bookmarks = [];
function saveData(e) {

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (validateData(siteName, siteUrl)){
        var bookmark = {
            name: siteName,
            URL: siteUrl
        }

        if(localStorage.getItem('Bookmarks')===null){

            bookmarks.push(bookmark);
            localStorage.setItem('Bookmarks', JSON.stringify(bookmarks));
        } else {
            bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
            bookmarks.push(bookmark);
            localStorage.setItem('Bookmarks', JSON.stringify(bookmarks));
        }
        fetchData();

    }
    e.preventDefault();
}

function validateData(siteName, siteUrl) {

    if((siteUrl && siteName) == ''){
        alert('Please enter Site name and Site url. Thank you:-)')
    }else {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (siteUrl.match(regex)) {
            return true;
        } else {
            alert("Please enter a Valid URL");
            return false;
        }
    }

}

function fetchData() {

    if(localStorage.getItem('Bookmarks')===null){
       document.getElementById('result').innerHTML =
           `<div class="well">
                <h1>No Data Available</h1>
            </div>`;
    } else {
        document.getElementById('result').innerHTML = '';
        bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
        for (var i=0; i<bookmarks.length; i++){
            var name = bookmarks[i].name;
            var URL = bookmarks[i].URL;
            var index = i;
            // console.log(index);
            document.getElementById('result').innerHTML +=
                `<div class="well">
                <h1>${name}</h1>
                <a href="${URL}" target="_blank" class="btn btn-warning">Visit</a>
                <button onclick="removeData(${index})" class="btn btn-danger">Delete</button>
            </div>`;
        }

    }

}

function removeData(i) {
    console.log(i);
    bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
    bookmarks.splice(i,1);
    localStorage.setItem('Bookmarks', JSON.stringify(bookmarks));
    fetchData();

}