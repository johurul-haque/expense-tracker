import { Link } from '@tanstack/react-router';

const LINKS = [
  ['/', 'Home'],
  ['/expenses', 'Expenses'],
  ['/create-expenses', 'Create'],
];

export function Header() {
  return (
    <header className="flex p-2 gap-2">
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
