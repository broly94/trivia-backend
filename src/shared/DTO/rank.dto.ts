export class  RankDTO {
    
    public id: number
    public name: string
    public email: string
    public points: number

    constructor(id: number, name: string, email: string, points: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.points = points;
    }
}