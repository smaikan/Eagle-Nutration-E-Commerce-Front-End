import { useSelector } from "react-redux";

export const useCurrentauth =()=> useSelector(state=>state.Auth.CurrentAuth);
export const useAuths =()=> useSelector(state=>state.Auth.Auths)
export const useCart =()=> useSelector(state=>state.Cart)
export const useAllProducts =()=> useSelector(state=>state.Products?.allProducts || [])
export const useProteinProducts =()=> useSelector(state=>state.Products?.proteinProducts || [])
export const useHacimProducts =()=> useSelector(state=>state.Products?.HacimProducts || [])
export const usePerformansProducts =()=> useSelector(state=>state.Products?.PerformansProducts || [])
export const useZayiflamaProducts =()=> useSelector(state=>state.Products?.zayiflamaProducts || [])
export const useGiyimProducts =()=> useSelector(state=>state.Products?.giyimProducts || [])
export const useAksesuarProducts =()=> useSelector(state=>state.Products?.aksesuarProducts || [])

