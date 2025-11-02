import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <View
      data-slot="skeleton"
      style={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
