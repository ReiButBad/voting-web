import type { PageLoad } from "./$types";
import { pb } from "$lib/client/user";
import { browser } from "$app/environment";

export const load: PageLoad = async ({ parent }) => {
    if(browser) {
        await parent()
        let polls = await pb.collection("polls").getList(1, 10, {
            fields: "id,text,created,expires_at"
        })
        return {
            polls: polls.items.map(v => v.export()),
        }
    }
}