import IBase from './Base.model'
import IUser from './User.model'
import ITag from './Tag.model'
import IComment from './Comment.model'
import { ICategory } from './Category.model'

export default interface IPost extends IBase {
  title?: string
  author?: IUser
  content?: string
  desc?: string
  tags?: Array<ITag>
  comments?: Array<IComment>
  status?: number
  category?: ICategory
  visiCount?: number
}
