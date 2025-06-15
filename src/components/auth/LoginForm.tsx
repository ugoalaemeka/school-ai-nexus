
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  role: 'admin' | 'teacher' | 'student' | 'parent';
  useAlternateLogin: boolean;
  alternateLoginLabel: string;
  isAlternateLogin: boolean;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  uniqueId: string;
  setUniqueId: (value: string) => void;
  loading: boolean;
  error: string | null;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  toggleLoginMethod: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  role,
  useAlternateLogin,
  alternateLoginLabel,
  isAlternateLogin,
  email,
  setEmail,
  password,
  setPassword,
  uniqueId,
  setUniqueId,
  loading,
  error,
  handleLogin,
  toggleLoginMethod,
}) => {
  return (
    <>
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        {isAlternateLogin && useAlternateLogin && role !== 'admin' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="unique-id">{alternateLoginLabel}</Label>
              <Input 
                id="unique-id" 
                placeholder={`Enter your ${alternateLoginLabel.toLowerCase()}`}
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-alt">Password</Label>
              <Input 
                id="password-alt" 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
              <Button 
                type="button" 
                variant="link" 
                onClick={toggleLoginMethod} 
                className="p-0 h-auto text-xs"
                disabled={loading}
              >
                Switch to email login
              </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                placeholder="youremail@example.com" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            {useAlternateLogin && role !== 'admin' && (
              <Button 
                type="button" 
                variant="link" 
                onClick={toggleLoginMethod} 
                className="p-0 h-auto text-xs"
                disabled={loading}
              >
                Login with {alternateLoginLabel}
              </Button>
            )}
          </>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </>
  );
};
