import IBase from './Base.model'
export default interface IUser extends IBase{
  username: string
  email?: string
  gender?: number
  aboutMe?: string
}