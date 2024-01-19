import cookie from "@elysiajs/cookie";
import { html } from "@elysiajs/html";
import jwt from "@elysiajs/jwt";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";
import { htmx } from "elysia-htmx";
import { nocache } from "elysia-nocache";
import { tailwind } from "elysia-tailwind";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .use(htmx())
  .use(cookie())
  .use(nocache)
  .use(tailwind({                           // 2. Use
    path: "/public/styles.css",       // 2.1 Where to serve the compiled stylesheet;
    source: "./src/styles/styles.css",        // 2.2 Specify source file path (where your @tailwind directives are);
    config: "./tailwind.config.js",       // 2.3 Specify config file path or Config object;
    options: {                            // 2.4 Optionally Specify options:
      minify: true,                     // 2.4.1 Minify the output stylesheet (default: NODE_ENV === "production");
      map: true,                        // 2.4.2 Generate source map (default: NODE_ENV !== "production");
      autoprefixer: false               // 2.4.3 Whether to use autoprefixer;
    },
  }))
  .use(jwt({
    name: "jwt",
    secret: process.env.AUTH_SECRET!
  }))
  .use(autoroutes({
    routesDir: "./routes", // -> optional, defaults to './routes'
    prefix: "", // -> optional, defaults to ''
    generateTags: false, // -> optional, defaults to true
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type ElysiaApp = typeof app
