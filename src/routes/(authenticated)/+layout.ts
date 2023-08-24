import { pb } from "$lib/client/user";
import type { LayoutLoad } from "./$types";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";

export const load: LayoutLoad = () => {
    if(browser) {
        if(!pb.authStore.isValid) {
            goto("/login")
        }
    }
}