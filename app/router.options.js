export default {
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if(to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 30,
            }
        }

        return {left: 0, top: 0, behavior: 'smooth'}
    }
}