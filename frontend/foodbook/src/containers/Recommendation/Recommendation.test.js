import React from 'react';
import { mount } from 'enzyme';

import { history } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from 'test-utils/mock';
import { Provider } from 'react-redux';

import Recommendation from './Recommendation';

// https://jestjs.io/docs/en/mock-functions.html

describe('<Recommendation />', () => {
  const mockStore = getMockStore({}, {}, {});

  let recommend;

  beforeEach(() => {
    recommend = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Recommendation history={history} />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mode: loc', () => {
    it('should render without crashing', () => {
      const component = mount(recommend);
      const wrapper = component.find('Recommendation');
      expect(wrapper.length).toBe(1);
    });

    it('should have recom trigger button working', () => {
      const component = mount(recommend);
      component.find('Button #recom-modal-trigger').simulate('click');
      component.update();

      let wrapper = component.find('RecommendationLocation');
      expect(wrapper.length).toBe(1);

      wrapper = component.find('RecommendationTag');
      expect(wrapper.length).toBe(1);
    });

    it('should close recom trigger button', () => {
      const component = mount(recommend);
      component.find('Button #recom-modal-trigger').simulate('click');
      component.update();

      component.find('Button #close-recom-button').simulate('click');
      component.update();

      const wrapper = component.find('Recommendation');
      expect(wrapper.length).toBe(1);
    });
  });
});
