export const errorMessage = (code: string) => {
  if (code === "auth/invalid-email") {
    return "Email address is not valid";
  }
  if (code === "auth/too-many-requests") {
    return "Too many login attempts";
  }
  if (code === "auth/user-disabled") {
    return "Email has been disabled";
  }
  if (code === "auth/user-not-found") {
    return "User does not exists";
  }
  if (code === "auth/wrong-password") {
    return "Password incorrect";
  }
  if (code === "auth/email-already-in-use") {
    return "There already exists an account with the given email address";
  }
  if (code === "auth/weak-password") {
    return "Password is weak";
  }
  if (code === "auth/network-request-failed") {
    return "Network connection lost. Connect and try again";
  }
};
