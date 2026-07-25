"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"

// ── Sidebar Context ────────────────────────────────────────────────────────
const SidebarContext = React.createContext({
  open: true,
  setOpen: () => {},
  isMobile: false,
})

function useSidebar() {
  return React.useContext(SidebarContext)
}

// ── SidebarProvider ────────────────────────────────────────────────────────
function SidebarProvider({ children, defaultOpen = true, className, style, ...props }) {
  const [open, setOpen] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMobile }}>
      <div
        className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

// ── SidebarTrigger ─────────────────────────────────────────────────────────
function SidebarTrigger({ className, onClick, ...props }) {
  const { open, setOpen } = useSidebar()
  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        setOpen(!open)
      }}
      {...props}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) {
  const { open, isMobile } = useSidebar()

  if (isMobile) {
    return (
      <>
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => {}}
          />
        )}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }

  return (
    <div
      className={cn(
        "relative flex h-full flex-col transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-0 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────
function SidebarHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}

function SidebarFooter({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2 mt-auto", className)} {...props} />
}

function SidebarContent({ className, ...props }) {
  return (
    <div
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto", className)}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }) {
  return <div className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />
}

function SidebarGroupLabel({ className, asChild = false, ...props }) {
  return (
    <div
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({ className, ...props }) {
  return <div className={cn("w-full text-sm", className)} {...props} />
}

function SidebarMenu({ className, ...props }) {
  return <ul className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />
}

function SidebarMenuItem({ className, ...props }) {
  return <li className={cn("group/menu-item relative", className)} {...props} />
}

function SidebarMenuButton({ className, asChild = false, isActive = false, tooltip, children, ...props }) {
  const Comp = asChild ? React.Fragment : "button"
  const innerProps = asChild ? {} : props

  if (asChild) {
    return (
      <div
        data-active={isActive}
        className={cn(
          "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <button
      data-active={isActive}
      className={cn(
        "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...innerProps}
    >
      {children}
    </button>
  )
}

function SidebarSeparator({ className, ...props }) {
  return <div className={cn("mx-2 w-auto bg-sidebar-border h-px", className)} {...props} />
}

export {
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
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
