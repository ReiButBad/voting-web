<script lang="ts">
	import { goto } from "$app/navigation";
	import { pb } from "$lib/client/user";
	let loggingOut = false

	function handleLogout() {
		try {
			loggingOut = true
			pb.authStore.clear()
			goto("/login")
		} finally {
			loggingOut = false
		}
	}

	function getProfile() {
		return (pb.authStore.model?.name as string).split(" ").map(v => v.slice(0,1)).join("")
	}
</script>

<header>
	<div class="dui-navbar bg-base-300">
		<div class="flex-1">
			<a href="/" class="px-5 font-semibold normal-case text-xl">Voting XH</a>
		</div>
		<div class="dui-navbar-end px-5 invisible sm:visible">
			<h2>{pb.authStore.model?.name}</h2>
			<div class="dui-btn-circle bg-neutral text-neutral-content flex items-center justify-center mx-3">{getProfile()}</div>
		</div>
	</div>
</header>
<div id="content" class="flex w-full h-fullp p-5">
	<slot />
</div>
<footer class="dui-footer p-10 bg-base-300 text-base-content flex-grow">
	<button class="dui-footer-title dui-btn dui-btn-ghost flex items-center" on:click={handleLogout}>Log Out</button>
</footer>
