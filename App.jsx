import "./App.css";
import { useState } from "react";
import { registerUser } from "./services/registerUser";

export function App() {
  const [error, setError] = useState({
    email: undefined,
    name: undefined,
    age: undefined,
    password: undefined,
    passwordChecks: undefined,
    terms: undefined,
  });
  const [terms, setTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordChecks, setPasswordChecks] = useState("");

  function HandleonSubmit(event) {
    event.preventDefault();
    console.log({ error: error });

    // Llama a la función de registro aquí
    registerUser({ email, name, age, password, passwordChecks, terms });
  }

  function handleonChangeEmail(event) {
    const emailValue = event.target.value;

    if (!emailValue) {
      setError({ ...error, email: "email is required" });
    } else if (!emailValue.includes("@")) {
      setError({ ...error, email: "email is invalid" });
    } else {
      setError({ ...error, email: false });
    }

    setEmail(emailValue);
  }

  function handleonChangeName(event) {
    const nameValue = event.target.value;
    if (!nameValue) {
      setError({ ...error, name: "name is required" });
    } else {
      setError({ ...error, name: false });
    }
    setName(nameValue);
  }

  function handleOnChangeAge(event) {
    const ageValue = parseInt(event.target.value, 10);

    if (isNaN(ageValue) || !ageValue) {
      setError({ ...error, age: "age is required" });
    } else if (ageValue < 18) {
      setError({ ...error, age: "you must be above 18 to register" });
    } else {
      setError({ ...error, age: false });
    }

    setAge(ageValue);
  }

  function handleOnChangePassword(event) {
    const passwordValue = event.target.value;
  
    if (!passwordValue.length) {
      setError({ ...error, password: "password is required" });
    } else if (passwordValue.length <= 3) {
      setError({ ...error, password: "password is too short" });
    } else {
      setError({ ...error, password: false });
    }
  
    setPassword(passwordValue);
  }

  function handleOnChangePasswordChecks(event) {
    const passwordChecksValue = event.target.value;

    if (passwordChecksValue !== password) {
      setError({ ...error, passwordChecks: "passwords do not match" });
    } else {
      setError({ ...error, passwordChecks: false });
    }

    setPasswordChecks(passwordChecksValue);
  }

  function handleOnChangeCheckbox() {
    setTerms(!terms);

    if (!terms) {
      setError({
        ...error,
        terms: "please read and accept the terms and conditions",
      });
    } else {
      setError({ ...error, terms: false });
    }
  }



return (
  <div>
    <form onSubmit={HandleonSubmit}>
      <div>
        <label>
          Email
          <input type="email" placeholder="Email" onChange={handleonChangeEmail} />
        </label>
        <span className="error" role="alert">
          {error.email}
        </span>
      </div>
      <div>
        <label>
          Name
          <input type="text" placeholder="Name" onChange={handleonChangeName} />
        </label>
        <span className="error" role="alert">
          {error.name}
        </span>
      </div>
      <div>
        <label>
          Age
          <input type="text" placeholder="18" onChange={handleOnChangeAge} />
        </label>
        <span className="error" role="alert">
          {error.age}
        </span>
      </div>
      <div>
        <label>
          Password
          <input type="password" placeholder="--------" onChange={handleOnChangePassword} />
        </label>
        <span className="error" role="alert">
          {error.password}
        </span>
      </div>
      <div>
        <label>
          Password check
          <input type="password" placeholder="--------" onChange={handleOnChangePasswordChecks} />
        </label>
        <span className="error" role="alert">
          {error.passwordChecks}
        </span>
      </div>
      <label>
      <input name="terms" type="checkbox" onChange={handleOnChangeCheckbox} />
          Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Pellentesque pharetra, tortor ac placerat
          elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
          Suspendisse non neque et neque facilisis convallis. Praesent erat
          magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
          Vestibulum congue neque metus.
        </label>
            <span className="error" role="alert">
              {error.terms}
            </span>

        <div>
          <button disabled={Object.values(error).some((e) => e) || !terms} onClick={registerUser({ email, name, age, password, passwordChecks, terms })}>Sign up</button>
        </div>
      </form>
    </div>
  );
}