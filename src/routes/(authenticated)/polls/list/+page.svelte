<script lang="ts">
	import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    
    export let data: PageData;

    function getDateString(date: Date) {
        return date.toLocaleString([], {
            dateStyle: "long",
            timeStyle: "short"
        })
    }
</script>

<form>
    {#if data.polls !== undefined}
        {#each data.polls as poll}
            <button on:click|preventDefault={() => goto(`/polls/${poll.id}`)} class="dui-card transition-all duration-200 bg-neutral hover:bg-neutral-focus text-neutral-content p-3">
                <p><b>{poll.text}</b></p>
                <br>
                <p><b>Opened On:</b> {getDateString(new Date(poll.created))}</p>
                <p><b>Expires At:</b> {getDateString(new Date(poll.expires_at))}</p>
            </button>
        {:else}
            <div class="text-neutral">No polls...</div>
        {/each}
    {/if}
</form>