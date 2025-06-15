
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  welcomeTitle: string;
  quote: string;
}

export const AuthLayout = ({ children, imageSrc, imageAlt, welcomeTitle, quote }: AuthLayoutProps) => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12 relative">
        {children}
      </div>
      <div className="hidden lg:block relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">{welcomeTitle}</h2>
            <p className="text-lg max-w-prose text-primary-foreground/80">
              {quote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
