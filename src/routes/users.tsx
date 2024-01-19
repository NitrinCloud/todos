// routes/index.ts
import type { ElysiaApp } from '../index'
import { htmlRoute } from '../route-utils'

export default (app: ElysiaApp) => app.use(htmlRoute).onBeforeHandle(({ set }) => {
    return set.redirect = "/"
}).get('/', () => (
    <main class="h-screen w-screen flex justify-center items-center">
        <h1 class="text-3xl font-bold">Hello User</h1>
    </main>
))