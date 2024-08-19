"use client";

import { Provider } from "react-redux";
import { store } from "./store";
store.subscribe(() => console.log(store.getState()));

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
