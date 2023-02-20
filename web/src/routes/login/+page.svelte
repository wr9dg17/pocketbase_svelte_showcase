<script>
  import { Input } from '$lib/components';

  export let form;
</script>

<div class="flex flex-col items-center h-full w-full">
  <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
    Login to your account
  </h2>
  <p class="text-center mt-1 mb-4">
    Or <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline">sign up</a> if you don't have an account.
  </p>
  <form action="?/login" method="post" class="flex flex-col items-center space-y-2 w-full max-w-md">
    <Input id="email" type="email" label="Email" value={form?.data?.email ?? ''} errors={form?.errors?.email} />
    <Input id="password" type="password" label="Password" errors={form?.errors?.password} />
    <div class="w-full max-w-md">
      <a href="/reset-password" class="font-medium text-primary hover:underline">Forgot password?</a>
    </div>
    <div class="w-full max-w-md pt-2">
      <button type="submit" class="btn btn-primary w-full">Login</button>
    </div>
  </form>
</div>