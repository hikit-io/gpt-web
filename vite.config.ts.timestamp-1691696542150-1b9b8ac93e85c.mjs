// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/nekilc/WebstormProjects/gpt-web/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/nekilc/WebstormProjects/gpt-web/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import components from "file:///Users/nekilc/WebstormProjects/gpt-web/node_modules/unplugin-vue-components/dist/vite.mjs";
import autoImport from "file:///Users/nekilc/WebstormProjects/gpt-web/node_modules/unplugin-auto-import/dist/vite.js";
import { VarletUIResolver } from "file:///Users/nekilc/WebstormProjects/gpt-web/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { createHtmlPlugin } from "file:///Users/nekilc/WebstormProjects/gpt-web/node_modules/vite-plugin-html/dist/index.mjs";
import { resolve } from "path";
import Icons from "file:///Users/nekilc/WebstormProjects/gpt-web/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///Users/nekilc/WebstormProjects/gpt-web/node_modules/unplugin-icons/dist/resolver.mjs";
var __vite_injected_original_dirname = "/Users/nekilc/WebstormProjects/gpt-web";
var INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
var DRIVE_LETTER_REGEX = /^[a-z]:/i;
var vite_config_default = defineConfig((env) => {
  return {
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    plugins: [
      vue(),
      Icons({
        autoInstall: true,
        compiler: "vue3"
      }),
      components({
        resolvers: [
          VarletUIResolver(),
          IconsResolver({
            prefix: "icon"
          })
        ]
      }),
      autoImport({
        resolvers: [VarletUIResolver({ autoImport: true })]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            ...loadEnv(env.mode, process.cwd())
          }
        }
      })
    ],
    build: {
      outDir: "docs",
      cssMinify: "lightningcss",
      rollupOptions: {
        output: {
          sanitizeFileName(fileName) {
            const match = DRIVE_LETTER_REGEX.exec(fileName);
            const driveLetter = match ? match[0] : "";
            return driveLetter + fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "");
          }
        }
      }
    },
    css: {
      transformer: "lightningcss"
    },
    server: {
      port: 80
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmVraWxjL1dlYnN0b3JtUHJvamVjdHMvZ3B0LXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL25la2lsYy9XZWJzdG9ybVByb2plY3RzL2dwdC13ZWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25la2lsYy9XZWJzdG9ybVByb2plY3RzL2dwdC13ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZywgbG9hZEVudn0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQge1ZhcmxldFVJUmVzb2x2ZXJ9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB7Y3JlYXRlSHRtbFBsdWdpbn0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCdcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAncGF0aCdcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5cbmNvbnN0IElOVkFMSURfQ0hBUl9SRUdFWCA9IC9bXFx4MDAtXFx4MUZcXHg3Rjw+KiNcInt9fF5bXFxdYDs/OiY9KyQsXS9nO1xuY29uc3QgRFJJVkVfTEVUVEVSX1JFR0VYID0gL15bYS16XTovaTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKChlbnYpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICB2dWUoKSxcbiAgICAgICAgICAgIEljb25zKHtcbiAgICAgICAgICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb21waWxlcjogXCJ2dWUzXCIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNvbXBvbmVudHMoe1xuICAgICAgICAgICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgICAgICAgICAgICBWYXJsZXRVSVJlc29sdmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4OiAnaWNvbicsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgYXV0b0ltcG9ydCh7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZXJzOiBbVmFybGV0VUlSZXNvbHZlcih7YXV0b0ltcG9ydDogdHJ1ZX0pXVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgICAgICAgICBpbmplY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubG9hZEVudihlbnYubW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICBvdXREaXI6ICdkb2NzJyxcbiAgICAgICAgICAgIGNzc01pbmlmeTogJ2xpZ2h0bmluZ2NzcycsXG4gICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgICAgIHNhbml0aXplRmlsZU5hbWUoZmlsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gRFJJVkVfTEVUVEVSX1JFR0VYLmV4ZWMoZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJpdmVMZXR0ZXIgPSBtYXRjaCA/IG1hdGNoWzBdIDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJpdmVMZXR0ZXIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lLnNsaWNlKGRyaXZlTGV0dGVyLmxlbmd0aCkucmVwbGFjZShJTlZBTElEX0NIQVJfUkVHRVgsIFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lcjogJ2xpZ2h0bmluZ2NzcycsXG4gICAgICAgIH0sXG4gICAgICAgIHNlcnZlcjoge1xuICAgICAgICAgICAgcG9ydDogODBcbiAgICAgICAgfVxuICAgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9TLFNBQVEsY0FBYyxlQUFjO0FBQ3hVLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFRLHdCQUF1QjtBQUMvQixTQUFRLHdCQUF1QjtBQUMvQixTQUFRLGVBQWM7QUFDdEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBUjFCLElBQU0sbUNBQW1DO0FBVXpDLElBQU0scUJBQXFCO0FBQzNCLElBQU0scUJBQXFCO0FBRTNCLElBQU8sc0JBQVEsYUFBYSxDQUFDLFFBQVE7QUFDakMsU0FBTztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ0wsT0FBTztBQUFBLFFBQ0gsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNuQztBQUFBLElBQ0o7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxRQUNGLGFBQWE7QUFBQSxRQUNiLFVBQVU7QUFBQSxNQUNkLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNQLFdBQVc7QUFBQSxVQUNQLGlCQUFpQjtBQUFBLFVBQ2pCLGNBQWM7QUFBQSxZQUNWLFFBQVE7QUFBQSxVQUNaLENBQUM7QUFBQSxRQUNMO0FBQUEsTUFDSixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDUCxXQUFXLENBQUMsaUJBQWlCLEVBQUMsWUFBWSxLQUFJLENBQUMsQ0FBQztBQUFBLE1BQ3BELENBQUM7QUFBQSxNQUNELGlCQUFpQjtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ0osTUFBTTtBQUFBLFlBQ0YsR0FBRyxRQUFRLElBQUksTUFBTSxRQUFRLElBQUksQ0FBQztBQUFBLFVBQ3RDO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUFBLElBQ0w7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNYLFFBQVE7QUFBQSxVQUNKLGlCQUFpQixVQUFVO0FBQ3ZCLGtCQUFNLFFBQVEsbUJBQW1CLEtBQUssUUFBUTtBQUM5QyxrQkFBTSxjQUFjLFFBQVEsTUFBTSxDQUFDLElBQUk7QUFDdkMsbUJBQ0ksY0FDQSxTQUFTLE1BQU0sWUFBWSxNQUFNLEVBQUUsUUFBUSxvQkFBb0IsRUFBRTtBQUFBLFVBRXpFO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDRCxhQUFhO0FBQUEsSUFDakI7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNKLE1BQU07QUFBQSxJQUNWO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
