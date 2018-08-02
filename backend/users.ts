export class User {
    constructor (
        public email: string,
        public name: string,
        private password: string
     ){}

     matches(another: User): boolean {
        return another !== undefined && 
        another.email === this.email && 
        another.password === this.password
     }

}

export const users: {[Key: string]: User} = {
    "zaza.naza95@gmail.com": new User('zaza.naza95@gmail.com', 'Maria', 'maria123'),    
    "rodolfo@gmail.com": new User('rodolfo@gmail.com', 'rodolfo', 'rodolfo123')
}