export class Body {
    readonly id: string
    readonly name: string
    readonly radius: number
    readonly color: number

    constructor(id: string,
                name: string,
                radius: number,
                color: number) {
        this.id = id
        this.name = name
        this.radius = radius
        this.color = color
    }

    public toString = (): string => {
        return `${this.id}(name: '${this.name}', radius: ${this.radius}, color: ${this.color})`;
    }


}