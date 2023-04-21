import { UserRole } from "../../users/interfaces/user.interfaces"

export interface User {
    id: number
    name: string
    email: string
    points: number
    role: Enumerator<UserRole>
    token: string
}
