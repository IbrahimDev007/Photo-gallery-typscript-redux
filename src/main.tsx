import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AuthProvider from "./Provider/Provider.tsx";

const store = configureStore({
	reducer: {
		images: "",
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			{" "}
			{/* //auth provider use authintication */}
			<Provider store={store}>
				{" "}
				{/* //redux provider use  store data and dispatch */}
				<App />
			</Provider>
		</AuthProvider>
	</React.StrictMode>
);
