<script>
  import { invalidateAll } from '$app/navigation';
  import { enhance, applyAction } from '$app/forms';
  import { Input, Modal } from '$lib/components';

  export let data;
  export let form;
  let isEditEmailModalOpen;
  let isEditUsernameModalOpen;
  let loading;
  $: isEditEmailModalOpen = false;
  $: isEditUsernameModalOpen = false;
  $: loading = false;

  const submitEmailUpdate = () => {
    loading = true;
    isEditEmailModalOpen = true;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          isEditEmailModalOpen = false;
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    }
  }

  const submitUsernameUpdate = () => {
    loading = true;
    isEditUsernameModalOpen = true;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          isEditUsernameModalOpen = false;
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    }
  }
</script>

<div class="flex flex-col w-full h-full">
  <h3 class="text-2xl font-medium mt-3">Change email</h3>
  <div class="divider"></div>

  <Modal name="change-email" open={isEditEmailModalOpen} title="Change email">
    <span slot="trigger" class="btn btn-primary">Change email</span>
    <form action="?/updateEmail" method="post" class="space-y-2" use:enhance={submitEmailUpdate}>
      <Input id="email" type="email" label="Enter new email" value={form?.data?.email} errors={form?.errors?.email} required />
      <button class="btn btn-primary w-full" disabled={loading}>Submit</button>
    </form>
  </Modal>

  <h3 class="text-2xl font-medium mt-10">Change username</h3>
  <div class="divider"></div>

  <Input id="displayUsername" label="Username" value={data?.user?.username} disabled />
  <Modal name="change-username" open={isEditUsernameModalOpen} title="Change username">
    <span slot="trigger" class="btn btn-primary">Change username</span>
    <form action="?/updateUsername" method="post" class="space-y-2" use:enhance={submitUsernameUpdate}>
      <Input id="username" label="Enter new username" value={form?.data?.username} errors={form?.errors?.username} required />
      <button class="btn btn-primary w-full" disabled={loading}>Submit</button>
    </form>
  </Modal>
</div>
