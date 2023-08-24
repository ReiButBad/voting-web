<script lang="ts">
    import PocketBase from "pocketbase";
    import { LocalAuthStore } from "pocketbase";
    import { env } from "$env/dynamic/public"
    import { goto } from "$app/navigation";

    const pb = new PocketBase(env.PUBLIC_POCKETBASE_HOST, new LocalAuthStore())
    let identity: string = ""
    let password: string = ""
    let disabled = false;

    const submit = async () => {
        disabled = true
        let auth = await pb.collection("users").authWithPassword(identity, password)
        pb.authStore.save(auth.token, auth.record)
        goto("/")
    }
</script>

<form on:submit|preventDefault={submit}>
    <input bind:value={identity} placeholder="username or email">
    <input bind:value={password} type="password">
    <button disabled={disabled}>Login</button>
</form>