import { t } from "elysia";
import { ElysiaApp } from "../../..";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { apiRoute } from "../../../route-utils";

export default (app: ElysiaApp) => app.use(apiRoute).post("/", async ({ set, body: { email, name, password }, hx }) => {
    const hashedPassword = await Bun.password.hash(password)
    const newUser = (await db.insert(users).values({ email, name, password: hashedPassword }).onConflictDoNothing().returning({ id: users.id, name: users.name }))[0]

    if (!newUser) {
        set.status = 409
        return
    }

    hx.redirect("/login")
}, {
    body: t.Object({
        email: t.String(),
        name: t.String(),
        password: t.String()
    })
})