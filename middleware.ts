import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // ✅ protege /admin pero deja pasar /admin/login
  matcher: ["/admin((?!/login).*)"],
};
