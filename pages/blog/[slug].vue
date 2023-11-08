<template>
    <div>
        We are inside a blog.
    </div>
    <div>
        Post slug is {{ route.params.slug }}
    </div>
</template>
<script setup>
const route = useRoute()
</script>