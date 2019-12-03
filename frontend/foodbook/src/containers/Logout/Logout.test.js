// import React from 'react';
// import { mount } from 'enzyme';
// import { history } from 'store/store';
// import { ConnectedRouter } from 'connected-react-router';
// import { getMockStore } from 'test-utils/mock';
// import { Provider } from 'react-redux';

// import * as actionCreators from 'store/actions/user/action_user';
// import Logout from '.';

// const loggedinUser = {
//   user: {
//     username: '',
//     phone_number: '',
//     age: -1,
//     gender: '',
//     profile_pic: '',
//     number_of_reviews: -1,
//     number_of_friends: -1,
//     failed: false,
//   },

//   taste: {},

//   search: -1,
//   logged_in: true,
// };

// const loggedoutUser = {
//   user: {
//     username: '',
//     phone_number: '',
//     age: -1,
//     gender: '',
//     profile_pic: '',
//     number_of_reviews: -1,
//     number_of_friends: -1,
//     failed: false,
//   },

//   taste: {},

//   search: -1,
//   logged_in: false,
// };

// const store = getMockStore(loggedinUser, {}, {});
// const loggedOutStore = getMockStore(loggedoutUser, {}, {});

// describe('<Logout />', () => {
//   let logout;
//   const spyLogout = jest.spyOn(actionCreators, 'LOGOUT')
//     .mockImplementation(() => ({ type: '' }));

//   beforeEach(() => {
//     logout = (
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <Logout />
//         </ConnectedRouter>
//       </Provider>
//     );
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should render without crashing', () => {
//     const component = mount(logout);
//     const wrapper = component.find('.logout');
//     expect(wrapper.length).toBe(1);
//   });

//   it('should dispatch logout action', () => {
//     const component = mount(logout);
//     const wrapper = component.find('Button').at(0);

//     wrapper.simulate('click');

//     expect(spyLogout).toHaveBeenCalledTimes(1);
//   });

//   it('should not crash when not logged in', () => {
//     const falseLogout = (
//       <Provider store={loggedOutStore}>
//         <ConnectedRouter history={history}>
//           <Logout />
//         </ConnectedRouter>
//       </Provider>
//     );

//     const component = mount(falseLogout);
//     const wrapper = component.find('Button').at(0);

//     wrapper.simulate('click');

//     expect(spyLogout).toHaveBeenCalledTimes(1);
//   });
// });
