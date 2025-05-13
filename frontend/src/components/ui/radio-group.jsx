import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const RadioGroup = forwardRef(({ className, ...props }, ref) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} ref={ref} {...props} />
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        ref={ref}
        className={cn(
          "h-4 w-4 rounded-full border-gray-300 text-emerald-600 focus:ring-emerald-600",
          className
        )}
        {...props}
      />
      {children}
    </div>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem }; 