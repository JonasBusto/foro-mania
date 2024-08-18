import { useEffect } from "react"

const useDocTitle = (nameView) => {

    useEffect(() => {
        const previousTitle = document.title
    
        document.title = nameView
    
        return () => {
          document.title = previousTitle
        };
    }, [nameView]);
}

export default useDocTitle