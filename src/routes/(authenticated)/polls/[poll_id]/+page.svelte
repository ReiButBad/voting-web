<script lang="ts">
	import type { PageData } from "./$types";
	import type { PollItem } from "$lib/interfaces";
	import type { RecordSubscription } from "pocketbase";
    import { pb } from "$lib/client/user";
    import { env } from "$env/dynamic/public";
	import { onMount } from "svelte";
    
    export let data: PageData;
    let percentages: {[key: string]: number} = {}
    let processing = false
    let currentVote = data.currentVote

    onMount(() => {
        let unSub = pb.collection("poll_items").subscribe("*", (payload: RecordSubscription<PollItem>) => {
            if(payload.action == "update") {
                if(data.selections !== undefined) {
                    // console.log(payload.record, "received")
                    data.selections[data.selections?.findIndex((v) => v.id === payload.record.id)] = payload.record
                    calculateSelection()
                }
            }
        })
        console.log("subscribed")
        return async () => {
            console.log("unsubscribed")
            return await unSub
        }
    })
    

    function calculateSelection() {
        if(data.selections !== undefined) {

            let totalVote = data.selections.map(v => v.pickers.length).reduce((pv, cv) => pv+cv)
            percentages = Object.fromEntries(data.selections?.map((v) => [v.id, (v.pickers.length/totalVote) * 100]))
        }
    }

    async function setVote(id: string) {
        processing = true
        try {
            if(currentVote !== undefined) {
                await pb.collection("poll_items").update(currentVote.id, {
                    "pickers-": pb.authStore.model?.id
                }) as PollItem
            }
            currentVote = await pb.collection("poll_items").update(id, {
                "pickers+": pb.authStore.model?.id
            })
        } finally {
            processing = false
        }
    }

    function isDisabled(selection: PollItem) {
        return currentVote?.id === selection.id
    }

    calculateSelection()
</script>

<form class="w-full">
    {#if data.selections !== undefined}
        <div class="flex">
            {#each data.selections as selection}
                <div class="m-1 flex flex-col w-max bg-neutral-800 p-4 rounded-lg">
                    <div class="w-full">
                        <b class="text-neutral-content text-xl">{ selection.text }</b>
                    </div>
                    <div class="flex flex-col m-5 text-neutral-content">
                        <div><b>Attachments:</b></div>
                        {#each selection.attachments as attachment}
                            <a target="_blank" class="dui-link dui-link-accent" href={`${env.PUBLIC_POCKETBASE_HOST}/api/files/poll_items/${selection.id}/${attachment}`}>{attachment}</a>
                        {/each}
                    </div>
                    <div class="flex items-center space-x-2 w-full">
                        <div class="text-neutral-content text-md font-bold flex items-center justify-center w-14">{percentages[selection.id] || 0}%</div>
                        <div class="h-full flex items-center justify-center">
                            <progress value={percentages[selection.id] || 0} max=100 class="dui-progress dui-progress-accent bg-neutral-500 w-52"></progress>
                        </div>
                        <button class="dui-btn disabled:text-neutral-content dui-btn-primary" on:click|preventDefault={() => setVote(selection.id)} disabled={isDisabled(selection) || processing}>Vote</button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</form>