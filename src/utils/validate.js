
export const validate = (email,password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password);
    if (!isEmailValid) {
        return "Email is Not valid";
    }
    if (!isPasswordValid){
        return "Password is Not valid";
    }
    return null;
}