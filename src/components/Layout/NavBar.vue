<template>
    <nav aria-label="main navigation" class="navbar is-success" role="navigation">
        <div class="container is-max-desktop px-2">

            <div class="navbar-brand">
                <div class="navbar-item is-size-4 is-family-monospace">
                    MyNotes
                </div>

              <a
                @click.prevent="showMobileNav = !showMobileNav"
                class="navbar-burger"
                :class="{'is-active' : showMobileNav}"
                aria-expanded="false"
                aria-label="menu" 
                data-target="navbarBasicExample"
                role="button"
                ref="navbarBurgerRef"
              >
                 <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" ref="navBarRef" class="navbar-menu" :class="{'is-active' : showMobileNav}">
                <div class="navbar-start">
                    <button v-if="storeAuth.user.id" @click="logout" class="button is-small is-info mt-3 ml-3">
                        Log out {{ storeAuth.user.email }}
                    </button>
                </div>
                <div class="navbar-end">
                    <RouterLink @click="showMobileNav = false" to="/" class="navbar-item" active-class="is-active">
                        Notes
                    </RouterLink>

                    <RouterLink @click="showMobileNav = false"  to="/stats" class="navbar-item" active-class="is-active">
                        Stats
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import {useStoreAuth} from '@/stores/storeAuth'
const storeAuth = useStoreAuth()
const showMobileNav = ref(false)

const navBarRef = ref(null)
const navbarBurgerRef = ref(null)
onClickOutside(navBarRef, (event) => {
    showMobileNav.value = false;
}, {
    ignore: [navbarBurgerRef]
})

const logout = () =>{
    showMobileNav.value=false
    storeAuth.logoutUser()
}
</script>


<style>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>