import { useSelector } from "react-redux"
import { 
  counterSelector, 
  fetchAndDecrement, 
  fetchAndIncrement, 
  isErrorSelector, 
  isFetchingSelector, 
  useAppDispatch,
 } from "../../store"


export const Counter = () => {
  const dispatch = useAppDispatch()

  const isError = useSelector(isErrorSelector)
  const isFetching = useSelector(isFetchingSelector)
  const counter = useSelector(counterSelector)

  const increment = () => {
    dispatch(fetchAndIncrement())
  }

  const decrement = () => {
    dispatch(fetchAndDecrement())
  }

  if (isError) {
    return <p>Something went wrong</p>
  }

  return  (
    <div>
      Counter: {counter}
      <br />
      <button disabled={isFetching} onClick={increment}>Increment</button>
      <button disabled={isFetching} onClick={decrement}>Decrement</button>
    </div>
  )
}