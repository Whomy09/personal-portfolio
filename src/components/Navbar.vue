<template>
  <nav class="flex justify-between">
    <h2 class="font-bold text-[18px]">&lt;Jesus /&gt;</h2>

    <template class="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <i class="fa-solid fa-bars text-[18px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Home</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Projects</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Contacts</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>

    <ul class="hidden md:flex gap-5 text-[18px] font-bold">
      <li class="navbar-item">Home</li>
      <li class="navbar-item">Projects</li>
      <li class="navbar-item">Contacts</li>
    </ul>
  </nav>
</template>
