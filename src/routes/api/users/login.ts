import { eq } from "drizzle-orm";
import { ElysiaApp } from "../../..";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { t } from "elysia";

export default (app: ElysiaApp) => app.post("/", async ({ set, jwt, setCookie, body: { email, password }, hx }) => {
    const user = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0]

    if (!user || !(await Bun.password.verify(password, user.password))) {
        set.status = 401
        return
    }

    setCookie('auth', await jwt.sign({
        id: user.id,
        name: user.name
    }), {
        httpOnly: true,
        maxAge: 7 * 86400,
        path: "/"
    })

    hx.redirect("/")
}, {
    body: t.Object({
        email: t.String(),
        password: t.String()
    })
})