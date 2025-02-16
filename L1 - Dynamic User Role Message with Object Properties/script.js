function Access(user) {
    const message = user.role === 'admin' 
        ? (user.active ? "Admin Access Granted!" : "Admin Access Revoked")
        : user.role === 'user'
            ? (user.active ? "User Access Granted!" : "User Access Revoked")
            : "Access Denied";

    return message;
}
let user1 = { name: "Alice", role: "admin", active: false };
console.log(Access(user1));

