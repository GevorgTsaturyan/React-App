const languages = {
    translations: [
        { language: "en", signUp: "Sign Up", emailPlaceholder: "Enter your e-mail", emailReq: "eMail is required", passPlaceholder: "Enter your password", reqPass: "Password is required", confPass: "Confirm your password", reqConfPass: "Confirming Password is required", namePlaceholder: "Enter your name", nameReq: "Name is required", question: "Already registered?", logIn: 'Log in',logInQuestion: "Are you here for the first time?"},
        { language: "ru", signUp: 'Зарегистрироваться', emailPlaceholder: "Введите адрес электронной почты", emailReq: "Требуется электронная почта", passPlaceholder: "Введите свой пароль", reqPass: "Пароль необходим ", confPass: "Подтвердите ваш пароль", reqConfPass: "Требуется подтверждение пароля", namePlaceholder: "Введите ваше имя", nameReq: "Введите ваше имя", question: "Уже зарегистрирован?", logIn: "Вход в почту", logInQuestion: "Вы здесь впервые?"},
    ],
   
    
    currentLang: function (language) {
        let selectedTranslation = this.translations.filter((translation) => translation.language == language);
        return selectedTranslation[0];
     }
    

}
export default languages;
