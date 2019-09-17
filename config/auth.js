exports.isAuthenticated = (context) => {
    if (context.user) {
        return true;
    }
    throw new Error('User is not logged in (or authenticated).');
};
exports.isSuper = (context) => {
    if (context.user) {
        console.log(context.user.type)
        if (context.user.type === "admin") return true;
    }
    throw new Error('User is not logged in (or authenticated).');
};
exports.isStaff = (context) => {
    if (context.user) {
        console.log(context.user.type)
        if (context.user.type === "admin") return true;
        else if (context.user.type === "staff") return true;
    }
    throw new Error('User is not logged in (or authenticated).');
};