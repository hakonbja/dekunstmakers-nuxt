<template>
  <footer>
    <div class="left">
      <p class="small">© 2026</p>
    </div>
    <div class="right">
      <p class="small">
        Made by <a href="mailto:hakonbja@gmail.com" target="_blank" class="small">Hákon</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: calc(100% - 64px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  border-top: 2px solid var(--color-accent);

  p {
    margin-block: 0;
  }

  a {
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-text-muted);
    }
  }
}
</style>
