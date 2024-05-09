import { Button, ButtonProps } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';
import { Route } from '../config/const';

export type ContextType = {
	value: Route;
	updateRoute: (val: Route) => void;
};

export const RouteContext = createContext<ContextType | null>(null);

export function RouteProvider({ children }: { children: React.ReactNode }) {
	const [value, setValue] = useState<Route>(Route.PREDICT);
	return (
		<RouteContext.Provider value={{ value, updateRoute: setValue }}>
			{children}
		</RouteContext.Provider>
	);
}

export function SwitchRouteButton({ to, ...props }: { to: Route } & ButtonProps) {
	const { updateRoute } = useContext(RouteContext) as ContextType;

	return (
		<Button onClick={() => updateRoute(to)} {...props}>
			{props.children}
		</Button>
	);
}

export default {
	RouteProvider,
	SwitchRouteButton,
};
