import { useState, useEffect, useReducer } from "react";
import { registerWithEmail, signInWithGoogle } from "@/services";
import { isUsernameAvailable, validateUsername } from "@/helpers";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  usernameError: null,
  usernameAvailable: null,
  checkingUsername: false,
};

function signupReducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_USERNAME_ERROR":
      return { ...state, usernameError: action.payload };
    case "SET_USERNAME_AVAILABLE":
      return { ...state, usernameAvailable: action.payload };
    case "SET_CHECKING_USERNAME":
      return { ...state, checkingUsername: action.payload };
    case "RESET_USERNAME_STATE":
      return { ...state, usernameError: null, usernameAvailable: null };
    default:
      return state;
  }
}

export default function SignupPage() {
  const [state, dispatch] = useReducer(signupReducer, initialState);
  const { username, usernameError, usernameAvailable, checkingUsername } =
    state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!username) {
      dispatch({ type: "RESET_USERNAME_STATE" });
      return;
    }

    const trimmed = username.trim();
    const error = validateUsername(trimmed);

    if (error) {
      dispatch({ type: "SET_USERNAME_ERROR", payload: error });
      dispatch({ type: "SET_USERNAME_AVAILABLE", payload: null });
      return;
    } else {
      dispatch({ type: "SET_USERNAME_ERROR", payload: null });
    }

    const delay = setTimeout(async () => {
      dispatch({ type: "SET_CHECKING_USERNAME", payload: true });
      try {
        const available = await isUsernameAvailable(trimmed);
        dispatch({ type: "SET_USERNAME_AVAILABLE", payload: available });
      } catch (error) {
        dispatch({ type: "SET_USERNAME_AVAILABLE", payload: false });
      } finally {
        dispatch({ type: "SET_CHECKING_USERNAME", payload: false });
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [username]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const trimmed = username.trim();
    const error = validateUsername(trimmed);

    if (error) {
      alert(error);
      return;
    }

    if (!usernameAvailable) {
      alert("Username is not available. Please choose another.");
      return;
    }

    try {
      await registerWithEmail(email, password, trimmed);
      alert("Registered successfully! Check your email for verification.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
              value={username}
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
              }
              required
            />
            {username && (
              <p className="text-xs mt-1">
                {usernameError ? (
                  <span className="text-red-600">{usernameError}</span>
                ) : checkingUsername ? (
                  <span className="text-gray-500">
                    Checking availability...
                  </span>
                ) : usernameAvailable ? (
                  <span className="text-green-600">Available</span>
                ) : (
                  <span className="text-red-600">Taken</span>
                )}
              </p>
            )}
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`w-full py-2 rounded font-medium text-sm ${
              checkingUsername || usernameAvailable === false || usernameError
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={
              checkingUsername || usernameAvailable === false || usernameError
            }
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-xs text-gray-500">OR</div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-50 transition text-sm"
        >
          <FcGoogle className="mr-2 text-lg" />
          Continue with Google
        </button>

        <div className="mt-4 text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
