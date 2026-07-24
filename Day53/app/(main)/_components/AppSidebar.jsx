'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  CalendarClock,
  PlusCircle,
  Mic,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * app/(main)/_components/AppSidebar.jsx — Recruiter Navigation Sidebar
 *
 * This is the premium dark sidebar that appears on all recruiter pages.
 * It uses shadcn/ui's Sidebar primitives for:
 *  - Responsive behavior (collapses on mobile)
 *  - Keyboard accessibility
 *  - Smooth open/close animations
 *
 * What's inside:
 * 1. SidebarHeader — Brand logo + name
 * 2. SidebarContent → SidebarGroup — Navigation links
 * 3. SidebarFooter — Recruiter profile + logout dropdown
 */

// Navigation menu items — add new routes here as we build them
const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'All Interviews',
    href: '/scheduled-interview',
    icon: CalendarClock,
  },
  {
    label: 'Create Interview',
    href: '/dashboard/create-interview',
    icon: PlusCircle,
  },
];

export default function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userDetail } = useUser();

  /**
   * handleLogout — Signs the recruiter out of Supabase session
   * and redirects them to the auth page
   */
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      router.push('/auth');
    } catch (error) {
      toast.error('Failed to sign out');
      console.error('[AppSidebar] Logout error:', error);
    }
  };

  return (
    <Sidebar
      className="border-r border-[hsl(222,47%,13%)]"
      style={{ background: 'hsl(222, 47%, 6%)' }}
    >
      {/* ── Brand Header ─────────────────────────────────────────────── */}
      <SidebarHeader className="px-4 py-5">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
            style={{
              background: 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(189, 94%, 43%))',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
            }}
          >
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[hsl(210,40%,98%)] leading-tight">
              AI Interview
            </p>
            <p className="text-xs text-[hsl(215,20%,55%)]">Recruiter Portal</p>
          </div>
        </Link>
      </SidebarHeader>

      {/* ── Navigation Links ─────────────────────────────────────────── */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(215,20%,45%)] text-xs font-medium uppercase tracking-wider px-2 mb-1">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="rounded-xl transition-all duration-200 hover:bg-[hsl(222,47%,11%)]"
                      style={
                        isActive
                          ? {
                              background:
                                'linear-gradient(135deg, hsl(258,90%,66%)/15%, hsl(189,94%,43%)/10%)',
                              color: 'hsl(258, 90%, 76%)',
                            }
                          : {}
                      }
                    >
                      <Link href={item.href} className="flex items-center gap-3 px-3 py-2.5">
                        <item.icon
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: isActive ? 'hsl(258, 90%, 76%)' : 'hsl(215, 20%, 55%)' }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: isActive ? 'hsl(258, 90%, 80%)' : 'hsl(210, 40%, 80%)',
                          }}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <div
                            className="ml-auto w-1.5 h-1.5 rounded-full"
                            style={{ background: 'hsl(258, 90%, 66%)' }}
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Recruiter Profile Footer ─────────────────────────────────── */}
      <SidebarFooter className="px-2 pb-4">
        <div className="border-t border-[hsl(222,47%,13%)] pt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                id="user-profile-menu"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[hsl(222,47%,11%)] transition-all duration-200 cursor-pointer"
              >
                {/* User Avatar */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  {userDetail?.avatar_url ? (
                    <Image
                      src={userDetail.avatar_url}
                      alt={userDetail.full_name || 'Recruiter'}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, hsl(258, 90%, 66%), hsl(189, 94%, 43%))' }}
                    >
                      {(userDetail?.full_name?.[0] || 'R').toUpperCase()}
                    </div>
                  )}
                </div>

                {/* User Name & Email */}
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium text-[hsl(210,40%,92%)] truncate">
                    {userDetail?.full_name || 'Recruiter'}
                  </p>
                  <p className="text-xs text-[hsl(215,20%,45%)] truncate">
                    {userDetail?.email || ''}
                  </p>
                </div>

                <ChevronDown className="w-4 h-4 text-[hsl(215,20%,45%)] flex-shrink-0" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              side="top"
              className="w-48 border-[hsl(222,47%,15%)]"
              style={{ background: 'hsl(222, 47%, 8%)' }}
            >
              <DropdownMenuItem
                id="logout-button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
