<template>
  <div class="flex flex-col items-center space-y-2 bg-[#F1EDEF] py-1 font-bold sm:block sm:py-4">
    <div class="w-full">
      <img class="mx-auto aspect-[4/3] h-[50px]" src="@/assets/images/logo.svg" />
    </div>

    <div class="flex flex-col justify-center text-center sm:flex-row sm:space-x-5">
      <span class="flex items-center space-x-2">
        <Icon class="cursor-pointer" name="material-symbols:call" size="20" color="#C3AE8B" />
        <span>02-1234-5678</span>
      </span>

      <span class="flex items-center space-x-2">
        <Icon
          class="cursor-pointer"
          name="material-symbols:mail-outline-sharp"
          size="20"
          color="#C3AE8B"
        />
        <span>aaabbbccc@gmail.com</span>
      </span>

      <span class="flex items-center space-x-2">
        <Icon
          class="cursor-pointer"
          name="material-symbols:home-outline-rounded"
          size="20"
          color="#C3AE8B"
        />
        <span>台一市二三路四段五六巷七八號9F</span>
      </span>
    </div>

    <div class="text-center">
      Copyright
      <span>
        <Icon class="cursor-pointer" name="solar:copyright-outline" size="12" color="black" />
        xxxx
      </span>
    </div>

    <div class="flex justify-center space-x-2">
      <Icon class="cursor-pointer" name="logos:facebook" size="20" color="#C3AE8B" />
      <Icon class="cursor-pointer" name="skill-icons:instagram" size="20" color="#C3AE8B" />
      <img class="w-[24px]" src="@/assets/images/line-icon.svg" />
    </div>
  </div>
</template>
