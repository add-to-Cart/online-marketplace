import { Link } from "react-router-dom";

export default function UserAuthActions({ user, logout }) {
  if (!user) {
    return (
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

  if (!user.emailVerified) {
    return (
      <span className="text-xs text-yellow-400">Please verify your email</span>
    );
  }

  if (!user.username) {
    return (
      <span className="text-xs text-yellow-400">Complete your profile</span>
    );
  }

  return (
    <>
      <Link
        to="/profile"
        className="flex items-center space-x-2 text-xs font-medium text-gray-50 hover:text-red-500"
      >
        <img
          src={user.avatarUrl || "defaultAvatar"}
          alt="avatar"
          className="w-6 h-6 rounded-full object-cover border"
        />
        <span>{user.username || "Anonymous"}</span>
      </Link>
      <button
        onClick={logout}
        className="text-xs font-medium text-gray-50 hover:text-red-500 hover:cursor-pointer"
      >
        Logout
      </button>
    </>
  );
}
