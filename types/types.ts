export enum TypeTask {
    Simple,
    Progress
}

 export abstract class DataTask {
    readonly id: string
    readonly typeTask: TypeTask
    titre : string
    description : string
    isFinished : boolean

    constructor(id: string, titre: string, description: string, isFinished: boolean, type: TypeTask){
        this.id = id
        this.titre = titre
        this.description = description
        this.isFinished = isFinished
        this.typeTask = type
    }
}

export class SimpleTask extends DataTask {
    constructor(id: string, titre: string, description: string, isFinished: boolean){
        super(id, titre, description, isFinished, TypeTask.Simple)
    }
}

export class ProgressTask extends DataTask {
    progress: number

    constructor(id: string, titre: string, description: string, isFinished: boolean, progress: number){
        super(id, titre, description, isFinished, TypeTask.Progress)
        this.progress = progress;
    }
}
