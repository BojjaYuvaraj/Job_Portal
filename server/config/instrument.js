import * as Sentry from "@sentry/node"
// import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://160ad5abb9ff87ca6951050c52be69c7@o4508966000263168.ingest.us.sentry.io/4508966006685696",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],

});
Sentry.profiler.startProfiler();
Sentry.startSpan({
  name: "My First Transaction",
}, () => {
 
});

Sentry.profiler.stopProfiler();