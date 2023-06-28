import {
    schemaMigrations,
    addColumns,
  } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
    migrations: [
        {
            toVersion: 10,
            steps: [
                addColumns({
                    table: 'follow',
                    columns: [
                        { name: 'imageStudentBase64', type: 'string' }
                    ]
                })
            ]
        }
    ]
})