// routes/index.ts
import { User } from '../db/schema'
import type { ElysiaApp } from '../index'
import { htmlRoute, userRoute } from '../route-utils'

export default (app: ElysiaApp) => app.use(htmlRoute).use((app) => userRoute(app, false, false)).get('/', ({ user }: { user: User }) => (
    <main class="h-screen w-screen flex flex-col justify-center items-center gap-12">
        <h1 class="text-3xl font-bold">Hello World</h1>
        <form hx-post="/api/users/logout">
            {user && <div class="flex flex-col gap-3 justify-center items-center">
                <p class="text-lg">Signed in as {user.name}</p>
                <button class="text-lg font-bold border border-black rounded-xl py-2 px-6" type="submit">Logout</button>
            </div>}
        </form>
    </main>
))