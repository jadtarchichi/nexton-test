import { shallowMount } from '@vue/test-utils'
import Details from '@/views/Details.vue'
import Home from '@/views/Home.vue'
import axios from "axios"
import VideoPlayer from '@/components/VideoPlayer.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/details/:id/:mode",
            name: "Details",
            component: Details
        },
        {
            path: "/",
            name: "Home",
            component: Home,
        },
    ]
})

describe('Details.vue', () => {
    const mockRoute = {
        params: {
            id: "INSIDEWWEP7W0140672",
            mode: "programme"
        }
    };

    const wrapper = shallowMount(Details, {
        global: {
            plugins: [router],
            mocks: {
                $route: mockRoute,
                axios: axios
            },
            components: {
                'VideoPlayer': VideoPlayer
            }
        }
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('Check Content if exists', () => {
        setTimeout(() => {
            expect(wrapper.find('.content').exists()).toBe(true)
        }, 1500);
    })

    it('check showModal and video player after play click', async () => {
        setTimeout(() => {
            expect(wrapper.find('button').exists()).toBe(true)

            wrapper.find('button').trigger('click')

            expect(wrapper.vm.showModal).toBe(true)
            expect(wrapper.findComponent(VideoPlayer).exists()).toBe(true);
        }, 1500);
    })
})
