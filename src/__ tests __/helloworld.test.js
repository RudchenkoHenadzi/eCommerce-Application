import HelloWorld from '../components/HelloWorld.vue';
import { mount } from '@vue/test-utils';

test('HelloWorld Component renders the correct text', () => {
  const wrapper = mount(HelloWorld);
  expect(wrapper.text()).toBe('Hello there!');
});
