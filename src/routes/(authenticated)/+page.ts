import type { PageLoad } from "./$types";
import { pb } from "$lib/client/user";
import { browser } from "$app/environment";

export const load: PageLoad = async ({ params }) => {
    if(browser) {
        let polls = await pb.collection("polls").getList(1, 10, {
            fields: "id,text,created,expires_at"
        })
        console.log(polls.items[0])
        return {
            polls: polls.items.map(v => v.export()),
        }
    }
}