import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const host = "http://localhost:3000";

  return {
    statusCode: 200,
    body: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GETCMS</title>

        <script type="module" src="${host}/@vite/client"></script>
        <script type="module">
            import RefreshRuntime from "${host}/@react-refresh"
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => {}
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true
        </script>
    </head>
    <body>
        <script type="module" src="${host}/src/index.ts"></script>
    </body>
</html>`,
  };
};
