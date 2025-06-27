import { Link } from "react-router-dom";

export default function DesktopNav({ navigation }) {
  return (
    <div className="hidden lg:flex gap-6 items-center">
      {navigation.categories.map((cat) => (
        <Link
          key={cat.id}
          to={cat.href}
          className="text-sm font-medium text-gray-50 hover:text-indigo-400"
        >
          {cat.name}
        </Link>
      ))}
      {navigation.pages.map((page) => (
        <Link
          key={page.name}
          to={page.href}
          className="text-sm font-medium text-gray-50 hover:text-indigo-400"
        >
          {page.name}
        </Link>
      ))}
    </div>
  );
}
