// ============== Uncomment if you want to test WITHOUT redux mocks
// please note, that this approach is preferable 

import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from "../../utils/renderWithRedux";
import { Counter } from "./Counter";
import { mockAsyncFunction } from '../../api';

jest.mock('../../api', () => ({
  mockAsyncFunction: jest.fn()
}))

const mockAsyncFunctionMock = mockAsyncFunction as jest.Mock;

test('render correct layout', () => {
  renderWithRedux(<Counter />)

  const expectedVisibleContent = [
    'Increment',
    'Decrement',
    'Counter: 0'
  ]

  expectedVisibleContent.forEach((title) => {
    expect(screen.getByText(title)).toBeInTheDocument()
  })
})

test('handle increment correctly', async () => {
  const incrementBy = 5

  mockAsyncFunctionMock.mockImplementationOnce(() => Promise.resolve(incrementBy))

  renderWithRedux(<Counter />)

  const incrementButton = screen.getByText('Increment')

  fireEvent.click(incrementButton)

  const expectedContent = `Counter: ${incrementBy}`

  await waitFor(() => {
    expect(screen.getByText(expectedContent)).toBeInTheDocument()
  })
})

test('handle decrement correctly', async () => {
  const decrementBy = 5

  mockAsyncFunctionMock.mockImplementationOnce(() => Promise.resolve(decrementBy))

  renderWithRedux(<Counter />)


  const decrementButton = screen.getByText('Decrement')

  fireEvent.click(decrementButton)

  const expectedContent = `Counter: -${decrementBy}`

  await waitFor(() => {
    expect(screen.getByText(expectedContent)).toBeInTheDocument()
  })
})

test('handle increment after decrement correctly', async () => {
  const decrementBy = 5
  const incrementBy = 15

  mockAsyncFunctionMock
  .mockImplementationOnce(() => Promise.resolve(decrementBy))
  .mockImplementationOnce(() => Promise.resolve(incrementBy))

  renderWithRedux(<Counter />)

  const decrementButton = screen.getByText('Decrement')
  const incrementButton = screen.getByText('Increment')

  fireEvent.click(decrementButton)

  const expectedContentAfterDecrement = `Counter: -${decrementBy}`

  await waitFor(() => {
    expect(screen.getByText(expectedContentAfterDecrement)).toBeInTheDocument()
  })

  fireEvent.click(incrementButton)

  const expectedContent = `Counter: ${-decrementBy + incrementBy}`

  await waitFor(() => {
    expect(screen.getByText(expectedContent)).toBeInTheDocument()
  })
})


// ============== Uncomment if you want to test WITH redux mocks

// import { fireEvent, screen } from '@testing-library/react';
// import { renderWithRedux } from "../../utils/renderWithRedux";
// import { Counter } from "./Counter";
// import { fetchAndDecrement, fetchAndIncrement } from '../../store';

// jest.mock('../../api', () => ({
//   mockAsyncFunction: jest.fn()
// }))

// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(() => mockDispatch)
// }))

// jest.mock('../../store', () => ({
//   ...jest.requireActual('../../store'),
//   fetchAndIncrement: jest.fn(() => 'increment'),
//   fetchAndDecrement: jest.fn(() => 'decrement')
// }))

// const mockDispatch = jest.fn()

// test('render correct layout', () => {
//   renderWithRedux(<Counter />)

//   const expectedVisibleContent = [
//     'Increment',
//     'Decrement',
//     'Counter: 0'
//   ]

//   expectedVisibleContent.forEach((title) => {
//     expect(screen.getByText(title)).toBeInTheDocument()
//   })
// })

// test('call dispatch with correct action on increment', () => {
//   renderWithRedux(<Counter />)

//   const incrementButton = screen.getByText('Increment')

//   fireEvent.click(incrementButton)

//   expect(mockDispatch).toHaveBeenCalledWith(fetchAndIncrement())
// })

// test('call dispatch with correct action on decrement', () => {
//   renderWithRedux(<Counter />)

//   const decrementButton = screen.getByText('Decrement')

//   fireEvent.click(decrementButton)

//   expect(mockDispatch).toHaveBeenCalledWith(fetchAndDecrement())
// })
