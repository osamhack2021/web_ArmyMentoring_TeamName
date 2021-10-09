import { createContext } from "react"


const UserContext = createContext({
    BASE_URL: "https://guntor-guntee-data-server.herokuapp.com/"
})

export default UserContext