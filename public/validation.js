
document.getElementById('post-form').onsubmit = () => {
    let author = document.getElementById('author').value.trim();
    let isValid = true;

    if(author === "" || /\d/.test(author)) {
        document.getElementById('err-author').style.display = "block";
        isValid = false;
    }


    return isValid;
}
