import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
});

interface CardHeaderProps{
    label: string;
}

const Header = ({label}: CardHeaderProps) => {
  return (
    <div className="w-full flex-col gap-y-4 items-center justify-center space-y-2">
        <h1 className={cn("text-3xl font-semibold text-center", font.className)}>Auth 🔐</h1>
        <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  )
}

export default Header;
