import { pb } from "$lib/client/user";
import type { LayoutLoad } from "./$types";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";

export const load: LayoutLoad = async () => {
    if(browser) {
        try {
            pb.authStore.isValid && await pb.collection('users').authRefresh();
        } catch (error) {
            pb.authStore.clear();
        }
        if (!pb.authStore.isValid) {
            await goto('/login');
        }
    }
}