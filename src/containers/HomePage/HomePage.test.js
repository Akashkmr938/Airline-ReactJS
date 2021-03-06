import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomePage } from './HomePage';
import FlightCard from '../../components/feature/FlightCard/FlightCard';

configure({ adapter: new Adapter() });
window.scrollTo = jest.fn();

let [getFlightDetails] = new Array(1).fill(jest.fn());

const props = {
    getFlightDetails: getFlightDetails,
    flightList: [{
        name: 'akash',
        airlineNumber: 123,
        totalSeats: 60,
        price: 3000
    }],
    isAdmin: false
}
describe('<HomePage />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<HomePage {...props}/>);
    });

    it('should render wrapper', () => {
        wrapper.setProps({ isAdmin: false });
        window.scrollTo.mockClear();
        expect(wrapper.exists()).toBe(true);
    });
    it('should render <FlightCard /> initially', () => {
        wrapper.setProps({ isAdmin: false });
        window.scrollTo.mockClear();
        expect(wrapper.find(FlightCard)).toHaveLength(1);
    });
    it('should check wrapper instance', () => {  
        window.scrollTo.mockClear();      
        expect(wrapper.instance()).toBeTruthy();
    });
    it('should check state content initially', () => {       
        window.scrollTo.mockClear(); 
        expect(props.flightList[0].name).toBe("akash");
        expect(props.flightList[0].airlineNumber).toBe(123);
        expect(props.flightList[0].price).toBe(3000);
        expect(props.flightList[0].totalSeats).toBe(60);
    });
    it('should check state content after api call', () => {
        window.scrollTo.mockClear();
        wrapper.instance().state = {
            flightList: [
                {
                    name: "Akash",
                    airlineNumber: "PQ001",
                    from: "Bangalore",
                    destination: "Delhi",
                    price: 2100,
                    takeOffTime: "11:45pm",
                    landingTime: "2:10am",
                    totalSeats: 60,
                    type: "Domestic"
                }
            ]
        }
        expect(wrapper.instance().state.flightList[0].totalSeats).toBe(60);   
        expect(wrapper.instance().state.flightList[0].name).toBe("Akash");
        expect(wrapper.instance().state.flightList[0].airlineNumber).toBe("PQ001");
        expect(wrapper.instance().state.flightList[0].price).toBe(2100);
    });
    it('should check <FlightCard /> length', () => {
        window.scrollTo.mockClear();
        wrapper.instance().state = {
            flightList: [{},{},{},{},{},{},{},{},{},{}]
        }
        expect(wrapper.find(FlightCard)).toHaveLength(1);   
        expect(wrapper.instance().state.flightList).toHaveLength(10);   
    });
    it('should check for props', () => {  
        window.scrollTo.mockClear();
        wrapper.setProps({isAdmin: true});
        expect(wrapper.instance().props.isAdmin).toBe(true);   
    });
});