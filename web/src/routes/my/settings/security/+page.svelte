<script>
  import { Input } from '$lib/components';

  export let form;
</script>

<div class="flex flex-col w-full h-full">
  <h3 class="text-2xl font-medium mt-3">Change password</h3>
  <div class="divider"></div>

  <form action="?/updatePassword" method="post" class="w-full max-w-lg">
    <Input id="oldPassword" label="Current password" type="password" errors={form?.errors?.oldPassword} required />
    <Input id="password" label="New password" type="password" errors={form?.errors?.password} required />
    <Input id="passwordConfirm" label="Confirm new password" type="password" errors={form?.errors?.passwordConfirm} required />
    <a href="/reset-password" class="text-primary hover:underline">I forgot my password</a>
    <button class="btn btn-primary w-full mt-4">Update password</button>
  </form>
</div>
