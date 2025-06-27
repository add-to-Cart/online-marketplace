import { Link } from "react-router-dom";

export default function UserAuthActions({ user, logout }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login" className="text-sm hover:text-indigo-400">
          Sign in
        </Link>
        <span className="text-gray-400">|</span>
        <Link to="/signup" className="text-sm hover:text-indigo-400">
          Sign up
        </Link>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/profile"
        className="flex items-center space-x-2 hover:text-indigo-400"
      >
        <img
          src={user.avatarUrl || "/default-avatar.svg"}
          alt="Profile"
          className={`w-7 h-7 rounded-full object-cover border border-gray-300 ${
            user.avatarUrl ? "" : "p-1"
          }`}
        />
        <span className="text-sm">{user.username || "User"}</span>
      </Link>
      <button
        onClick={logout}
        className="text-sm text-gray-200 hover:text-red-400"
      >
        Logout
      </button>
    </div>
  );
}
