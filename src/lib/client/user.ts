import { writable } from "svelte/store";
import PocketBase from "pocketbase"
import { LocalAuthStore } from "pocketbase";
import { env } from "$env/dynamic/public"

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_HOST, new LocalAuthStore())
// export const model = writable(pb.authStore.model)

// pb.authStore.onChange(() => {
//     model.set(pb.authStore.model)
// })
