export function validateForm(data) {
    const errors = [];
    if(data.author === "" || /\d/.test(data.author)) {
        errors.push("Invalid author input");
    }
    if(data.title === "") {
        errors.push("Invalid title input");
    }

    if(data.content.length < 10){
        errors.push("Must be more than 10 characters");
    }
    return {
        isValid: errors.length === 0,
        errors
    }
}