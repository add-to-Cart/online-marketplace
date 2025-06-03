import { Link } from "react-router-dom";

export default function UserAuthActions({ user, logout }) {
  return user ? (
    <>
      <span className="text-xs text-gray-50">Hi, {user.email}</span>
      <button
        onClick={logout}
        className="text-xs font-medium text-gray-50 hover:text-red-500 hover:cursor-pointer"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="text-xs font-medium text-gray-50 hover:text-gray-400"
      >
        Sign in
      </Link>
      <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
      <Link
        to="/signup"
        className="text-xs font-medium text-gray-50 hover:text-gray-400"
      >
        Create account
      </Link>
    </>
  );
}
