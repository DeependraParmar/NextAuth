import { auth } from "./auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    console.log("Route is: ", req.nextUrl.pathname)
    console.log("Is logged in: ", isLoggedIn);
}); 

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}