

document.getElementById('post-form').onsubmit = () => {
    clearErrors();
    let isValid = true;
    let author = document.getElementById('author').value.trim();
    let title = document.getElementById('title').value.trim();
    let content = document.getElementById('content').value.trim();

    if(author === "" || /\d/.test(author)) {
        document.getElementById('err-author').style.display = "block";
        isValid = false;
    }
    if(title === "") {
        document.getElementById('err-title').style.display = "block";
        isValid = false;
    }

    if(content.length < 10){
        document.getElementById('err-content').style.display = "block";
        isValid = false;
    }

    return isValid;
}


function clearErrors()
{
    let errors = document.getElementsByClassName("error");
    for(let i = 0; i < errors.length; i++)
    {
        errors[i].style.display = "none";
    }
}