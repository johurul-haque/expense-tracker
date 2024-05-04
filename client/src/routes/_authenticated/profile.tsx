import { buttonVariants } from '@/components/ui/button';
import { userQueryOptions } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/profile')({
  component: () => <Profile />,
});

function Profile() {
  const { isPending, data, error } = useQuery(userQueryOptions);

  if (isPending) return 'loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const fullName = data.user.given_name + ' ' + data.user.family_name;

  return (
    <div className="py-6 flex flex-col items-center">
      <figure className="flex flex-col justify-center items-center gap-3 mb-1.5">
        {data.user.picture && (
          <img
            src={increasedImageResolution(data.user.picture)}
            width={400}
            height={400}
            className="size-14 rounded-full text-sm"
            alt={`Profile picture of ${fullName}`}
          />
        )}

        <figcaption className="text-lg font-medium mb-2">{fullName}</figcaption>
      </figure>

      <a href="/api/logout" className={`${buttonVariants({ size: 'sm' })}`}>
        Logout
      </a>
    </div>
  );
}

function increasedImageResolution(url: string, newSize = 256) {
  return url.replace(/s96/, `s${newSize}`);
}
