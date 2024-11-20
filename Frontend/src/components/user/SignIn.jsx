import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();

  /*   const handleSubmitEvent = (e) => {
      e.preventDefault();
      if (input.email !== "" && input.password !== "") {
        auth.signInAction(input);
        return;
      }
      console.log(input.email + " y " + input.password);
      alert("Please provide a valid input");
    }; */

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      auth.signInAction(input)
      .then((response) => {
        console.log("Server response in SignIn.jsx:", response);
        const user = response?.data?.data?.user;
        console.log("User from response:", user);
        if (user && user.featured_image) {
          const avatarUrl = `http://localhost:3000${user.featured_image}`;
          console.log("Avatar URL:", avatarUrl);
          auth.setUserAvatarUrl(avatarUrl);
        } else {
          console.error("Response is missing user or featured_image");
        }
      }).catch((error) => {
        console.error("Error during sign-in:", error);
      });
      return;
    }
    console.log(input.email + " y " + input.password);
    alert("Please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {
    navigate("/");
  }

  return (
    <>
      <form onSubmit={handleSubmitEvent}>
        <div className="form_control">
          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <div className="form_control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        {auth.error && <div style={{ color: "red" }}>{auth.error}</div>}
        <button className="btn-submit">Iniciar Sesión</button>
      </form>
      <button onClick={handleClick}>Ir a Inicio</button>
    </>
  );
};

export default SignIn;