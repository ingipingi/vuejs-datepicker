import DateInput from '@/components/DateInput.vue'
import {shallow} from '@vue/test-utils'
import {en} from '@/locale'

describe('DateInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(DateInput, {
      propsData: {
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        translation: en
      }
    })
  })

  it('should render correct contents', () => {
    expect(wrapper.findAll('input')).toHaveLength(1)
  })

  it('nulls date', () => {
    wrapper.setProps({
      selectedDate: null
    })
    expect(wrapper.vm.formattedValue).toBeNull()
    expect(wrapper.find('input').element.value).toEqual('')
  })

  it('formats date', () => {
    expect(wrapper.vm.formattedValue).toEqual('24 Mar 2018')
    expect(wrapper.find('input').element.value).toEqual('24 Mar 2018')
  })

  it('delegates date formatting', () => {
    wrapper.setProps({
      selectedDate: new Date(2016, 1, 15),
      format: () => '2016/1/15'
    })
    expect(wrapper.vm.formattedValue).toEqual('2016/1/15')
    expect(wrapper.find('input').element.value).toEqual('2016/1/15')
  })

  it('emits showCalendar', () => {
    wrapper.vm.showCalendar()
    expect(wrapper.emitted().showCalendar).toBeTruthy()
  })

  it('add bootstrap classes', () => {
    wrapper.setProps({
      bootstrapStyling: true
    })
    expect(wrapper.vm.computedInputClass).toContain('form-control')
  })

  it('can be disabled', () => {
    wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('input').attributes().disabled).toBeDefined()
  })
})
