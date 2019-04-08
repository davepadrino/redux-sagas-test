import { delay } from 'redux-saga'

import { put, takeEvery, call} from 'redux-saga/effects'

// export const delay = (ms) => new Promise(res => setTimeout(res, ms))

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield call(delay,1000)
    yield put({ type: 'INCREMENT' })
}
  
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export  function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* decrementAsync() {
    yield call(delay, 2000)
    yield put(({type: 'DECREMENT'}))
}

export function* watchDecrementAsync() {
    yield takeEvery('DECREMENT_ASYNC', decrementAsync)
}

function* helloSaga() {
    console.log('Hello Sagas!')
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
      helloSaga(),
      watchIncrementAsync(),
      watchDecrementAsync()
    ]
}