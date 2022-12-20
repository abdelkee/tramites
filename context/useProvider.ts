import { useContext } from "react"
import { AppContext, DispatchAppContext } from "./ContextProvider"

export const useSelector = () => {
    return useContext(AppContext)
}

export const useDispatch = () => {
    return useContext(DispatchAppContext)
}
