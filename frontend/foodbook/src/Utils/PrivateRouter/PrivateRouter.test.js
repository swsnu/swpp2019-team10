import React from 'react';
import { mount } from 'enzyme';
import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { getMockStore } from 'test-utils/mock';
import PrivateRouter from '.';

const store = getMockStore({}, {}, {});

describe('<PrivateRouter />', () => {
    it('should render correctly', () => {
        
    });
});
