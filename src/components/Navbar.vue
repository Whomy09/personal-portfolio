<template>
  <nav class="flex justify-between">
    <h2 class="font-bold text-[18px]">&lt;Jesus /&gt;</h2>

    <template class="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <i class="fa-solid fa-bars text-[18px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <a href="#about-me">Home</a>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <a href="#projects">Projects</a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <a href="#contacts">
              Contacts
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>

    <ul class="hidden md:flex gap-5 text-[18px] font-bold">
      <a href="#about-me" class="navbar-item">Home</a>
      <a href="#projects" class="navbar-item">Projects</a>
      <a href="#contacts" class="navbar-item">Contacts</a>
    </ul>
  </nav>
</template>
