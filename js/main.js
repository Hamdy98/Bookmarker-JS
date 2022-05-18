let siteName = document.getElementById('siteName');
let siteUrl = document.getElementById('siteUrl');
let bookmarkContainer = document.getElementById('bookmarkList');
let submitButton = document.getElementById('submitButton');
let searchInput = document.getElementById('searchInput');
let editBookmarkindex;
let arrayOfBookmark;

if(localStorage.getItem('ArrayOfBookmarks') != null) {
  arrayOfBookmark = JSON.parse(localStorage.getItem('ArrayOfBookmarks'));
  disblayBookmarks();
} else {
  arrayOfBookmark = [];
}

function submit() {
  if(validName() && validUrl()) {
    let bookmark = {
      name: siteName.value,
      url: siteUrl.value
    }
  
    arrayOfBookmark.push(bookmark);
    localStorage.setItem("ArrayOfBookmarks", JSON.stringify(arrayOfBookmark));
    disblayBookmarks();
    siteName.value = '';
    siteUrl.value = '';
  }
}

function disblayBookmarks() {
  let temp = '';
  for(let i = 0; i < arrayOfBookmark.length; i++) {
    temp += `
      <div class="parent">
        <h2>${arrayOfBookmark[i].name}</h2>
        <div class="all-buttons">
          <a href="https://${arrayOfBookmark[i].url}" class="btn btn-outline-primary" target="_blank">Visit</a>
          <button class="btn btn-outline-warning" onclick="editBookmark(${i})" id="editButton">Edit</button>
          <button class="btn btn-outline-success" id="addEditButton">Add Edit</button>
          <button class="btn btn-outline-danger" onclick="deleteBookmark(${i})">Delete</button>
        </div>
      </div>
    `
  }
  bookmarkContainer.innerHTML = temp;
}

function deleteBookmark(index) {
  arrayOfBookmark.splice(index, 1);
  localStorage.setItem("ArrayOfBookmarks", JSON.stringify(arrayOfBookmark));
  disblayBookmarks();
}

function editBookmark(index) {
  siteName.value = arrayOfBookmark[index].name;
  siteUrl.value = arrayOfBookmark[index].url;

  document.getElementById('addEditButton').style.display = 'inline';
  submitButton.style.display = 'none';

  editBookmarkindex = index;
}

function addEditBookmark() {
  arrayOfBookmark[editBookmarkindex].name = siteName.value;
  arrayOfBookmark[editBookmarkindex].url = siteUrl.value;

  document.getElementById('addEditButton').style.display = 'none';
  submitButton.style.display = 'inline';

  siteName.value = '';
  siteUrl.value = '';

  localStorage.setItem('ArrayOfBookmarks', JSON.stringify(arrayOfBookmark))

  disblayBookmarks();
}

function search() {
  let temp = '';
  let searchValue = searchInput.value;

  for(let i = 0; i < arrayOfBookmark.length; i++) {
    if(arrayOfBookmark[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
      temp += `
        <div class="parent">
          <h2>${arrayOfBookmark[i].name.replace(searchValue, `<span class="text-info">${searchValue}</span>`)}</h2>
          <div class="all-buttons">
            <a href="https://${arrayOfBookmark[i].url}" class="btn btn-outline-primary" target="_blank">Visit</a>
            <button class="btn btn-outline-warning" onclick="editBookmark(${i})" id="editButton">Edit</button>
            <button class="btn btn-outline-success" id="addEditButton">Add Edit</button>
            <button class="btn btn-outline-danger" onclick="deleteBookmark(${i})">Delete</button>
          </div>
        </div>
      `
    }
  }

  bookmarkContainer.innerHTML = temp;
}

function validName() {
  let regex = /^.{2,30}$/;
  let testValid = false;
  if(regex.test(siteName.value)) {
    document.getElementById('nameError').style.display ='none';
    testValid = true;
  } else {
    document.getElementById('nameError').style.display ='block';
    testValid = false;
  }
  return testValid;
}

function validUrl() {
  let regex = /^(https:\/\/)?[wW]{3}\.\w+\.[a-zA-z]{2,3}(\.eg)?$/;
  let testValid = false;
  if(regex.test(siteUrl.value)) {
    document.getElementById('urlError').style.display = 'none';
    testValid = true;
  } else {
    document.getElementById('urlError').style.display = 'block';
    testValid = false;
  }
  return testValid;
}