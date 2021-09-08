import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import axios from "axios"

describe('Home.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      propsData: {
        searchText: 'game',
        searchResult: {}
      },
      global: {
        mocks: {
          axios: axios
        }
      }
    });
  })

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('Expects to find span HTML element with className search-icon in the DOM', () => {
    expect(wrapper.find('span.search-icon').exists()).toBe(true)
  })

  it('Expects to call search method on click search icon', async () => {
    const mockMethod = jest.fn()
    wrapper.vm.search = mockMethod

    await wrapper.find('span.search-icon').trigger('click')
    expect(mockMethod).toHaveBeenCalled()
    
    setTimeout(() => {
      expect(wrapper.text()).toMatch(/GAME/)
    }, 1000);
  })
})
