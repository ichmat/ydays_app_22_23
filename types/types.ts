export enum TypeTask {
    Simple,
    Progress
}

export enum FrequencyEvery{
    NULL,
    DAY,
    WEEK,
    MONTH,
    YEAR
}

export enum WEEKDAY{
    MONDAY = 0,
    THUESDAY = 1,
    WEDNESDAY = 2,
    THURSDAY = 3,
    FRIDAY = 4,
    SATURDAY = 5,
    SUNDAY = 6
}

export class Frequency {
    // the occurence between new task
    occurence: number
    // if `DAY` and `WEEK` : `occurence` will be the number of day
    // if `MONTH`          : `occurence` will be the number of day at the start of the month
    // if `YEAR`           : `occurence` will be the number of day at the start of the year
    every: FrequencyEvery
    // when the frequence start to create
    frequenceStart: Date
    // when the frequence end
    frequenceEnd: Date

    constructor(occurence: number, every: FrequencyEvery, frequenceStart: Date, frequenceEnd: Date){
        this.occurence = occurence
        this.every = every
        this.frequenceStart = frequenceStart
        this.frequenceEnd = frequenceEnd
    }

    public static everyDay (nbDayEnd: number, dayOccurence: number = 1) : Frequency  {
        var frequenceStart = new Date(Date.now())
        var frequenceEnd = new Date(frequenceStart.getTime() + (1000 * 60 * 60 * 24 * nbDayEnd));
        
        return this.everyDayWithDate(dayOccurence, frequenceStart,  frequenceEnd)
    }

    public static everyDayWithDate (dayOccurence: number, frequenceStart: Date, frequenceEnd: Date) : Frequency  {
        return new Frequency(dayOccurence, FrequencyEvery.DAY, frequenceStart, frequenceEnd);
    }

    public static everyWeek (nbWeedEnd: number, weekOccurence: number = 1) : Frequency  {
        var frequenceStart = new Date(Date.now())
        var frequenceEnd = new Date(frequenceStart.getTime() + (1000 * 60 * 60 * 24 * 7 * nbWeedEnd));
        
        return this.everyWeekWithDate(weekOccurence, frequenceStart,  frequenceEnd)
    }

    public static everyWeekWithDate (weekOccurence: number, frequenceStart: Date, frequenceEnd: Date) : Frequency  {
        return new Frequency(weekOccurence * 7, FrequencyEvery.WEEK, frequenceStart, frequenceEnd)
    }

    public static everyMonth (nbMonthEnd: number, numberDayOfMonth: number = 1) : Frequency  {
        var frequenceStart = new Date(Date.now())
        var frequenceEnd = new Date(frequenceStart.setMonth(frequenceStart.getMonth() + nbMonthEnd))
        
        return this.everyMonthWithDate(numberDayOfMonth, frequenceStart,  frequenceEnd)
    }

    public static everyMonthWithDate (numberDayOfMonth: number, frequenceStart: Date, frequenceEnd: Date) : Frequency  {
        return new Frequency(numberDayOfMonth, FrequencyEvery.MONTH, frequenceStart, frequenceEnd);
    }

    public static everyYear (nbYear: number, numberDayOfYear: number) : Frequency {
        var frequenceStart = new Date(Date.now())
        var frequenceEnd = new Date(frequenceStart.setMonth(frequenceStart.getMonth() + 12 * nbYear))

        return this.everyYearWithDate(numberDayOfYear, frequenceStart, frequenceEnd)
    }

    public static everyYearWithDate (numberDayOfYear: number, frequenceStart: Date, frequenceEnd: Date) : Frequency  {
        return new Frequency(numberDayOfYear, FrequencyEvery.YEAR, frequenceStart, frequenceEnd )
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
    startTask : Date
    endTask : Date

    constructor(id: string, titre: string, description: string, isFinished: boolean, 
        type: TypeTask, isEditable: boolean, startTask: Date, endTask: Date){
        this.id = id
        this.titre = titre
        this.description = description
        this.isFinished = isFinished
        this.typeTask = type
        this.isEditable = isEditable
        this.startTask = startTask
        this.endTask = endTask
    }
}

export class SimpleTask extends DataTask {
    constructor(id: string, titre: string, description: string, isFinished: boolean, isEditable: boolean, 
        startTask: Date, endTask: Date){
        super(id, titre, description, isFinished, TypeTask.Simple, isEditable, startTask, endTask)
    }
}

export class ProgressTask extends DataTask {
    progress: number

    constructor(id: string, titre: string, description: string, isFinished: boolean, progress: number, isEditable: boolean,
        startTask: Date, endTask: Date){
        super(id, titre, description, isFinished, TypeTask.Progress, isEditable, startTask, endTask)
        this.progress = progress;
    }
}
