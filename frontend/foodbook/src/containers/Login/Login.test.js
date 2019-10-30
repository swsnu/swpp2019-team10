import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './Login';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { history } from 'store/store';

describe('<Login />', () => {
    let login;

    beforeEach(() => {
    });

    it('should render without crashing', () => {
        const component = shallow(<Login history={history} />);
        const wrapper = component.find(".login");
        expect(wrapper.length).toBe(1);
    });

    it('should call loginHandler function', () => {
        const component = shallow(<Login history={history} />);
        const wrapper = component.find('#login-button');
        const spy = jest.spyOn(history, 'push')
        .mockImplementation(() => {});
        wrapper.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});