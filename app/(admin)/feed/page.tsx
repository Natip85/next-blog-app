import { auth, signOut } from "@/auth";
export default async function FeedPage() {
  const session = await auth();
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirect: true, redirectTo: "/" });
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    </>
  );
}
