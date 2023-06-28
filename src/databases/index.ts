import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schemas';
import { FollowModel } from './model/followModel'
import migrations from '../databases/model/migrations'

const adapter = new SQLiteAdapter({
    schema: schemas,
    migrations,
})

export const database = new Database({
    adapter,
    modelClasses: [FollowModel],
})