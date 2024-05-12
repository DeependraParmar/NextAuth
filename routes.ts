/**
 * This is the array of the routes that are publically accessible.
 * These routes do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = ['/'];


/**
 * This is the array of the routes that are publically protected.
 * These are the routes that do need authentication and will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];


/**
 * The prefix for API auth routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The default redirec path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = 'settings';