import { ElysiaApp } from "../../..";
import { apiRoute } from "../../../route-utils";

export default (app: ElysiaApp) => app.use(apiRoute).post("/", async ({ set, setCookie, hx }) => {
    setCookie('auth', "", {
        httpOnly: true,
        maxAge: 0,
        path: "/"
    })

    if (hx.request) {
        hx.redirect("/login")
    } else {
        set.redirect = "/login"
    }
})