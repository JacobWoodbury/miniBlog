alert("Connected");

document.getElementById('post-form').onsubmit = () => {
    clearErrors();
    let author = document.getElementById('author').value.trim();
    let isValid = true;
    let title = document.getElementById('title').value.trim();

    if(author === "" || author.isInteger === true) {
        document.getElementById('err-author').style.display = "block";
        isValid = false;
    }
    if(title === "") {
        document.getElementById('err-title').style.display = "block";
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