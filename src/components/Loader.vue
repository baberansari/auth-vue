<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>
</template>

<style>
.loader-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* HTML: <div class="loader"></div> */
.loader {
    --r1: 154%;
    --r2: 68.5%;
    width: 60px;
    aspect-ratio: 1;
    border-radius: 50%;
    background:
      radial-gradient(var(--r1) var(--r2) at top   ,#0000 79.5%,#DB4097 80%),
      radial-gradient(var(--r1) var(--r2) at bottom,#DB4097 79.5%,#0000 80%),
      radial-gradient(var(--r1) var(--r2) at top   ,#0000 79.5%,#DB4097 80%),
      #ccc;
    background-size: 50.5% 220%;
    background-position: -100% 0%,0% 0%,100% 0%;
    background-repeat:no-repeat;
    animation: l9 2s infinite linear;
  }
  @keyframes l9 {
      33%  {background-position:    0% 33% ,100% 33% ,200% 33% }
      66%  {background-position: -100%  66%,0%   66% ,100% 66% }
      100% {background-position:    0% 100%,100% 100%,200% 100%}
  }
</style>
