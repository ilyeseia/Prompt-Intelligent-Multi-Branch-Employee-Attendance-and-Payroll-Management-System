'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTheme, ThemeToggle } from '@/components/payroll/theme-provider';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Wallet, 
  Building2, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Moon,
  Sun,
  Calendar,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, description: 'View dashboard overview' },
  { name: 'Employees', href: '/employees', icon: Users, description: 'Manage employees' },
  { name: 'Attendance', href: '/attendance', icon: Clock, description: 'Track attendance', badge: 'Live' },
  { name: 'Payroll', href: '/payroll', icon: Wallet, description: 'Process payroll' },
  { name: 'Branches', href: '/branches', icon: Building2, description: 'View branch locations' },
  { name: 'Calendar', href: '/calendar', icon: Calendar, description: 'View calendar' },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings, description: 'System settings' },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'bg-sidebar border-r border-sidebar-border',
        'flex flex-col',
        isCollapsed ? 'w-[72px]' : 'w-[260px]'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div className={cn(
        'flex h-16 items-center border-b border-sidebar-border px-4',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div 
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary glow-hover"
              aria-hidden="true"
            >
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                PayrollPro
              </span>
              <span className="text-xs text-muted-foreground">
                Enterprise Suite
              </span>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div 
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary glow-hover"
            title="PayrollPro"
          >
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2" aria-label="Primary">
        <div className="space-y-1">
          {!isCollapsed && (
            <span 
              className="mb-2 block px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground"
              aria-hidden="true"
            >
              Main Menu
            </span>
          )}
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar',
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground/70'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={isCollapsed ? item.name : undefined}
                aria-label={isCollapsed ? item.name : undefined}
              >
                <item.icon 
                  className={cn(
                    'h-5 w-5 shrink-0 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'
                  )} 
                  aria-hidden="true"
                />
                {!isCollapsed && (
                  <>
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-auto text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        <div className="pt-4" role="separator" aria-hidden="true">
          {!isCollapsed && (
            <span 
              className="mb-2 block px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground"
              aria-hidden="true"
            >
              System
            </span>
          )}
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar',
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground/70'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon 
                  className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-sidebar-accent-foreground" 
                  aria-hidden="true"
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-3">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatar.png" alt="Admin User avatar" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-muted-foreground truncate">
                System Administrator
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 shrink-0"
                  aria-label="User menu"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                  {resolvedTheme === 'dark' ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" aria-hidden="true" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" aria-hidden="true" />
                      Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt="Admin User avatar" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                  {resolvedTheme === 'dark' ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" aria-hidden="true" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" aria-hidden="true" />
                      Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={cn(
          'absolute top-20 -right-3 z-50 h-6 w-6 rounded-full border',
          'bg-card shadow-md hover:bg-accent',
          'transition-transform duration-200 hover:scale-110',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        ) : (
          <ChevronLeft className="h-3 w-3" aria-hidden="true" />
        )}
      </Button>
    </aside>
  );
}

export function Header() {
  return (
    <header 
      className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6"
      role="banner"
    >
      <div className="flex-1">
        <div className="relative max-w-md">
          <label htmlFor="global-search" className="sr-only">
            Search employees, branches, payroll
          </label>
          <input
            id="global-search"
            type="search"
            placeholder="Search employees, branches, payroll..."
            className={cn(
              'w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-sm',
              'placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
              'transition-all duration-200'
            )}
            aria-label="Global search"
          />
          <Search 
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" 
            aria-hidden="true"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Notifications (3 unread)"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span 
            className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center"
            aria-hidden="true"
          >
            3
          </span>
        </Button>
        
        <div className="h-6 w-px bg-border" aria-hidden="true" />
        
        <div className="flex items-center gap-2">
          <time 
            className="text-sm text-muted-foreground hidden sm:block"
            dateTime="2024-11"
          >
            November 2024
          </time>
        </div>
      </div>
    </header>
  );
}
