export enum TypeTask {
    Simple,
    Progress
}

export class Frequency {
    // the occurence between new task
    occurence: number
    // if `isEveryMonth` and `isEveryYear` are  false : `occurence` will be the number of day
    // if `isEveryMonth` is true  : `occurence` will be the number of day at the start of the month
    // if `isEveryYear` is true  : `occurence` will be the number of day at the start of the year
    isEveryMonth: boolean
    isEveryYear: boolean
    // when the frequence start to create
    frequenceStart: Date
    // when the frequence end
    frequenceEnd: Date

    constructor(occurence: number, isEveryMonth: boolean, isEveryYear: boolean, frequenceStart: Date, frequenceEnd: Date){
        this.occurence = occurence
        this.isEveryMonth = isEveryMonth
        this.isEveryYear = isEveryYear
        this.frequenceStart = frequenceStart
        this.frequenceEnd = frequenceEnd
    }

    public static everyDay (nbDayEnd: number, dayOccurence: number = 1) : Frequency  {
        var frequenceStart = new Date(Date.now())
        var frequenceEnd = new Date(frequenceStart.getTime() + (1000 * 60 * 60 * 24 * nbDayEnd));
        
        return this.everyDayWithDate(dayOccurence, frequenceStart,  frequenceEnd)
    }

    public static everyDayWithDate (dayOccurence: number, frequenceStart: Date, frequenceEnd: Date) : Frequency  {
        return new Frequency(dayOccurence, false, false, frequenceStart, frequenceEnd);
    }

    public static everyWeek (nbWeedEnd: number, weekOccurence: number = 1) : Frequency  {
        var frequenceStart = new Date(Date.now())
        var frequenceEnd = new Date(frequenceStart.getTime() + (1000 * 60 * 60 * 24 * 7 * nbWeedEnd));
        
        return this.everyWeekWithDate(weekOccurence, frequenceStart,  frequenceEnd)
    }

    public static everyWeekWithDate (weekOccurence: number, frequenceStart: Date, frequenceEnd: Date) : Frequency  {
        return new Frequency(weekOccurence * 7, false, false, frequenceStart, frequenceEnd)
    }

    public static everyMonth (nbMonthEnd: number, numberDayOfMonth: number = 1) : Frequency  {
        var frequenceStart = new Date(Date.now())
        var frequenceEnd = new Date(frequenceStart.setMonth(frequenceStart.getMonth() + nbMonthEnd))
        
        return this.everyMonthWithDate(numberDayOfMonth, frequenceStart,  frequenceEnd)
    }

    public static everyMonthWithDate (numberDayOfMonth: number, frequenceStart: Date, frequenceEnd: Date) : Frequency  {
        return new Frequency(numberDayOfMonth, true, false, frequenceStart, frequenceEnd);
    }

    public static everyYear (nbYear: number, numberDayOfYear: number) : Frequency {
        var frequenceStart = new Date(Date.now())
        var frequenceEnd = new Date(frequenceStart.setMonth(frequenceStart.getMonth() + 12 * nbYear))

        return this.everyYearWithDate(numberDayOfYear, frequenceStart, frequenceEnd)
    }

    public static everyYearWithDate (numberDayOfYear: number, frequenceStart: Date, frequenceEnd: Date) : Frequency  {
        return new Frequency(numberDayOfYear, false, true, frequenceStart, frequenceEnd )
    }
}

export class RecurrentTask {
    readonly id: string
    frequency: Frequency[]
    typeTask: TypeTask
    titre : string
    description : string

    constructor(id: string, titre: string, description: string, type: TypeTask, frequency: Frequency[]){
        this.id = id
        this.titre = titre
        this.description = description
        this.typeTask = type
        this.frequency = frequency
    }
}

 export abstract class DataTask {
    readonly id: string
    readonly typeTask: TypeTask
    titre : string
    description : string
    isFinished : boolean
    isEditable: boolean

    constructor(id: string, titre: string, description: string, isFinished: boolean, type: TypeTask, isEditable: boolean){
        this.id = id
        this.titre = titre
        this.description = description
        this.isFinished = isFinished
        this.typeTask = type
        this.isEditable = isEditable
    }
}

export class SimpleTask extends DataTask {
    constructor(id: string, titre: string, description: string, isFinished: boolean, isEditable: boolean){
        super(id, titre, description, isFinished, TypeTask.Simple, isEditable)
    }
}

export class ProgressTask extends DataTask {
    progress: number

    constructor(id: string, titre: string, description: string, isFinished: boolean, progress: number, isEditable: boolean){
        super(id, titre, description, isFinished, TypeTask.Progress, isEditable)
        this.progress = progress;
    }
}
