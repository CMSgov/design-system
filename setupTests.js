import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

// Configures Enzyme for React 16, this is run before each test file
// http://airbnb.io/enzyme/docs/installation/index.html#working-with-react-16
configure({ adapter: new Adapter() });
