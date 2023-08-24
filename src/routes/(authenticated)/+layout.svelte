<header>
	<div class="dui-navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="dui-btn dui-btn-ghost normal-case text-xl">Voting</a>
		</div>
		<div class="flex-none gap-2">
			<div class="dui-form-control">
				<input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
			</div>
			<div class="dui-dropdown dui-dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
                </label>
				<ul
					tabindex="0"
					class="mt-3 z-[1] p-2 shadow dui-menu dui-menu-sm dui-dropdown-content bg-base-100 rounded-box w-52"
				>
					<li>
						<a class="justify-between">
							Profile
							<span class="dui-badge">New</span>
						</a>
					</li>
					<li><a>Settings</a></li>
					<li><a>Logout</a></li>
				</ul>
			</div>
		</div>
	</div>
</header>
<div id="content" class="flex w-full h-fullp p-5">
	<slot />
</div>
<footer class="dui-footer p-10 bg-base-300 text-base-content flex-grow">
	<button class="dui-footer-title dui-btn dui-btn-ghost flex items-center">Log Out</button>
</footer>
