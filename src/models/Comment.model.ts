import IBase from "./Base.model";
import { IPost } from ".";

export default interface IComment extends IBase {
  post: IPost
  content: string
  name?: string
  website?: string
  status: number
  likes: number
}
