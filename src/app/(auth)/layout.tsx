interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Provides a styled layout container for authentication-related pages, centering its content both vertically and horizontally.
 *
 * @param children - The content to be displayed within the authentication layout.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='bg-muted flex flex-col min-h-svh items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>{children}</div>
    </div>
  );
}
