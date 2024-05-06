import { Link } from '@tanstack/react-router';
import { GithubIcon } from 'lucide-react';

const LINKS = [
  ['/', 'Home'],
  ['/expenses', 'Expenses'],
  ['/create-expenses', 'Create'],
  ['/profile', 'Profile'],
];

export function Header() {
  return (
    <header className="flex justify-center px-2 py-3 gap-4 relative">
      {LINKS.map(([path, label]) => (
        <Link
          key={path}
          to={path}
          className="[&.active]:underline underline-offset-2"
        >
          {label}
        </Link>
      ))}

      <a
        href="https://github.com/johurul-haque/expense-tracker/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4"
        title="View source code on GitHub"
      >
        <span className="sr-only">View source code on GitHub</span>
        <GithubIcon className="size-5" />
      </a>
    </header>
  );
}
