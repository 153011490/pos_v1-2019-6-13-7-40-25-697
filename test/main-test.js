'use strict';

describe('pos', () => {
  const tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
  ];

  it('should return true', () => {
    expect(isBarCodesValid(tags)).toBe(true);
   })

  });

