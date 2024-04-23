import {withSentryConfig} from '@sentry/nextjs';
import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            { hostname: 'cdn.sanity.io' },
            { hostname: 'source.unsplash.com' },
        ],
    },
    typescript: {
        // Set this to false if you want production builds to abort if there's type errors
        ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
    },
    eslint: {
        /// Set this to false if you want production builds to abort if there's lint errors
        ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    experimental: {
        taint: true,
    }
};

export default withSentryConfig(withNextVideo(nextConfig), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

// Suppresses source map uploading logs during build
silent: true,
org: "sentry",
project: "portfolio",
url: "https://sentry.anthonyhelliet.com/"
}, {
// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Transpiles SDK to be compatible with IE11 (increases bundle size)
transpileClientSDK: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors.
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});