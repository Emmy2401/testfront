import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AddProduct from '@/views/AddProduct.vue'
import UpdateProduct from '@/views/UpdateProduct.vue'

describe('Composant AddProduct', () => {
  it('soumet avec succès avec des données correctes', async () => {
    const wrapper = mount(AddProduct)

    await wrapper.find('#name').setValue('Chaise')
    await wrapper.find('#description').setValue('Une chaise confortable')
    await wrapper.find('#price').setValue(45.99)
    await wrapper.find('#code').setValue('CHAISE001')
    await wrapper.find('#available').setChecked(true)

    await wrapper.find('form').trigger('submit.prevent')

    // Vérifie que l'événement "submit" a été émis
    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})

describe('Composant UpdateProduct', () => {
  it('met à jour avec succès avec des données correctes', async () => {
    const wrapper = mount(UpdateProduct, {
      props: {
        id: 1,
      },
      data() {
        return {
          product: {
            id: 1,
            name: 'Table',
            description: 'Table en bois massif',
            price: 120.0,
            code: 'TABLE001',
            available: true,
          },
        }
      },
    })

    await wrapper.find('#name').setValue('Table basse')
    await wrapper.find('#description').setValue('Petite table basse en verre')
    await wrapper.find('#price').setValue(80.0)
    await wrapper.find('#code').setValue('TABLE002')
    await wrapper.find('#available').setChecked(false)

    await wrapper.find('form').trigger('submit.prevent')

    // Vérifie que l'événement "submit" a été émis
    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})
