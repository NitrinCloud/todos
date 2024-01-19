import { ElysiaApp } from "..";
import { userRoute } from "../route-utils";

export default (app: ElysiaApp) => app.use(userRoute({
    authorized: false,
    strict: true
})).get("/", ({ }) => (
    <main class="h-screen w-screen flex justify-center items-center">
        <form hx-post="/api/users/login">
            <input id="email" name="email" type="email" />
            <input id="password" name="password" type="password" />
            <button type="submit">Login</button>
        </form>
    </main>
))