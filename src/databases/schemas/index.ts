import { appSchema } from '@nozbe/watermelondb'

import { followSchema } from './followSchema'

export const schemas = appSchema({
    version: 10,
    tables: [ followSchema ]
})