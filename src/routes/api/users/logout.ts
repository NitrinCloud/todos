import { ElysiaApp } from "../../..";

export default (app: ElysiaApp) => app.post("/", async ({ set, setCookie, hx }) => {
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