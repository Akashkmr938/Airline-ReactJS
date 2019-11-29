import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FlightCard from './FlightCard';
import Fab from '@material-ui/core/Fab';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;
    let flightDetails = {
        flightNumber: 'PQ001',
        name: 'Akash',
        from: 'Delhi',
        destination: 'Bangalore',
        price: '3400',
        totalSeats: '100'
    };
    beforeEach(() => {
        wrapper = shallow(<FlightCard flightDetails={flightDetails} source='check-n' isAdmin />);
    });

    it('should check for props status', () => {
        wrapper = shallow(<FlightCard source='check-n' isAdmin />);
        expect(wrapper.find(Fab)).toHaveLength(0);
    });
});