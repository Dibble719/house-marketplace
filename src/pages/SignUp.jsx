import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password, name } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      //target the elements id for more usability
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
        const auth = getAuth();

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user

        updateProfile(auth.currentUser, {
            displayName: name
        })

        navigate('/')
        console.log('success');
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />

            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="Show Password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password?
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button type="submit" className="signUpButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* google OAuth */}

          <Link to="/sign-in" className="registerLink">
            Already have an account?
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
