import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class FollowModel extends Model {
    static table = 'follow'

    @field('name')
    nome!: string;
    
    @field('comunidade')
    comunidade!: string;
    
    @field('situacaoProdutiva')
    situacaoProdutiva!: string;
    
    @field('situacaoPedagogica')
    situacaoPedagogica!: string;

    @field('situacaoFamiliar')
    situacaoFamiliar!: string;

    @field('recomendacao')
    recomendacao!: string;

    @field('imageStudent')
    imageStudent!: string;

    @field('dateCreated')
    data!: string;

    @field('monitor')
    monitor!: string;

    @field('turma')
    turma!: string;

    @field('IdAluno')
    aluno_Id!: string;

    @field('imageStudentBase64')
    imageStudentBase64!: string;
}