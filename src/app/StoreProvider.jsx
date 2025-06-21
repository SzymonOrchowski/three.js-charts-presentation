// src/app/StoreProvider.jsx
"use client";

import { Provider } from 'react-redux';
import { store } from '../store/store';

/**
 * A client component that wraps its children with the Redux Provider.
 * @param {object} props
 * @param {React.ReactNode} props.children - The child components to render.
 */
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}