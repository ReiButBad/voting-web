import type { PageLoad } from "./$types";
import type { PollItem } from "$lib/interfaces";
import { pb } from "$lib/client/user";
import { browser } from "$app/environment";

export const load: PageLoad = async ({ params }) => {
    if(browser) {
        let poll = await pb.collection("polls").getOne(params.poll_id)
        let selections = await pb.collection("poll_items").getFullList({
            filter: `(poll_id='${params.poll_id}')`
        })
        let currentVote = (await pb.collection("poll_items").getList(1, 1, {
            filter: `pickers ~ '${pb.authStore.model?.id}'`
        })).items[0]?.export()
        return {
            poll: poll.export(),
            selections: selections.map((v) => v.export()) as PollItem[],
            currentVote: currentVote as PollItem | undefined
        }
    }
}