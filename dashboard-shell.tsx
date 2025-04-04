"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserNav } from "@/components/user-nav"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const [notificationCount, setNotificationCount] = useState(3)

  const clearNotifications = () => {
    setNotificationCount(0)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <SidebarTrigger className="mr-2 md:hidden" />
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-700">
              <div className="absolute inset-0 rounded-full bg-background/10 backdrop-blur-sm" />
              <span className="relative text-lg font-bold text-white">F</span>
            </div>
            <h1 className="hidden text-xl font-bold md:inline-block">Futuristic News System</h1>
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative" onClick={clearNotifications}>
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>
            <UserNav />
          </div>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[auto_1fr]">
        <DashboardSidebar />
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

