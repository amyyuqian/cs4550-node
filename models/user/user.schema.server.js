import { Schema } from 'mongoose';
var userSchema = Schema({
 username: String,
 password: String,
 firstName: String,
 lastName: String,
 email: String
}, {collection: 'user'});
export default userSchema;