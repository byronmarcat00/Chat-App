import * as React from "react";
import { Auth } from "aws-amplify";

const AuthContext = React.createContext({
authState: "default",
setAuthState: () => {},
email: "",
setEmail: () => {},
password: "",
setPassword: () => {},
setVerificationCode: () => {},
verificationCode: "",
isLoading: false,
firstName:"",
setFirstName:() =>{},
setLastName:() =>{},
lastName:"",
setLastName:() =>{},
confirmPassword:"",
setConfirmPassword:() => {},
handleSignIn: () => {},
handleSignUp: () => {},
handleConfirmSignUp: () => {},
handleForgotPassword:() =>{},
handleResendVerificationCode:() =>{}


});

const { Provider } = AuthContext;

function AuthProvider({ children }) {
const [authState, setAuthState] = React.useState("default");
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const [verificationCode, setVerificationCode] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
const [firstName, setFirstName] = React.useState("");
const [lastName, setLastName] = React.useState("");
const [confirmPassword, setConfirmPassword] = React.useState("");

async function handleSignIn() {
  if (!email || !password) {
    alert("Please enter an email and password");
    return;
  }
  try {
    setIsLoading(true);
    const user = await Auth.signIn({
      username: email,
      password,
    });
    setIsLoading(false);
    console.log("user", user);
    setAuthState("signedIn");
  } catch (error) {
    alert(error.message);
    setIsLoading(false);
    console.log(error);
  }
}

async function handleSignUp() {
  if (!email || !password) {
    alert("Please enter an email and password");
    return;
  }
  if(password !== confirmPassword){
    alert("Passwords do not match");
    return ; 
  }


  try {
    setIsLoading(true);
    await Auth.signUp({
      username: email,
      password,

      attributes:{
        given_name:firstName,
        family_name:lastName,
      }

    });
    setAuthState("confirmSignUp");
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    alert(error.message);
    console.log(error);
  }
}

async function handleConfirmSignUp() {
  if (!verificationCode) {
    alert("Please enter verification code");
    return;
  }
  try {
    setIsLoading(true);
    await Auth.confirmSignUp(email, verificationCode);
    alert("Confirmed", "You can now sign in.");
    setAuthState("signIn");
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    alert(error.message);
    console.log(error);
  }
}

async function handleForgotPassword(){
  if(!email){
    alert("Please enter and email");
    return;
  }
  try {

    setIsLoading(true);
    await Auth.forgotPassword(email);
    setAuthState("confirmForgotPassword");
    setIsLoading(false);
  }
  catch(e){
    alert(e.message);
    setIsLoading(false);
  }

}
async function handleResetPassword(){

  if (!verificationCode || verificationCode.length !== 6){
    alert("Please enter a valid verification code");
    return;
  }
  if (password !== confirmPassword){
    alert("Passwords do not match");
    return;
  }
  try {
    setIsLoading(true);
    await Auth.forgotPasswordSubmit(email, verificationCode, password);
    alert("Password reset successfully, Now you can Sign in");
    setAuthState("signIn");
    setIsLoading(false)
  }
  catch(e){
    alert(e.message);
    setIsLoading(false);
  }


}

async function handleResendVerificationCode(){

  try{
    await Auth.resendSignUp(email);
    alert(`Successfully resent confirmation code to ${email}`);
  }
  catch (e){
    alert(e);
  }
}

return (
  <Provider
    value={{
      authState,
      setAuthState,
      email,
      setEmail,
      password,
      setPassword,
      handleSignIn,
      handleSignUp,
      handleConfirmSignUp,
      verificationCode,
      setVerificationCode,
      isLoading,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      confirmPassword,
      setConfirmPassword,
      handleForgotPassword,
      handleResendVerificationCode,
      handleResetPassword,
    }}
  >
    {children}
  </Provider>
);
}

export { AuthContext, AuthProvider };
