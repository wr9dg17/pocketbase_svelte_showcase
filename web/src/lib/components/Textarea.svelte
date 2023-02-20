<script>
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let disabled = false;
	export let required = false;
	export let errors;
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<textarea
		class="textarea textarea-bordered w-full h-28 resize-none"
		name={id}
		{id}
		{placeholder}
		{required}
		{disabled}
		{value}
	/>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">{error}</span>
			</label>
		{/each}
	{/if}
</div>
