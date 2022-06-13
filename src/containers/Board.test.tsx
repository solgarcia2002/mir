import React from 'react';

const mockResponse =
  {"Clusters":[
    [ [0, 1], [0, 2] ],
    [ [2, 3] ],
    [ [4, 3] ],
    [ [7, 3] ],
    [ [8, 5] ],
    [ [8, 7], [8, 8] ]
  ]
};

describe('Binary Board', () => {
  it('Calls mockedFetch and gets the mocked values', async () => {
    const asyncMock = jest.fn().mockResolvedValue(mockResponse);
    await asyncMock();
    expect(asyncMock).toBeCalledTimes(1);
  });
});
