import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md', 
    hover = false,
    children,
    ...props 
  }, ref) => {
    const baseStyles = "bg-white rounded-xl transition-all duration-200"
    
    const variants = {
      default: "border border-gray-200 shadow-sm",
      outlined: "border-2 border-gray-300",
      elevated: "shadow-lg hover:shadow-xl",
      filled: "bg-gray-50 border border-gray-200"
    }
    
    const paddings = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-10"
    }
    
    const hoverStyles = hover ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" : ""
    
    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          hoverStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-gray-600 text-sm", className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-6", className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export default Card
