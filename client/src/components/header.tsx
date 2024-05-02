import { Link } from '@tanstack/react-router';

export function Header() {
  return (
    <header className="flex p-2 gap-2">
      <Link to="/" className="[&.active]:underline underline-offset-2">
        Home
      </Link>
    </header>
  );
}
