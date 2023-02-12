
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
    MONDAY = 1,
    THUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
    SUNDAY = 0
}

export class Frequency {
    // the occurence between new task
    occurence: number
    // if `DAY`   : `occurence` sera le nombre de jour entre les tâches
    // if `WEEK`  : `occurence` sera le nombre de semaine entre les suites de tâches
    // if `MONTH` : `occurence` sera le numéro du jour du mois
    // if `YEAR`  : `occurence` sera le numéro du jour de l'année
    
    numOfDay: number
    
    every: FrequencyEvery
    // when the frequence start to create
    frequenceStart: Date
    // when the frequence end
    frequenceEnd: Date
    // the next date when task will be created
    nextTaskDate : Date
    // jours de la semaine selectionné
    weekOfDay: WEEKDAY[]

    constructor(occurence: number, every: FrequencyEvery, frequenceStart: Date, frequenceEnd: Date, weekOfDay : WEEKDAY[], numOfDay:number){
        this.occurence = occurence < 0 ? 0 : occurence
        this.every = every
        this.frequenceStart = Frequency.dateOnly(frequenceStart)
        this.frequenceEnd = Frequency.dateOnly(frequenceEnd)
        this.nextTaskDate = Frequency.dateOnly(frequenceStart)
        this.weekOfDay = weekOfDay
        this.numOfDay = numOfDay
        this.init()
    }

    public static Empty() : Frequency{
        return new Frequency(0, FrequencyEvery.NULL, new Date(0), new Date(0),[], 0)
    }

    public static nowWithDateOnly() : Date{
        return this.dateOnly(new Date(Date.now()))
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
                            && nextDate.getDay() == WEEKDAY.MONDAY ){ // on vérifie si on est situé au premier jour de la semaine
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
                if(this.numOfDay > 31) this.numOfDay = 31

                if(nextDate.getDate() > this.numOfDay){
                    nextDate.setMonth(nextDate.getMonth() + this.occurence)
                }
                var max = this.getLastDayOfMonth(nextDate.getFullYear(), nextDate.getMonth())
                if(max < this.numOfDay){
                    nextDate.setDate(max)
                }else{
                    nextDate.setDate(this.numOfDay)
                }
                break;
            case FrequencyEvery.YEAR:
                // pour être sûr d'avoir une occurence correct
                if(this.numOfDay > 366) this.numOfDay = 366
                const dayOfYear = Frequency.dayOfYear(nextDate)
                if(dayOfYear < this.numOfDay){
                    const dayAdd = this.numOfDay - dayOfYear
                    nextDate.setDate(nextDate.getDate() + dayAdd)
                }else{
                    let exceptedYear = nextDate.getFullYear()
                    do{
                        exceptedYear = nextDate.getFullYear()
                        nextDate.setFullYear(nextDate.getFullYear() + this.occurence)
                        exceptedYear += this.occurence
                        nextDate.setMonth(0)
                        nextDate.setDate(this.numOfDay)
                    }while(exceptedYear != nextDate.getFullYear())
                }

                break;
        }

        this.nextTaskDate = nextDate
    }

    public IsStillAble() : boolean{
        return (this.nextTaskDate <= this.frequenceEnd)
    }

    public SetNextDateCreation(){
        let nextDate : Date = this.nextTaskDate
        switch(this.every){
            case FrequencyEvery.DAY:
                nextDate.setDate( nextDate.getDate() + this.occurence)
                break;
            case FrequencyEvery.WEEK:
                nextDate.setDate(nextDate.getDate() + 1)
                
                if(this.occurence > 1 // si l'utilisateur demande une occurence (Toute les 2 semaines par exemple)
                            && nextDate.getDay() == WEEKDAY.MONDAY ){ // on vérifie si on est situé au premier jour de la semaine
                        nextDate.setDate(nextDate.getDate() + 7 * (this.occurence-1))
                    }

                // tans que l'on n'a pas trouvé la première tâche à créer
                while(this.weekOfDay.findIndex(x => x == nextDate.getDay()) == -1){
                    // incrémentation d'une journée
                    nextDate.setDate(nextDate.getDate() + 1)

                    if(this.occurence > 1 // si l'utilisateur demande une occurence (Toute les 2 semaines par exemple)
                            && nextDate.getDay() == WEEKDAY.MONDAY ){ // on vérifie si on est situé au premier jour de la semaine
                        nextDate.setDate(nextDate.getDate() + 7 * (this.occurence-1))
                    }
                }
                break;
            case FrequencyEvery.MONTH:
                nextDate.setDate(1)
                nextDate.setMonth(nextDate.getMonth() + this.occurence)

                if(nextDate.getDate() > this.numOfDay){
                    nextDate.setMonth(nextDate.getMonth() + this.occurence)
                }
                var max = this.getLastDayOfMonth(nextDate.getFullYear(), nextDate.getMonth())
                if(max < this.numOfDay){
                    nextDate.setDate(max)
                }else{
                    nextDate.setDate(this.numOfDay)
                }
                break;
            case FrequencyEvery.YEAR:
                nextDate.setDate(1)
                nextDate.setMonth(0)
                nextDate.setFullYear(nextDate.getFullYear() + this.occurence)
                const dayOfYear = Frequency.dayOfYear(nextDate)
                const dayAdd = this.numOfDay - dayOfYear
                nextDate.setDate(nextDate.getDate() + dayAdd)
                break;
        }

        this.nextTaskDate = nextDate
    }

    public NextAndCheckIsAble() : boolean{
        this.SetNextDateCreation()
        return this.IsStillAble()
    }

    private getLastDayOfMonth(year: number, month: number) : number{
        return new Date(year, month + 1, 0).getDate()
    }
}

export class RecurrentTask {
    readonly id: string
    frequency: Frequency
    typeTask: TypeTask
    titre : string
    description : string

    constructor(id: string, titre: string, description: string, type: TypeTask, frequency: Frequency){
        this.id = id
        this.titre = titre
        this.description = description
        this.typeTask = type
        this.frequency = frequency
    }

    public createTask (uuid: string) : DataTask | null {
        if(this.frequency.IsStillAble()){
            const dateStart = new Date(this.frequency.nextTaskDate.getTime())
            const dateEnd = new Date(this.frequency.nextTaskDate.getTime())
            dateEnd.setHours(23,59,59)
            this.frequency.SetNextDateCreation()
            switch(this.typeTask){
                case TypeTask.Simple:
                    return new SimpleTask(uuid, 
                    this.titre, 
                    this.description,
                    false, 
                    true,
                    dateStart,
                    dateEnd
                    )
                case TypeTask.Progress:
                        return new SimpleTask(uuid, 
                        this.titre, 
                        this.description,
                        false, 
                        true,
                        dateStart,
                        dateEnd
                        )
                default:
                    throw new DOMException("RecurrentTask : TypeTask not supported")
            }

        }
        return null
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
