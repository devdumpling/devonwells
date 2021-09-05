import React from 'react';

import Home from '../../src/pages/index';
import { render } from '../testUtils';

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home posts={[]} />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
