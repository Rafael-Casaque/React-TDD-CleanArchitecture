export class UnexpectedError extends Error {
    constructor(){
        super('Aconteceu algo de errado, tente novamente em breve');
        this.name = 'UnexpectedError';
    }
}