<script>
  export let name;
  export let open;
  export let title;
</script>

<label for={name}>
  <slot name="trigger" />
</label>

<input type="checkbox" id={name} class="modal-toggle" checked={open} />
<label for={name} class="modal modal-bottom sm:modal-middle">
  <label for="" class="modal-box">
    <div class="font-bold text-xl text-center">{title}</div>
    <div class="my-2">
      <slot />
    </div>
    <div class="modal-action justify-center">
      <slot name="actions" />
    </div>
  </label>
</label>