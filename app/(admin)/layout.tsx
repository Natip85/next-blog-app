import { Nav, NavLink } from "@/components/Nav";
import "../globals.css";
import UserButton from "@/components/auth/UserButton";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-green-400">
      <Nav>
        <NavLink href={"/feed"}>Feed</NavLink>
        <NavLink href={"/server"}>Server</NavLink>
        <NavLink href={"/client"}>Client</NavLink>
        <NavLink href={"/admin"}>Admin</NavLink>
        <UserButton />
      </Nav>
      {children}
    </div>
  );
}
