import { User } from "../models";
import appDataSource from "../";

export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IExistingUserPayload extends IUserPayload{
  id:number;
}

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = appDataSource.getRepository(User);
  return userRepository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = appDataSource.getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  const userRepository = appDataSource.getRepository(User);
  const user = await userRepository.findOneBy({id:id});
  if (!user) return null;
  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> =>{
  const userRepository = appDataSource.getRepository(User);
  const user = await userRepository.findOneBy({email:email});
  if (!user) return null;
  return user
}

export const deleteUser= async (id: number)=>{
  console.log("Number was passed to Delete User", id)
  const userRepository=appDataSource.getRepository(User);
  const user=await userRepository.findOneBy({id:id});
  if (user){
    const user = await userRepository.delete({id:id});
    return id
  }
  return null;
}

export const updateUser=async(payload:IExistingUserPayload): Promise<User | null>=>{
  const userRepository=appDataSource.getRepository(User);
  const user = await userRepository.findOneBy({id: payload.id})
  if(!user) return null;
  return userRepository.save({
    ...user,
    ...payload,
});
};

