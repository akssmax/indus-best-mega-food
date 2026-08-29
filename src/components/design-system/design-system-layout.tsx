import { useState, type ReactNode } from "react"
import { ListIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { DesignSystemSidebar } from "./design-system-sidebar"
import { useDesignSystemScrollSpy } from "./use-design-system-scroll-spy"

export function DesignSystemLayout({ children }: { children: ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const activeId = useDesignSystemScrollSpy()

  return (
    <>
      <div className="sticky top-14 z-30 border-b border-border/50 bg-background/95 px-4 py-2 backdrop-blur-sm sm:px-6 lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <ListIcon className="size-4" />
              Contents
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100%,280px)] sm:max-w-xs">
            <SheetHeader>
              <SheetTitle className="font-heading text-lg">
                Design system
              </SheetTitle>
            </SheetHeader>
            <DesignSystemSidebar
              activeId={activeId}
              className="mt-4 overflow-y-auto pr-1"
              onNavigate={() => setSheetOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="mx-auto w-full max-w-7xl lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100svh-6rem)] overflow-y-auto border-r border-border/50 pb-8 pr-4">
            <DesignSystemSidebar activeId={activeId} />
          </div>
        </aside>

        <div className="min-w-0 overflow-x-clip">{children}</div>
      </div>
    </>
  )
}
