<script lang="ts">
	import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    
    export let data: PageData;
</script>

<form>
    {#if data.polls !== undefined}
        {#each data.polls as poll}
            <button on:click|preventDefault={() => goto(`/polls/${poll.id}`)} class="dui-card transition-all duration-200 bg-primary hover:bg-primary-focus text-primary-content p-2">
                <p><b>{poll.text}</b></p>
                <br>
                <p>Dibuka: {new Date(poll.created).toLocaleString()}</p>
                <p>Ditutup: {new Date(poll.expires_at).toLocaleString()}</p>
            </button>
        {:else}
            <div class="text-neutral">No polls...</div>
        {/each}
    {/if}
</form>