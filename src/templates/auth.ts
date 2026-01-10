/**
 * Authentication Templates
 *
 * Login, register, forgot password, and verification forms.
 * @module templates/auth
 */

/**
 * Login Form
 */
export const authLogin = `
<div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 text-2xl font-bold text-coral-500">
        <span class="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-xl flex items-center justify-center text-white">C</span>
        CoralCSS
      </a>
    </div>

    <!-- Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Welcome back</h1>
      <p class="text-slate-600 dark:text-slate-400 text-center mb-8">Sign in to your account to continue</p>

      <!-- Social Login -->
      <div class="space-y-3 mb-6">
        <button class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Continue with Google</span>
        </button>
        <button class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Continue with GitHub</span>
        </button>
      </div>

      <!-- Divider -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white dark:bg-slate-800 px-3 text-slate-500">or continue with email</span>
        </div>
      </div>

      <!-- Form -->
      <form class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email address</label>
          <input type="email" id="email" placeholder="you@example.com" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-shadow" />
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <a href="#" class="text-sm text-coral-600 dark:text-coral-400 hover:text-coral-700">Forgot password?</a>
          </div>
          <div class="relative">
            <input type="password" id="password" placeholder="••••••••" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-shadow pr-12" />
            <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <span class="i-eye icon-sm"></span>
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="remember" class="w-4 h-4 text-coral-500 border-slate-300 rounded focus:ring-coral-500" />
          <label for="remember" class="text-sm text-slate-600 dark:text-slate-400">Remember me for 30 days</label>
        </div>
        <button type="submit" class="w-full py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 focus:ring-4 focus:ring-coral-500/50 transition-all">
          Sign in
        </button>
      </form>
    </div>

    <!-- Footer -->
    <p class="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
      Don't have an account?
      <a href="#" class="text-coral-600 dark:text-coral-400 hover:text-coral-700 font-medium">Sign up for free</a>
    </p>
  </div>
</div>
`

/**
 * Register Form
 */
export const authRegister = `
<div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 text-2xl font-bold text-coral-500">
        <span class="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-xl flex items-center justify-center text-white">C</span>
        CoralCSS
      </a>
    </div>

    <!-- Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Create an account</h1>
      <p class="text-slate-600 dark:text-slate-400 text-center mb-8">Start your journey with us today</p>

      <!-- Social Login -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <button class="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Google</span>
        </button>
        <button class="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub</span>
        </button>
      </div>

      <!-- Divider -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white dark:bg-slate-800 px-3 text-slate-500">or</span>
        </div>
      </div>

      <!-- Form -->
      <form class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First name</label>
            <input type="text" id="firstName" placeholder="John" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last name</label>
            <input type="text" id="lastName" placeholder="Doe" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email address</label>
          <input type="email" id="email" placeholder="you@example.com" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
          <div class="relative">
            <input type="password" id="password" placeholder="••••••••" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent pr-12" />
            <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <span class="i-eye icon-sm"></span>
            </button>
          </div>
          <!-- Password Strength -->
          <div class="mt-2">
            <div class="flex gap-1 mb-1">
              <div class="h-1 flex-1 bg-red-500 rounded-full"></div>
              <div class="h-1 flex-1 bg-red-500 rounded-full"></div>
              <div class="h-1 flex-1 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
              <div class="h-1 flex-1 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
            </div>
            <p class="text-xs text-slate-500">Use 8+ characters with a mix of letters, numbers & symbols</p>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" id="terms" class="w-4 h-4 mt-0.5 text-coral-500 border-slate-300 rounded focus:ring-coral-500" />
          <label for="terms" class="text-sm text-slate-600 dark:text-slate-400">
            I agree to the <a href="#" class="text-coral-600 dark:text-coral-400 hover:underline">Terms of Service</a> and <a href="#" class="text-coral-600 dark:text-coral-400 hover:underline">Privacy Policy</a>
          </label>
        </div>
        <button type="submit" class="w-full py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 focus:ring-4 focus:ring-coral-500/50 transition-all">
          Create account
        </button>
      </form>
    </div>

    <!-- Footer -->
    <p class="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
      Already have an account?
      <a href="#" class="text-coral-600 dark:text-coral-400 hover:text-coral-700 font-medium">Sign in</a>
    </p>
  </div>
</div>
`

/**
 * Forgot Password Form
 */
export const authForgotPassword = `
<div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 text-2xl font-bold text-coral-500">
        <span class="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-xl flex items-center justify-center text-white">C</span>
        CoralCSS
      </a>
    </div>

    <!-- Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <!-- Icon -->
      <div class="w-16 h-16 mx-auto mb-6 bg-coral-100 dark:bg-coral-500/20 rounded-2xl flex items-center justify-center">
        <span class="i-key icon-xl text-coral-500"></span>
      </div>

      <h1 class="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Forgot password?</h1>
      <p class="text-slate-600 dark:text-slate-400 text-center mb-8">
        No worries, we'll send you reset instructions.
      </p>

      <!-- Form -->
      <form class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email address</label>
          <input type="email" id="email" placeholder="you@example.com" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        </div>
        <button type="submit" class="w-full py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 focus:ring-4 focus:ring-coral-500/50 transition-all">
          Reset password
        </button>
      </form>

      <!-- Back Link -->
      <a href="#" class="flex items-center justify-center gap-2 mt-6 text-sm text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
        <span class="i-arrow-left icon-sm"></span>
        Back to login
      </a>
    </div>
  </div>
</div>
`

/**
 * Reset Password Form
 */
export const authResetPassword = `
<div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 text-2xl font-bold text-coral-500">
        <span class="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-xl flex items-center justify-center text-white">C</span>
        CoralCSS
      </a>
    </div>

    <!-- Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Set new password</h1>
      <p class="text-slate-600 dark:text-slate-400 text-center mb-8">
        Your new password must be different from previously used passwords.
      </p>

      <!-- Form -->
      <form class="space-y-5">
        <div>
          <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New password</label>
          <div class="relative">
            <input type="password" id="password" placeholder="••••••••" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent pr-12" />
            <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <span class="i-eye icon-sm"></span>
            </button>
          </div>
          <p class="mt-1 text-xs text-slate-500">Must be at least 8 characters</p>
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm password</label>
          <input type="password" id="confirmPassword" placeholder="••••••••" class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        </div>
        <button type="submit" class="w-full py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 focus:ring-4 focus:ring-coral-500/50 transition-all">
          Reset password
        </button>
      </form>

      <!-- Back Link -->
      <a href="#" class="flex items-center justify-center gap-2 mt-6 text-sm text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
        <span class="i-arrow-left icon-sm"></span>
        Back to login
      </a>
    </div>
  </div>
</div>
`

/**
 * Email Verification
 */
export const authVerifyEmail = `
<div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 text-2xl font-bold text-coral-500">
        <span class="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-xl flex items-center justify-center text-white">C</span>
        CoralCSS
      </a>
    </div>

    <!-- Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <!-- Icon -->
      <div class="w-16 h-16 mx-auto mb-6 bg-coral-100 dark:bg-coral-500/20 rounded-2xl flex items-center justify-center">
        <span class="i-mail icon-xl text-coral-500"></span>
      </div>

      <h1 class="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Check your email</h1>
      <p class="text-slate-600 dark:text-slate-400 text-center mb-8">
        We sent a verification link to<br>
        <span class="font-medium text-slate-900 dark:text-white">john@example.com</span>
      </p>

      <!-- OTP Input -->
      <div class="flex justify-center gap-3 mb-6">
        <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
      </div>

      <button type="submit" class="w-full py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 focus:ring-4 focus:ring-coral-500/50 transition-all mb-6">
        Verify email
      </button>

      <p class="text-center text-sm text-slate-600 dark:text-slate-400">
        Didn't receive the email?
        <button class="text-coral-600 dark:text-coral-400 hover:text-coral-700 font-medium">Click to resend</button>
      </p>

      <!-- Back Link -->
      <a href="#" class="flex items-center justify-center gap-2 mt-6 text-sm text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
        <span class="i-arrow-left icon-sm"></span>
        Back to login
      </a>
    </div>
  </div>
</div>
`

/**
 * Two Factor Authentication
 */
export const authTwoFactor = `
<div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 text-2xl font-bold text-coral-500">
        <span class="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-xl flex items-center justify-center text-white">C</span>
        CoralCSS
      </a>
    </div>

    <!-- Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <!-- Icon -->
      <div class="w-16 h-16 mx-auto mb-6 bg-coral-100 dark:bg-coral-500/20 rounded-2xl flex items-center justify-center">
        <span class="i-shield-check icon-xl text-coral-500"></span>
      </div>

      <h1 class="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Two-factor authentication</h1>
      <p class="text-slate-600 dark:text-slate-400 text-center mb-8">
        Enter the 6-digit code from your authenticator app
      </p>

      <!-- Form -->
      <form class="space-y-6">
        <!-- OTP Input -->
        <div class="flex justify-center gap-2">
          <input type="text" maxlength="1" class="w-11 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
          <input type="text" maxlength="1" class="w-11 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
          <input type="text" maxlength="1" class="w-11 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
          <span class="flex items-center text-slate-300 dark:text-slate-600">-</span>
          <input type="text" maxlength="1" class="w-11 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
          <input type="text" maxlength="1" class="w-11 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
          <input type="text" maxlength="1" class="w-11 h-14 text-center text-xl font-bold bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        </div>

        <button type="submit" class="w-full py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 focus:ring-4 focus:ring-coral-500/50 transition-all">
          Verify
        </button>
      </form>

      <!-- Alternative Methods -->
      <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <p class="text-sm text-slate-600 dark:text-slate-400 text-center mb-4">Having trouble?</p>
        <div class="space-y-2">
          <button class="w-full py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2">
            <span class="i-phone icon-sm"></span>
            Use backup phone number
          </button>
          <button class="w-full py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2">
            <span class="i-key icon-sm"></span>
            Use backup codes
          </button>
        </div>
      </div>

      <!-- Back Link -->
      <a href="#" class="flex items-center justify-center gap-2 mt-6 text-sm text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
        <span class="i-arrow-left icon-sm"></span>
        Back to login
      </a>
    </div>
  </div>
</div>
`

/**
 * Auth Split Screen Layout
 */
export const authSplitScreen = `
<div class="min-h-screen flex">
  <!-- Left Side - Form -->
  <div class="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-16">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <a href="/" class="inline-flex items-center gap-2 text-2xl font-bold text-coral-500 mb-10">
        <span class="w-10 h-10 bg-gradient-to-br from-coral-400 to-coral-600 rounded-xl flex items-center justify-center text-white">C</span>
        CoralCSS
      </a>

      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create your account</h1>
      <p class="text-slate-600 dark:text-slate-400 mb-8">
        Already have an account? <a href="#" class="text-coral-600 dark:text-coral-400 hover:underline font-medium">Sign in</a>
      </p>

      <!-- Form -->
      <form class="space-y-5">
        <div>
          <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full name</label>
          <input type="text" id="name" placeholder="John Doe" class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email address</label>
          <input type="email" id="email" placeholder="you@example.com" class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
          <input type="password" id="password" placeholder="••••••••" class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" id="terms" class="w-4 h-4 mt-0.5 text-coral-500 border-slate-300 rounded focus:ring-coral-500" />
          <label for="terms" class="text-sm text-slate-600 dark:text-slate-400">
            I agree to the <a href="#" class="text-coral-600 dark:text-coral-400 hover:underline">Terms</a> and <a href="#" class="text-coral-600 dark:text-coral-400 hover:underline">Privacy Policy</a>
          </label>
        </div>
        <button type="submit" class="w-full py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
          Create account
        </button>
      </form>

      <!-- Social -->
      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white dark:bg-slate-900 px-3 text-slate-500">or continue with</span>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-2 gap-3">
          <button class="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Google</span>
          </button>
          <button class="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Right Side - Image/Branding -->
  <div class="hidden lg:block lg:flex-1 relative bg-gradient-to-br from-coral-500 to-coral-600">
    <div class="absolute inset-0 bg-black/10"></div>
    <div class="absolute inset-0 flex items-center justify-center p-16">
      <div class="text-center text-white">
        <div class="mb-8">
          <span class="i-layers icon-[80px] opacity-80"></span>
        </div>
        <h2 class="text-4xl font-bold mb-4">Start building beautiful UIs</h2>
        <p class="text-xl text-coral-100 max-w-md mx-auto">
          Join thousands of developers who use CoralCSS to create stunning web applications.
        </p>

        <!-- Testimonial -->
        <div class="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
          <p class="text-lg mb-4">"CoralCSS has completely transformed how we build interfaces. It's fast, flexible, and a joy to use."</p>
          <div class="flex items-center justify-center gap-3">
            <img src="https://i.pravatar.cc/48" alt="" class="w-12 h-12 rounded-full border-2 border-white/30" />
            <div class="text-left">
              <p class="font-semibold">Alex Rivera</p>
              <p class="text-sm text-coral-200">CTO at TechCorp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
