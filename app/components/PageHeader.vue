<template>
    <header>
        <div class="left">
            <NuxtLink to="/" class="logo">De Kunstmakers</NuxtLink>
        </div>
        <div class="right">
            <NuxtLink to="/erik" class="paragraph">Erik</NuxtLink>
            <NuxtLink to="/marja" class="paragraph">Marja</NuxtLink>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    width: calc(100% - 64px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    border-bottom: 2px solid var(--color-accent);
}

.logo {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;

    &:hover {
        color: var(--color-text-muted);
    }
}

.right {
    display: flex;
    gap: 16px;

    .paragraph {
        text-decoration: none;
        color: var(--color-text);
        transition: color 0.2s ease;

        &:hover {
            color: var(--color-text-muted);
        }
    }
}
</style>
