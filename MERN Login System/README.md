@ "/" contains the landing page, clicking anywhere brings you to "/login"
@ "/login" will have Sign In form and Sign Up form which will make the below calls.
    - Sign Up: POST to "/api/users/sign-up" data = {email, password, password_confirm}
    - Sign In: POST to "/api/users/sign-in" data = {email, password}

TODO: CSS isn't working as intended
TODO: "/login" page does not have the functionality to swap between Sign In and Sign Up form


Important: MongoDB connection string in "/backend/config/keys.js"
