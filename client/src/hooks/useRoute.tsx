import { useContext } from 'react';
import { ContextType, RouteContext } from '../contexts/RouteContext';

export default function useRoute() {
	const { value } = useContext(RouteContext) as ContextType;
	return value;
}
