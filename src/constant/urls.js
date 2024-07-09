export const AUTH_PATH = {
    register: "Auth/Register",
    login: "Auth/Login",
    logout: "Auth/Logout",
    refreshToken: "Auth/RefreshToken",
    confirmEmail: "Auth/ConfirmEmail",
    resetPassword: "Auth/ResetPassword",
    forgotPassword: "Auth/ForgotPassword",
    changePassword: "Auth/ChangePassword"
}

export const SERVICE_PATH = {
    getAll: "Services",
    add: "Services"
}

export const COLLABORATOR_PATH = {
    add: "Collaborators/Add",
    update: "Collaborators/Update",
    getProfile: "Collaborators/GetProfile?collaboratorId=",
    getProfileByEmail: "Collaborators/GetProfileByEmail?email=",
    changeStatus: "Collaborators/ChangeStatus",
    getAll: "Collaborators?"
}

export const HOME_PATH = {
    getAll: "Home/GetAll",
    createOrder: "Home/CreateOrder"
}

export const MANAGE_COLLABORATOR_PATH = {
    getAll: "ManageCollaborator/GetAll"
}

export const CUSTOMER_PATH = {
    addReview: "Customer/AddReview",
}

export const JOBS_PATH = {
    getAll: "Jobs",
    createJob: "Jobs",
    applyJob: "Jobs/Apply",
    users: "Jobs/Users/",
    userApplied: "Jobs/UserApplied/"
}

export const ORDER_PATH = {
    getCustomerOrders: "Orders/Customers/",
    getCollaboratorOrders: "Orders/Collaborators/",
    confirmOrder: "Orders/Comfirm?",
    createOrder: "Orders"
}