import { Nav, NavLink } from "@/components/Nav";
import "../globals.css";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href={"/"}>Dashboard</NavLink>
        <NavLink href={"/"}>products</NavLink>
        <NavLink href={"/"}>posts</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
