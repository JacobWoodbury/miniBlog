export function validateForm(data) {
    const errors = [];
    if(data.author === "" || author.isInteger === true) {
        error.push("Invalid author input");
    }
    if(data.title === "") {
        error.push("Invalid title input");
    }

    if(data.content.length < 10){
        error.push("Must be more than 10 characters");
    }
    return {
        isValid: errors.length === 0,
        errors
    }
}