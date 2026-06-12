import { GradientBar } from "@/components/layout/gradient-bar";

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <GradientBar />
      {children}
    </div>
  );
}
