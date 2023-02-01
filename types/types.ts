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
    // depend of `every`. Is the rest before new task. 
    // For example : if `every` is MONTH, `everyNumber` will be the number of month between new task
    everyNumber: number
    // the occurence between new task
    occurence: number
    // if `DAY`   : `occurence` sera le nombre de jour entre les tâches
    // if `WEEK`  : `occurence` sera le nombre de semaine entre les suites de tâches
    // if `MONTH` : `occurence` sera le numéro du jour du mois
    // if `YEAR`  : `occurence` sera le numéro du jour de l'année
    every: FrequencyEvery
    // when the frequence start to create
    frequenceStart: Date
    // when the frequence end
    frequenceEnd: Date
    // the next date when task will be created
    nextTaskDate : Date
    // jours de la semaine selectionné
    weekOfDay: WEEKDAY[]

    constructor(occurence: number, every: FrequencyEvery, frequenceStart: Date, frequenceEnd: Date, everyNumber: number, weekOfDay : WEEKDAY[]){
        this.occurence = occurence < 0 ? 0 : occurence
        this.every = every
        this.frequenceStart = Frequency.dateOnly(frequenceStart)
        this.frequenceEnd = Frequency.dateOnly(frequenceEnd)
        this.everyNumber = everyNumber < 1 ? 1 : everyNumber
        this.nextTaskDate = Frequency.dateOnly(frequenceStart)
        this.weekOfDay = weekOfDay
        this.init()
    }

    public static dateOnly(date: Date) : Date{
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }

    public static dayOfYear(date: Date) : number{
        var start = new Date(date.getFullYear(), 0, 0);
        var diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day
    }

    private init(){
        let nextDate: Date = this.frequenceStart
        switch(this.every){
            case FrequencyEvery.WEEK:
                let doNotCountFirst : boolean = true
                // tans que l'on n'a pas trouvé la première tâche à créer
                while(this.weekOfDay.findIndex(x => x == nextDate.getDay()) == -1){
                    if(this.occurence > 1 // si l'utilisateur demande une occurence (Toute les 2 semaines par exemple)
                            && nextDate.getDay() == 0 ){ // on vérifie si on est situé au premier jour de la semaine
                                if(doNotCountFirst){
                                    doNotCountFirst = false
                                }else{
                                    // on ajoute le décallage 
                                    nextDate.setDate(nextDate.getDate() + 7 * (this.occurence-1))
                                }
                        }
                    // incrémentation d'une journée
                    nextDate.setDate(nextDate.getDate() + 1)
                    
                    if(doNotCountFirst)
                        doNotCountFirst = false
                }
                break;
            case FrequencyEvery.MONTH:
                // pour être sûr d'avoir une occurence correct
                if(this.occurence > 31) this.occurence = 31

                if(nextDate.getDate() < this.occurence){
                    nextDate.setDate(this.occurence)
                }else if(nextDate.getDate() > this.occurence){
                    let exceptedMonth : number;
                    do{
                        exceptedMonth = nextDate.getMonth()
                        nextDate.setMonth(nextDate.getMonth() + 1)
                        exceptedMonth += 1
                        if(exceptedMonth > 11){
                            exceptedMonth = 0
                        }
                        nextDate.setDate(this.occurence)
                    }while(exceptedMonth != nextDate.getMonth())
                }
                break;
            case FrequencyEvery.YEAR:
                // pour être sûr d'avoir une occurence correct
                if(this.occurence > 366) this.occurence = 366

                const dayOfYear = Frequency.dayOfYear(nextDate)

                if(dayOfYear < this.occurence){
                    const dayAdd = this.occurence - dayOfYear
                    nextDate.setDate(nextDate.getDate() + dayAdd)
                }else{
                    let exceptedYear = nextDate.getFullYear()
                    do{
                        exceptedYear = nextDate.getFullYear()
                        nextDate.setFullYear(nextDate.getFullYear() + 1)
                        exceptedYear += 1
                        nextDate.setMonth(0)
                        nextDate.setDate(this.occurence)
                    }while(exceptedYear != nextDate.getFullYear())
                }

                break;
        }

        this.nextTaskDate = nextDate
    }

    public IsStillAble() : boolean{
        return (this.nextTaskDate < this.frequenceEnd)
    }

    public SetNextDateCreation(){
        let nextDate : Date = this.nextTaskDate
        switch(this.every){
            case FrequencyEvery.DAY:
                nextDate.setDate( nextDate.getDate() + this.everyNumber)
                break;
            case FrequencyEvery.WEEK:
                nextDate.setDate( nextDate.getDate() + (this.everyNumber * 7))
                break;
            case FrequencyEvery.MONTH:
                nextDate.setMonth( nextDate.getMonth() + this.everyNumber)
                break;
            case FrequencyEvery.YEAR:
                nextDate.setMonth( nextDate.getMonth() + this.everyNumber)
                break;
        }

        this.nextTaskDate = nextDate
    }

    public NextAndCheckIsAble() : boolean{
        this.SetNextDateCreation()
        return this.IsStillAble()
    }
}

export class RecurrentTask {
    readonly id: string
    frequencies: Frequency[]
    typeTask: TypeTask
    titre : string
    description : string

    constructor(id: string, titre: string, description: string, type: TypeTask, frequencies: Frequency[]){
        this.id = id
        this.titre = titre
        this.description = description
        this.typeTask = type
        this.frequencies = frequencies
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
