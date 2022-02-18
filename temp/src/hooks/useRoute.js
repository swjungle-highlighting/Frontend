import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

export default function useRoute() {
    const { getMethod, goResult, goLoading, goNotFound, requestResult, objChart, setObjChart } = useContext(AppStateContext);

    return { getMethod, goResult, goLoading, goNotFound, requestResult, objChart, setObjChart };
}

