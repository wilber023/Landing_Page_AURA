import * as React from "react"
import { cn } from "@/lib/utils"

const Tabs = ({ value, onValueChange, children, className }) => (
  <div className={cn("w-full", className)} data-value={value}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { value, onValueChange })
    )}
  </div>
)

const TabsList = ({ children, value, onValueChange, className }) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { value, onValueChange })
    )}
  </div>
)

const TabsTrigger = ({ value: triggerValue, onValueChange, value, children, className }) => {
  const isActive = value === triggerValue
  
  return (
    <button
      type="button"
      onClick={() => onValueChange?.(triggerValue)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50",
        className
      )}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value: contentValue, value, children, className }) => {
  if (value !== contentValue) return null
  
  return (
    <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }