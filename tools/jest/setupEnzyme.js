import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({
  adapter: new Adapter(),
  lifecycleExperimental: true // https://github.com/airbnb/enzyme/issues/1247
});
