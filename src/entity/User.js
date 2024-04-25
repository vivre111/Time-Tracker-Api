import { EntitySchema } from "typeorm/index.js";

const UserSchema = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "varchar",
            unique: true
        },
        password: {
            type: "varchar"
        }
    }
});

export default UserSchema
