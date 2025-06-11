import React, { useState } from 'react';
import { Bell, Search, Sun, Moon, HelpCircle, LogOut, Building, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const { user, profile, springUser, signOut, springSignOut } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Check if mock API is enabled
  const isMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';

  const handleSignOut = () => {
    if (springUser) {
      springSignOut();
    } else {
      signOut();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Get user details from either Spring or Supabase auth
  const userName = springUser
    ? `${springUser.firstName || ''} ${springUser.lastName || ''}`.trim() || springUser.username
    : profile
      ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || user?.email
      : user?.email;

  const userInitials = springUser
    ? `${(springUser.firstName?.[0] || '')}${(springUser.lastName?.[0] || '')}`.trim() || springUser.username?.[0] || '?'
    : profile
      ? `${(profile.first_name?.[0] || '')}${(profile.last_name?.[0] || '')}`.trim() || user?.email?.[0] || '?'
      : user?.email?.[0] || '?';

  const userRole = springUser
    ? springUser.roles?.[0]?.replace('ROLE_', '') || 'User'
    : profile?.role || 'User';

  return (
    <header className="bg-white dark:bg-gray-800 border-b py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}
        <Building className="h-6 w-6 text-construction-600" />
        <h1 className="text-xl font-semibold">Edifice</h1>
        {isMockApi && (
          <Badge className="bg-yellow-500 text-white">Mock Data</Badge>
        )}
      </div>

      <div className="relative flex-1 max-w-md mx-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search projects, resources..."
          className="pl-9 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {notificationCount}
            </span>
          )}
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url || ''} alt={userName || 'User'} />
                <AvatarFallback className="bg-construction-100 text-construction-700">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userRole}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Profile settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:bg-red-50 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
