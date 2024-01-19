// routes/index.ts
import type { ElysiaApp } from '../index'
import { userRoute } from '../route-utils'

export default (app: ElysiaApp) => app.use(userRoute({
    authorized: true
})).get('/', ({ set, user }) => (
    <main class="h-screen w-screen flex justify-center items-center">
        <h1 class="text-3xl font-bold">Hello {user.name}</h1>
    </main>
))