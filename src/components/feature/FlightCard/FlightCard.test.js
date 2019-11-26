import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FlightCard from './FlightCard';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<FlightCard />);
    });

    it('should check for props status', () => {
        expect(wrapper.props().flightNumber).toBe(undefined);
    });
});