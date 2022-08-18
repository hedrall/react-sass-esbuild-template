import React from 'react';
import { render, screen } from '@testing-library/react/pure';
import { Top, TopProps } from '@frontend/components/pages/Top/index';

describe('Top', () => {
  
  let container: HTMLElement;
  const props: TopProps = {

  }
  
  beforeAll(() => {
    const tree = render(<Top {...props} />);
    container = tree.container;
  });

  test('snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
