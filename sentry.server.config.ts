// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://eec6763acb7094fce38b3cbe31761611@sentry.breizhweb.dev/2",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate
  
  integrations: [
    // Add profiling integration to list of integrations
    nodeProfilingIntegration(),
  ],
  
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  spotlight: process.env.NODE_ENV === 'development',
});