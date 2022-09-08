import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from './helpers/common';

import App from '../App';

describe('<App />', () => {
    it('should render app', () => {
        const wrapper = mount(<App />);
        expect(wrapper).to.have.not.be.null;
    });
});
