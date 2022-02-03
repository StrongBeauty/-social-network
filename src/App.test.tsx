import React from 'react';
import ReactDOM from 'react-dom';
import { screen } from '@testing-library/react';
import {SNApp} from './App';

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SNApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
