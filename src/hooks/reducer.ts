import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { ROOT_STATE, APP_DISPATCH } from '../reducer/cars'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => APP_DISPATCH = useDispatch
export const useAppSelector: TypedUseSelectorHook<ROOT_STATE> = useSelector