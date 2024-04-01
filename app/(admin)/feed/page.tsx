import { auth } from "@/auth";
export default async function FeedPage() {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
}
