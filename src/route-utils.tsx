import { eq } from "drizzle-orm";
import { ElysiaApp } from ".";
import { db } from "./db";
import { users } from "./db/schema";

export const htmlRoute = (app: ElysiaApp) => app.onAfterHandle(({ set, response }) => {
    set.headers['content-type'] = 'text/html; charset=utf8'
    return <html lang="en">
        <head>
            <title>Todos | Nitrin.DEV</title>
            <link rel="stylesheet" href="/public/styles.css" />
            <script src="/public/htmx.min.js" />
            <script src="/public/_hyperscript.min.js" />
        </head>
        <body>
            {response}
        </body>
    </html>
})

export const userRoute = (app: ElysiaApp, authorized: boolean, strict: boolean) => app.derive(async ({ jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth)
    if (profile) {
        const user = (await db.select().from(users).where(eq(users.id, profile.id as number)))[0]
        return { user }
    }
}).onBeforeHandle(({ set, user, hx }) => {
    if (authorized) {
        if (!user) {
            if (hx.request) {
                return hx.redirect("/login")
            } else {
                return set.redirect = "/login"
            }
        }
    } else {
        if (strict && user) {
            if (hx.request) {
                return hx.redirect("/")
            } else {
                return set.redirect = "/"
            }
        }
    }
})