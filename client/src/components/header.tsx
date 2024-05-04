import { Link } from '@tanstack/react-router';

const LINKS = [
  ['/', 'Home'],
  ['/expenses', 'Expenses'],
  ['/create-expenses', 'Create'],
  ['/profile', 'Profile'],
];

export function Header() {
  return (
    <header className="flex justify-center px-2 py-3 gap-4">
      {LINKS.map(([path, label]) => (
        <Link
          key={path}
          to={path}
          className="[&.active]:underline underline-offset-2"
        >
          {label}
        </Link>
      ))}
    </header>
  );
}
