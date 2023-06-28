import { tableSchema } from '@nozbe/watermelondb'

export const followSchema = tableSchema({
    name: 'follow',
    columns: [
        {
            name: 'name',
            type: 'string',
        },
        {
            name: 'comunidade',
            type: 'string',
        },
        {
            name: 'situacaoProdutiva',
            type: 'string',
        },
        {
            name: 'situacaoPedagogica',
            type: 'string',
        },
        {
            name: 'situacaoFamiliar',
            type: 'string',
        },
        {
            name: 'recomendacao',
            type: 'string',
        },
        {
            name: 'imageStudent',
            type: 'string',
        },
        {
            name: 'dateCreated',
            type: 'string',
        },
        {
            name: 'monitor',
            type: 'string',
        },
        {
            name:  'turma',
            type: 'string',
        },
        {
            name: "IdAluno",
            type: 'string',
        },
        {
            name: "imageStudentBase64",
            type: 'string',
        }
    ]
})